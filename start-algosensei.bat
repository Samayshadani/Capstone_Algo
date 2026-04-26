@echo off
echo ==========================================
echo Starting AlgoSensei Development Environment
echo ==========================================

:: Start the Piston API in the background
echo Starting Piston Docker API...
cd "%~dp0\piston"
docker compose up -d api

:: Go back to the main AlgoSensei directory
cd "%~dp0"

:: Start the Next.js development server
echo.
echo Starting Next.js Dev Server...
echo The application will be available at http://localhost:3000
echo.
npm run dev

pause
