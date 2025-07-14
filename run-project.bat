@echo off
color 0A
title Cyber Dev Console - Project Launcher

echo.
echo ======================================
echo 🚀 CYBER DEV CONSOLE PROJECT LAUNCHER
echo ======================================
echo.

echo ⚠️  Stopping any existing servers...
taskkill /F /IM node.exe >nul 2>&1
timeout /t 2 /nobreak >nul

echo.
echo 🔧 Starting Backend Server...
echo    Location: http://localhost:5000
start "Backend Server" /D "%~dp0backend" cmd /k "echo 🔧 BACKEND SERVER && echo ==================== && npm run dev"

echo.
echo ⏳ Waiting for backend to initialize...
timeout /t 5 /nobreak >nul

echo.
echo 🎨 Starting Frontend Server...
echo    Location: http://localhost:8080
start "Frontend Server" /D "%~dp0" cmd /k "echo 🎨 FRONTEND SERVER && echo ==================== && npm run dev"

echo.
echo ⏳ Waiting for frontend to initialize...
timeout /t 5 /nobreak >nul

echo.
echo 🎉 Both servers should now be running!
echo.
echo 📱 Frontend: http://localhost:8080
echo 🔗 Backend:  http://localhost:5000
echo.
echo 🔍 Check the opened terminal windows for server status.
echo 📝 Fill out the contact form to test Discord & Telegram messaging.
echo.
echo Press any key to exit this launcher...
pause >nul

echo.
echo 👋 Launcher closed. Servers are still running in separate windows.
echo    Close those windows to stop the servers.
echo.
