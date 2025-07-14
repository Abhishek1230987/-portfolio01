#!/usr/bin/env pwsh

Write-Host "🚀 Starting Cyber Dev Console Project..." -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Gray

# Kill existing node processes
Write-Host "⚠️  Stopping existing servers..." -ForegroundColor Yellow
Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force
Start-Sleep -Seconds 2

# Start backend server
Write-Host "🔧 Starting backend server..." -ForegroundColor Green
$backendJob = Start-Job -ScriptBlock {
    Set-Location "C:\Users\Abhishek kumar sing\Desktop\cyber-dev-console-main\cyber-dev-console-main\backend"
    npm run dev
}

# Wait for backend to start
Write-Host "⏳ Waiting for backend to initialize..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

# Start frontend server
Write-Host "🎨 Starting frontend server..." -ForegroundColor Green
$frontendJob = Start-Job -ScriptBlock {
    Set-Location "C:\Users\Abhishek kumar sing\Desktop\cyber-dev-console-main\cyber-dev-console-main"
    npm run dev
}

# Wait for frontend to start
Write-Host "⏳ Waiting for frontend to initialize..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

# Check if servers are running
Write-Host "🔍 Checking server status..." -ForegroundColor Cyan

$backendRunning = Get-NetTCPConnection -LocalPort 5000 -ErrorAction SilentlyContinue
$frontendRunning = Get-NetTCPConnection -LocalPort 8080 -ErrorAction SilentlyContinue

if ($backendRunning) {
    Write-Host "✅ Backend server is running on http://localhost:5000" -ForegroundColor Green
} else {
    Write-Host "❌ Backend server failed to start" -ForegroundColor Red
}

if ($frontendRunning) {
    Write-Host "✅ Frontend server is running on http://localhost:8080" -ForegroundColor Green
} else {
    Write-Host "❌ Frontend server failed to start" -ForegroundColor Red
}

if ($backendRunning -and $frontendRunning) {
    Write-Host ""
    Write-Host "🎉 Both servers are running successfully!" -ForegroundColor Green
    Write-Host "📱 Open your browser and go to: http://localhost:8080" -ForegroundColor Cyan
    Write-Host "🔗 Backend API is available at: http://localhost:5000" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Press Ctrl+C to stop both servers." -ForegroundColor Yellow
    
    # Keep the script running and monitor jobs
    try {
        while ($true) {
            Start-Sleep -Seconds 5
            if ($backendJob.State -eq "Failed" -or $frontendJob.State -eq "Failed") {
                Write-Host "❌ One of the servers has failed. Stopping..." -ForegroundColor Red
                break
            }
        }
    } catch {
        Write-Host "🛑 Stopping servers..." -ForegroundColor Yellow
    }
} else {
    Write-Host "❌ Failed to start one or both servers" -ForegroundColor Red
}

# Cleanup
Write-Host "🧹 Cleaning up..." -ForegroundColor Yellow
Stop-Job $backendJob, $frontendJob -ErrorAction SilentlyContinue
Remove-Job $backendJob, $frontendJob -ErrorAction SilentlyContinue
Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force

Write-Host "👋 Goodbye!" -ForegroundColor Green
