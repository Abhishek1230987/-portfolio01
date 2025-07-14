# Deployment Instructions

## Backend Deployment (Render)

1. **Environment Variables**: Set these in your Render dashboard:
   ```
   NODE_ENV=production
   PORT=10000
   FRONTEND_URL=https://cyber-dev-console-frontend.vercel.app
   DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/1394239849241776148/_JFK33mQCexW5ju9HLKvHlW9vwq5S9puDstqKeLqQnHwREEH793lPXPX2IsMhvT8n3ch
   TELEGRAM_BOT_TOKEN=7601050850:AAEgfN_v9wsC5Bg_f3ZwVInoNH6FiZChTLU
   TELEGRAM_CHAT_ID=1831824613
   ```

2. **Deploy Backend**: 
   - Push backend code to your repository
   - Connect to Render and deploy from the `backend` folder
   - Wait for deployment to complete

## Frontend Deployment (Vercel)

1. **Environment Variables**: Set these in your Vercel dashboard:
   ```
   NODE_ENV=production
   VITE_API_URL=https://cyber-dev-console-backend.onrender.com
   ```

2. **Deploy Frontend**:
   - Push frontend code to your repository
   - Connect to Vercel and deploy from the root folder
   - Wait for deployment to complete

## Testing

1. **Test Backend**: Visit `https://cyber-dev-console-backend.onrender.com` - should show "API is running..."
2. **Test Frontend**: Visit your Vercel URL and test the contact form
3. **Test Messaging**: Submit a test message to verify Discord and Telegram integration

## Key Features

- ✅ **Dual Platform Messaging**: Sends to both Discord and Telegram
- ✅ **Error Handling**: Graceful handling of platform failures
- ✅ **CORS Security**: Proper CORS configuration for deployment
- ✅ **Rate Limiting**: Protection against spam
- ✅ **Input Validation**: Server-side validation and sanitization
- ✅ **Modern UI**: Clean, responsive contact form
- ✅ **Status Feedback**: Real-time status updates for users

## Troubleshooting

- If Discord fails: Check webhook URL in environment variables
- If Telegram fails: Verify bot token and chat ID
- If CORS errors: Ensure FRONTEND_URL is set correctly
- If no response: Check backend logs in Render dashboard
