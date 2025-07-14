const axios = require('axios');
const fs = require('fs');
const path = require('path');

async function diagnoseIssues() {
  console.log('🔍 Diagnosing messaging system issues...\n');
  
  // Check 1: Environment files
  console.log('1️⃣ Checking environment files...');
  const envFiles = [
    '.env.local',
    '.env.development', 
    '.env.production',
    'backend/.env',
    'backend/.env.example'
  ];
  
  envFiles.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
      console.log(`✅ ${file} exists`);
      const content = fs.readFileSync(filePath, 'utf8');
      if (content.includes('VITE_API_URL')) {
        const match = content.match(/VITE_API_URL=(.+)/);
        if (match) {
          console.log(`   API URL: ${match[1]}`);
        }
      }
    } else {
      console.log(`❌ ${file} missing`);
    }
  });
  console.log('');
  
  // Check 2: Backend environment variables
  console.log('2️⃣ Checking backend environment variables...');
  require('dotenv').config({ path: path.join(__dirname, 'backend', '.env') });
  
  const requiredEnvVars = [
    'DISCORD_WEBHOOK_URL',
    'TELEGRAM_BOT_TOKEN', 
    'TELEGRAM_CHAT_ID'
  ];
  
  requiredEnvVars.forEach(varName => {
    const value = process.env[varName];
    if (value) {
      console.log(`✅ ${varName} configured`);
    } else {
      console.log(`❌ ${varName} missing`);
    }
  });
  console.log('');
  
  // Check 3: Backend server connectivity
  console.log('3️⃣ Checking backend server connectivity...');
  try {
    const response = await axios.get('http://localhost:5000/', { timeout: 5000 });
    console.log('✅ Backend server is running');
    console.log(`   Response: ${response.data}`);
  } catch (error) {
    console.log('❌ Backend server is not accessible');
    console.log(`   Error: ${error.message}`);
    if (error.code === 'ECONNREFUSED') {
      console.log('   💡 Make sure to run: cd backend && npm start');
    }
  }
  console.log('');
  
  // Check 4: Discord webhook test
  console.log('4️⃣ Testing Discord webhook...');
  const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (discordWebhookUrl) {
    try {
      const response = await axios.post(discordWebhookUrl, {
        content: '🧪 Discord webhook test from diagnostic script'
      }, { timeout: 10000 });
      console.log('✅ Discord webhook working');
      console.log(`   Status: ${response.status}`);
    } catch (error) {
      console.log('❌ Discord webhook failed');
      console.log(`   Error: ${error.response?.status} - ${error.response?.statusText}`);
    }
  } else {
    console.log('❌ Discord webhook URL not configured');
  }
  console.log('');
  
  // Check 5: Telegram bot test
  console.log('5️⃣ Testing Telegram bot...');
  const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
  const telegramChatId = process.env.TELEGRAM_CHAT_ID;
  
  if (telegramBotToken && telegramChatId) {
    try {
      const response = await axios.post(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
        chat_id: telegramChatId,
        text: '🧪 Telegram bot test from diagnostic script'
      }, { timeout: 10000 });
      console.log('✅ Telegram bot working');
      console.log(`   Status: ${response.status}`);
    } catch (error) {
      console.log('❌ Telegram bot failed');
      console.log(`   Error: ${error.response?.status} - ${error.response?.data?.description || error.message}`);
    }
  } else {
    console.log('❌ Telegram bot token or chat ID not configured');
  }
  console.log('');
  
  // Check 6: Frontend environment
  console.log('6️⃣ Checking frontend environment...');
  const frontendEnvPath = path.join(__dirname, '.env.local');
  if (fs.existsSync(frontendEnvPath)) {
    const content = fs.readFileSync(frontendEnvPath, 'utf8');
    console.log('✅ Frontend environment file exists');
    console.log(`   Content: ${content.trim()}`);
  } else {
    console.log('❌ Frontend environment file missing');
  }
  console.log('');
  
  console.log('🏁 Diagnosis complete!');
  console.log('');
  console.log('💡 Common solutions:');
  console.log('- Ensure backend server is running: cd backend && npm start');
  console.log('- Check Discord webhook URL is valid');
  console.log('- Verify Telegram bot token and chat ID');
  console.log('- Make sure frontend is configured with correct API URL');
}

diagnoseIssues();
