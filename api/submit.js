const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const axios = require('axios');
const { body, validationResult } = require('express-validator');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(helmet());

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 50 
});
app.use(limiter);

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

app.post('/api/submit',
  body('name').trim().isLength({ min: 1 }),
  body('email').isEmail(),
  body('subject').trim().isLength({ min: 1 }),
  body('message').trim().isLength({ min: 1 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const formData = req.body;
    try {
      await sendToDiscord(formData);
      await sendToTelegram(formData);
      res.status(200).json({ message: 'Message sent successfully!' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to send message.' });
    }
  }
);

module.exports = app;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
