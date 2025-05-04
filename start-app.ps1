Write-Host "Starting Spotify Stats Application..." -ForegroundColor Green
Write-Host ""

Write-Host "Starting Flask backend..." -ForegroundColor Cyan
Start-Process -FilePath "powershell" -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\react-spotify'; python app.py"

Write-Host "Starting React frontend..." -ForegroundColor Cyan
Start-Process -FilePath "powershell" -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\react-spotify\client'; npm start"

Write-Host ""
Write-Host "Both servers are starting. Please wait a moment..." -ForegroundColor Yellow
Write-Host "Backend: http://localhost:5000" -ForegroundColor Magenta
Write-Host "Frontend: http://localhost:3000" -ForegroundColor Magenta 