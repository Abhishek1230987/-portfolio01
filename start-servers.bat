@echo off
echo Starting Cyber Dev Console Project...
echo.

REM Kill any existing node processes
taskkill /F /IM node.exe 2>NUL
timeout /t 2 /nobreak >NUL

REM Start backend server
echo Starting backend server...
start "Backend Server" cmd /k "cd backend && npm run dev"

REM Wait a bit for backend to start
timeout /t 3 /nobreak >NUL

REM Start frontend server
echo Starting frontend server...
start "Frontend Server" cmd /k "npm run dev"

echo.
echo Both servers are starting...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:8080
echo.
echo Press any key to exit...
pause >NUL
