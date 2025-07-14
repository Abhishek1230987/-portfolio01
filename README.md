# 🚀 Cyber Dev Console

A modern, cyberpunk-themed developer portfolio website with integrated messaging system that sends contact form submissions to both Discord and Telegram.

![Cyber Dev Console](https://img.shields.io/badge/Status-Active-brightgreen)
![React](https://img.shields.io/badge/React-18.3.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue)
![Node.js](https://img.shields.io/badge/Node.js-Backend-green)

## ✨ Features

- 🎨 **Cyberpunk Theme**: Modern, futuristic UI design with neon effects
- 📱 **Responsive Design**: Works perfectly on all devices
- 🔥 **React + TypeScript**: Built with modern web technologies
- 🎯 **Contact Form**: Integrated messaging system
- 📬 **Dual Messaging**: Sends messages to both Discord and Telegram
- 🛡️ **Secure**: Input validation and rate limiting
- ⚡ **Fast**: Optimized for performance
- 🚀 **Easy Deployment**: Ready for production deployment

## 🛠️ Tech Stack

### Frontend
- **React 18.3.1** - UI Library
- **TypeScript** - Type Safety
- **Vite** - Build Tool
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Shadcn/ui** - UI Components

### Backend
- **Node.js** - Runtime
- **Express.js** - Web Framework
- **Axios** - HTTP Client
- **Express Validator** - Input Validation
- **Helmet** - Security Headers
- **Rate Limiting** - API Protection

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Discord Webhook URL (optional)
- Telegram Bot Token and Chat ID (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Abhishek1230987/trial.git
   cd trial
   ```

2. **Install dependencies**
   ```bash
   # Install frontend dependencies
   npm install
   
   # Install backend dependencies
   cd backend
   npm install
   cd ..
   ```

3. **Environment Setup**
   ```bash
   # Copy environment template
   cp backend/.env.example backend/.env
   ```

4. **Configure Environment Variables**
   Edit `backend/.env` with your credentials:
   ```env
   PORT=5000
   DISCORD_WEBHOOK_URL=your_discord_webhook_url
   TELEGRAM_BOT_TOKEN=your_telegram_bot_token
   TELEGRAM_CHAT_ID=your_telegram_chat_id
   ```

5. **Run the Project**
   
   **Option A: Using the launcher (Windows)**
   ```bash
   # Double-click run-project.bat or run:
   ./run-project.bat
   ```
   
   **Option B: Manual start**
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm run dev
   
   # Terminal 2 - Frontend
   npm run dev
   ```

6. **Access the Application**
   - Frontend: http://localhost:8080
   - Backend API: http://localhost:5000

## 📧 Setting Up Messaging

### Discord Setup
1. Go to your Discord server
2. Create a webhook in the desired channel
3. Copy the webhook URL
4. Add it to your `.env` file as `DISCORD_WEBHOOK_URL`

### Telegram Setup
1. Create a bot using [@BotFather](https://t.me/botfather)
2. Get your bot token
3. Get your chat ID (use [@userinfobot](https://t.me/userinfobot))
4. Add both to your `.env` file

## 🚀 Deployment

### Frontend (Vercel/Netlify)
1. Build the frontend:
   ```bash
   npm run build
   ```
2. Deploy the `dist` folder to your hosting platform

### Backend (Railway/Heroku/Digital Ocean)
1. Set environment variables on your hosting platform
2. Deploy the `backend` folder
3. Update the frontend API endpoint

## 📝 API Endpoints

### POST /submit
Submit contact form data

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "Hello, I'm interested in your services."
}
```

**Response:**
```json
{
  "message": "Message sent successfully to: discord, telegram",
  "results": [...],
  "errors": [...]
}
```

## 🧪 Testing

```bash
# Test backend API
cd backend
node test-api.js

# Test Discord webhook
node test-discord.js

# Test Telegram bot
node test-telegram.js
```

---

Made with ❤️ by [Abhishek Kumar Singh](https://github.com/Abhishek1230987)
