@echo off
REM TaalAI Installation Script (Windows)
REM This script automates the setup process

echo.
echo ================================
echo   TaalAI Installation Script
echo ================================
echo.

REM Check prerequisites
echo Checking prerequisites...
echo.

where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed.
    echo Please install Node.js v18+ from https://nodejs.org/
    pause
    exit /b 1
)

where python >nul 2>nul
if %errorlevel% neq 0 (
    echo ERROR: Python is not installed.
    echo Please install Python 3.11+ from https://www.python.org/
    pause
    exit /b 1
)

echo OK: Node.js version:
node --version

echo OK: Python version:
python --version
echo.

REM Setup environment files
echo Setting up environment files...
echo.

if not exist .env (
    copy .env.example .env
    echo OK: Created .env file
) else (
    echo INFO: .env file already exists
)

if not exist frontend\.env.local (
    copy frontend\.env.local.example frontend\.env.local
    echo OK: Created frontend\.env.local file
) else (
    echo INFO: frontend\.env.local already exists
)

if not exist backend\.env (
    copy backend\.env.example backend\.env
    echo OK: Created backend\.env file
) else (
    echo INFO: backend\.env already exists
)

echo.
echo IMPORTANT: Please edit the following files with your API keys:
echo    - backend\.env (add GEMINI_API_KEY and SECRET_KEY)
echo    - frontend\.env.local (add Supabase credentials)
echo.
pause

REM Backend setup
echo.
echo Setting up backend...
cd backend

if not exist venv (
    python -m venv venv
    echo OK: Created virtual environment
)

call venv\Scripts\activate.bat
echo OK: Activated virtual environment

python -m pip install --upgrade pip
pip install -r requirements.txt
echo OK: Installed Python dependencies

cd ..

REM Frontend setup
echo.
echo Setting up frontend...
cd frontend

call npm install
echo OK: Installed Node.js dependencies

cd ..

REM Summary
echo.
echo ================================
echo   Installation complete!
echo ================================
echo.
echo Next steps:
echo.
echo 1. Set up Supabase database:
echo    - Go to https://supabase.com/ and create a project
echo    - Run the SQL from shared\supabase-schema.sql in SQL Editor
echo.
echo 2. Start the backend:
echo    cd backend
echo    venv\Scripts\activate
echo    uvicorn app.main:app --reload
echo.
echo 3. In a new terminal, start the frontend:
echo    cd frontend
echo    npm run dev
echo.
echo 4. Open http://localhost:3000 in your browser
echo.
echo For detailed instructions, see SETUP.md
echo For quick start, see QUICKSTART.md
echo.
echo Happy coding!
echo.
pause
