# Deployment Guide for Portfolio Project

## Prerequisites
- GitHub repository with your project code
- Vercel account (for frontend)
- Render account (for backend)
- Discord webhook URL (for notifications)
- Telegram bot token and chat ID (for notifications)

## Backend Deployment (Render)

### Step 1: Deploy to Render
1. Log in to [render.com](https://render.com)
2. Click "New" → "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `cyber-dev-console-backend`
   - **Environment**: `Node`
   - **Region**: `Oregon`
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

### Step 2: Set Environment Variables
In your Render dashboard, add these environment variables:
- `NODE_ENV` = `production`
- `PORT` = `10000`
- `DISCORD_WEBHOOK_URL` = `your_discord_webhook_url`
- `TELEGRAM_BOT_TOKEN` = `your_telegram_bot_token`
- `TELEGRAM_CHAT_ID` = `your_telegram_chat_id`

### Step 3: Deploy
Click "Create Web Service" and wait for deployment to complete.

**Important**: Save the deployed backend URL (it will be something like `https://cyber-dev-console-backend.onrender.com`)

## Frontend Deployment (Vercel)

### Step 1: Update Frontend Configuration
Before deploying, update your frontend to use the deployed backend URL:

1. Create or update `.env.production` file in your project root
2. Set `VITE_API_URL` to your deployed backend URL

### Step 2: Deploy to Vercel
1. Log in to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Configure the project:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `./` (project root)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### Step 3: Set Environment Variables
In Vercel dashboard, add:
- `NODE_ENV` = `production`
- `VITE_API_URL` = `your_deployed_backend_url`

### Step 4: Deploy
Click "Deploy" and wait for deployment to complete.

## Post-Deployment Steps

1. **Test the application**: Visit your deployed frontend URL and test the contact form
2. **Verify notifications**: Send a test message to ensure Discord and Telegram notifications work
3. **Update repository**: If needed, update your README with the live URLs

## Troubleshooting

### Common Issues:
- **CORS errors**: Ensure your backend allows requests from your frontend domain
- **Environment variables**: Double-check all environment variables are set correctly
- **Build failures**: Check logs in both Render and Vercel dashboards

### Render-specific:
- Free tier has cold starts (first request may be slow)
- Check logs in Render dashboard for backend errors

### Vercel-specific:
- Environment variables must be prefixed with `VITE_` for Vite projects
- Check build logs for any missing dependencies

## Monitoring
- Render provides basic monitoring and logs
- Vercel provides analytics and performance metrics
- Set up uptime monitoring if needed

## Notes
- Both platforms offer free tiers suitable for portfolio projects
- Render free tier may sleep after inactivity
- Consider upgrading to paid plans for production use
