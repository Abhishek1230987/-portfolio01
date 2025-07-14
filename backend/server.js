require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const axios = require('axios');
const { body, validationResult } = require('express-validator');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:8080',
  'http://localhost:8081',
  'https://cyber-dev-console-frontend.vercel.app',
  'https://your-vercel-deployment-url.vercel.app',
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    
    const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
    return callback(new Error(msg), false);
  },
  credentials: true,
  optionsSuccessStatus: 200
}));
app.use(helmet());
app.use(express.json());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 50 // Limit each IP to 50 requests per 10 minutes
});
app.use(limiter);

// Helper function to format message
function formatMessage(formData) {
  const timestamp = new Date().toLocaleString();
  return {
    plain: `🚀 New Contact Form Submission\n\n` +
           `👤 Name: ${formData.name}\n` +
           `📧 Email: ${formData.email}\n` +
           `📝 Subject: ${formData.subject}\n` +
           `💬 Message: ${formData.message}\n` +
           `🕐 Time: ${timestamp}\n` +
           `📱 Platform: Both (Discord & Telegram)`,
    
    discord: {
      embeds: [{
        title: "🚀 New Contact Form Submission",
        color: 0x00ff41, // Cyber green color
        fields: [
          { name: "👤 Name", value: formData.name, inline: true },
          { name: "📧 Email", value: formData.email, inline: true },
          { name: "📝 Subject", value: formData.subject, inline: false },
          { name: "💬 Message", value: formData.message, inline: false },
          { name: "🕐 Timestamp", value: timestamp, inline: true },
          { name: "📱 Platform", value: "BOTH (DISCORD & TELEGRAM)", inline: true }
        ],
        footer: {
          text: "Cyber Dev Console • Contact Form",
          icon_url: "https://cdn.discordapp.com/emojis/741252262637986906.png"
        }
      }]
    }
  };
}

// Helper function to send message to Discord
async function sendToDiscord(formData) {
  const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL;
  
  console.log('Discord webhook URL configured:', !!discordWebhookUrl);
  
  if (!discordWebhookUrl) {
    throw new Error('Discord webhook URL not configured');
  }

  const message = formatMessage(formData);
  
  console.log('Sending Discord message:', JSON.stringify(message.discord, null, 2));
  
  try {
    const response = await axios.post(discordWebhookUrl, message.discord, {
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 30000 // 30 second timeout
    });
    console.log('Discord response status:', response.status);
    return response.data;
  } catch (error) {
    console.error('Discord Error Details:');
    console.error('- Status:', error.response?.status);
    console.error('- Status Text:', error.response?.statusText);
    console.error('- Response Data:', error.response?.data);
    console.error('- Error Message:', error.message);
    console.error('- Full Error:', error);
    
    throw new Error(`Failed to send message to Discord: ${error.response?.status || error.message}`);
  }
}

// Helper function to send message to Telegram
async function sendToTelegram(formData) {
  const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
  const telegramChatId = process.env.TELEGRAM_CHAT_ID;
  
  if (!telegramBotToken || !telegramChatId) {
    throw new Error('Telegram bot token or chat ID not configured');
  }

  const message = formatMessage(formData);
  
  try {
    const response = await axios.post(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
      chat_id: telegramChatId,
      text: message.plain,
      parse_mode: 'HTML'
    });
    return response.data;
  } catch (error) {
    console.error('Telegram Error:', error.response?.data || error.message);
    throw new Error('Failed to send message to Telegram');
  }
}

// Helper function to send message to both platforms
async function sendMessageToBothPlatforms(formData) {
  const results = [];
  const errors = [];
  
  // Try to send to Discord
  try {
    const discordResult = await sendToDiscord(formData);
    results.push({ platform: 'discord', status: 'success', data: discordResult });
    console.log('✅ Discord message sent successfully');
  } catch (error) {
    errors.push({ platform: 'discord', error: error.message });
    console.error('❌ Discord failed:', error.message);
  }
  
  // Try to send to Telegram
  try {
    const telegramResult = await sendToTelegram(formData);
    results.push({ platform: 'telegram', status: 'success', data: telegramResult });
    console.log('✅ Telegram message sent successfully');
  } catch (error) {
    errors.push({ platform: 'telegram', error: error.message });
    console.error('❌ Telegram failed:', error.message);
  }
  
  return { results, errors };
}

// Basic route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Form submission endpoint
app.post('/submit',
  // Validate and sanitize input
  body('name').trim().isLength({ min: 1 }).escape(),
  body('email').isEmail().normalizeEmail(),
  body('subject').trim().isLength({ min: 1 }).escape(),
  body('message').trim().isLength({ min: 1 }).escape(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const formData = req.body;
    console.log('Received form data:', formData);
    
    try {
      const result = await sendMessageToBothPlatforms(formData);
      
      // Check if at least one platform succeeded
      if (result.results.length > 0) {
        const successPlatforms = result.results.map(r => r.platform).join(', ');
        let responseMessage = `Message sent successfully to: ${successPlatforms}`;
        
        if (result.errors.length > 0) {
          const failedPlatforms = result.errors.map(e => e.platform).join(', ');
          responseMessage += `. Failed to send to: ${failedPlatforms}`;
        }
        
        res.status(200).json({ 
          message: responseMessage,
          results: result.results,
          errors: result.errors
        });
      } else {
        // All platforms failed
        res.status(500).json({ 
          error: 'Failed to send message to any platform',
          errors: result.errors
        });
      }
    } catch (error) {
      console.error('Error sending message:', error);
      res.status(500).json({ error: 'Failed to send message.' });
    }
  }
);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

