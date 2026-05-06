@echo off
echo ========================================
echo Carousel Party DJ - Setup Script
echo ========================================
echo.

echo [1/3] Installing backend dependencies...
cd backend
call npm install
echo Backend dependencies installed!
echo.

echo [2/3] Installing frontend dependencies...
cd ..\frontend
call npm install
echo Frontend dependencies installed!
echo.

echo [3/3] Done!
echo.
echo ========================================
echo Next steps:
echo ========================================
echo.
echo 1. Set up the database:
echo    - Open XAMPP and start MySQL & Apache
echo    - Follow instructions in SETUP_DATABASE.md
echo.
echo 2. Start the backend (in a terminal):
echo    cd backend
echo    npm start
echo.
echo 3. Start the frontend (in another terminal):
echo    cd frontend
echo    npm start
echo.
echo The app will open at http://localhost:3000
echo.
pause
