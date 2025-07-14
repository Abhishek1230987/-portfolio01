# Cyber Dev Console Setup Guide

## Prerequisites
- Node.js installed on your system
- Discord webhook URL (optional)
- Telegram bot token and chat ID (optional)

## Running the Application

### 1. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Configure environment variables
# Edit the .env file with your Discord and Telegram credentials
```

### 2. Frontend Setup
```bash
# Navigate to main project directory
cd ..

# Install dependencies
npm install
```

### 3. Start Both Servers

#### Terminal 1 - Backend Server
```bash
cd backend
npm run dev
```
This will start the backend server on `http://localhost:5000`

#### Terminal 2 - Frontend Server
```bash
npm run dev
```
This will start the frontend server on `http://localhost:8080`

## Configuration

### Discord Setup
1. Go to your Discord server
2. Create a webhook in the channel where you want to receive messages
3. Copy the webhook URL and paste it in the `.env` file as `DISCORD_WEBHOOK_URL`

### Telegram Setup
1. Create a bot using @BotFather on Telegram
2. Get your bot token
3. Get your chat ID (you can use @userinfobot to get your chat ID)
4. Add both values to the `.env` file

### Environment Variables (.env)
```
# Server Configuration
PORT=5000

# Discord Configuration
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/YOUR_WEBHOOK_ID/YOUR_WEBHOOK_TOKEN

# Telegram Configuration
TELEGRAM_BOT_TOKEN=YOUR_BOT_TOKEN
TELEGRAM_CHAT_ID=YOUR_CHAT_ID
```

## Testing the Form
1. Open your browser and go to `http://localhost:8080`
2. Navigate to the contact section
3. Fill out the form and select either Discord or Telegram
4. Submit the form
5. Check your Discord channel or Telegram chat for the message

## Troubleshooting
- Make sure both servers are running
- Check that the `.env` file has the correct credentials
- Verify that your Discord webhook URL is valid
- Ensure your Telegram bot token and chat ID are correct
