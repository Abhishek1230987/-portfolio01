# Troubleshooting Guide

## 🔧 Form Input Issues

### Problem: Cannot type in form inputs
**Possible causes:**
1. CSS z-index issues
2. Overlapping elements
3. JavaScript errors
4. Browser compatibility

### Solutions:

#### 1. Check Browser Console
- Press F12 to open developer tools
- Look for any JavaScript errors in the Console tab
- Check if "Input changed:" messages appear when clicking inputs

#### 2. Test with Simple Form
- A simple test form component has been created
- Check if basic inputs work before troubleshooting the main form

#### 3. Clear Browser Cache
- Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- Clear browser cache and cookies

#### 4. Check CSS Conflicts
- Inspect the input element in dev tools
- Look for any CSS rules that might be blocking input
- Check for `pointer-events: none` or high z-index overlays

## 📱 Telegram Bot Issues

### Problem: Messages not reaching Telegram
**Status:** ✅ Bot is working correctly

### Verification Steps:
1. Bot token: ✅ Valid
2. Chat ID: ✅ Valid  
3. Test message: ✅ Sent successfully

### If still not receiving messages:
1. Check if you've started a conversation with the bot
2. Verify the bot is not blocked
3. Check your Telegram notifications settings

## 🚀 Running the Project

### Quick Start:
1. **Windows:** Double-click `start-servers.bat`
2. **Manual:** 
   - Terminal 1: `cd backend && npm run dev`
   - Terminal 2: `npm run dev`

### URLs:
- Frontend: http://localhost:8080
- Backend: http://localhost:5000

## 🔍 Testing Form Submission

### Test the messaging system:
1. Fill out the contact form
2. Select either Discord or Telegram
3. Submit the form
4. Check your selected platform for the message

### Expected behavior:
- Form should clear after successful submission
- Toast notification should appear
- Message should arrive in Discord/Telegram within seconds
