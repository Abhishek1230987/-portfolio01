const axios = require('axios');

// Helper function to validate input
function validateInput(body) {
  const errors = [];
  
  if (!body.name || body.name.trim().length === 0) {
    errors.push({ field: 'name', message: 'Name is required' });
  }
  
  if (!body.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
    errors.push({ field: 'email', message: 'Valid email is required' });
  }
  
  if (!body.subject || body.subject.trim().length === 0) {
    errors.push({ field: 'subject', message: 'Subject is required' });
  }
  
  if (!body.message || body.message.trim().length === 0) {
    errors.push({ field: 'message', message: 'Message is required' });
  }
  
  return errors;
}

function formatMessage(formData) {
  const timestamp = new Date().toLocaleString();
  return {
    plain: `${formData.name}\n${formData.email}\n${formData.subject}\n${formData.message}\n${timestamp}`,
    discord: {
      embeds: [{
        title: "New Contact Form Submission",
        color: 0x00ff41,
        fields: [
          { name: "Name", value: formData.name, inline: true },
          { name: "Email", value: formData.email, inline: true },
          { name: "Subject", value: formData.subject, inline: false },
          { name: "Message", value: formData.message, inline: false },
          { name: "Timestamp", value: timestamp, inline: true }
        ]
      }]
    }
  };
}

async function sendToDiscord(formData) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl) {
    throw new Error('Discord webhook URL not configured');
  }

  const message = formatMessage(formData);
  await axios.post(webhookUrl, message.discord);
}

async function sendToTelegram(formData) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    throw new Error('Telegram bot token or chat ID not configured');
  }

  const message = formatMessage(formData);
  await axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
    chat_id: chatId,
    text: message.plain
  });
}

async function sendMessageToBothPlatforms(formData) {
  const results = [];
  const errors = [];
  
  // Try to send to Discord
  try {
    await sendToDiscord(formData);
    results.push({ platform: 'discord', status: 'success' });
  } catch (error) {
    errors.push({ platform: 'discord', error: error.message });
  }
  
  // Try to send to Telegram
  try {
    await sendToTelegram(formData);
    results.push({ platform: 'telegram', status: 'success' });
  } catch (error) {
    errors.push({ platform: 'telegram', error: error.message });
  }
  
  return { results, errors };
}

// Vercel serverless function handler
export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  // Validate input
  const validationErrors = validateInput(req.body);
  if (validationErrors.length > 0) {
    return res.status(400).json({ errors: validationErrors });
  }
  
  const formData = req.body;
  
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
