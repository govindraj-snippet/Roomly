@echo off
echo ========================================
echo   Roomly - Startup Script
echo ========================================
echo.

REM Check if virtual environment exists
if not exist "backend\venv" (
    echo Creating Python virtual environment...
    cd backend
    python -m venv venv
    cd ..
)

REM Activate virtual environment and install dependencies
echo Installing backend dependencies...
call backend\venv\Scripts\activate.bat
pip install -r backend\requirements.txt --quiet

REM Check if node_modules exists
if not exist "frontend\node_modules" (
    echo Installing frontend dependencies...
    cd frontend
    npm install --silent
    cd ..
)

echo.
echo ========================================
echo   Starting Roomly...
echo ========================================
echo.
echo Backend: http://localhost:8000
echo Frontend: http://localhost:3000
echo.
echo Press Ctrl+C to stop both servers
echo.

REM Start backend in background
start "Roomly Backend" cmd /k "cd backend && venv\Scripts\activate.bat && uvicorn app.main:app --reload"

REM Wait a moment for backend to start
timeout /t 3 /nobreak >nul

REM Start frontend
start "Roomly Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo Both servers are starting in separate windows...
echo.
