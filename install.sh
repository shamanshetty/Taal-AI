#!/bin/bash

# TaalAI Installation Script (macOS/Linux)
# This script automates the setup process

set -e

echo "🚀 TaalAI Installation Script"
echo "================================"
echo ""

# Check prerequisites
echo "📋 Checking prerequisites..."

if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v18+ from https://nodejs.org/"
    exit 1
fi

if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.11+ from https://www.python.org/"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ Python version: $(python3 --version)"
echo ""

# Setup environment files
echo "📝 Setting up environment files..."

if [ ! -f .env ]; then
    cp .env.example .env
    echo "✅ Created .env file"
else
    echo "ℹ️  .env file already exists"
fi

if [ ! -f frontend/.env.local ]; then
    cp frontend/.env.local.example frontend/.env.local
    echo "✅ Created frontend/.env.local file"
else
    echo "ℹ️  frontend/.env.local already exists"
fi

if [ ! -f backend/.env ]; then
    cp backend/.env.example backend/.env
    echo "✅ Created backend/.env file"
else
    echo "ℹ️  backend/.env already exists"
fi

echo ""
echo "⚠️  IMPORTANT: Please edit the following files with your API keys:"
echo "   - backend/.env (add GEMINI_API_KEY and SECRET_KEY)"
echo "   - frontend/.env.local (add Supabase credentials)"
echo ""
read -p "Press Enter when you've updated the environment files..."

# Backend setup
echo ""
echo "🐍 Setting up backend..."
cd backend

if [ ! -d "venv" ]; then
    python3 -m venv venv
    echo "✅ Created virtual environment"
fi

source venv/bin/activate
echo "✅ Activated virtual environment"

pip install --upgrade pip
pip install -r requirements.txt
echo "✅ Installed Python dependencies"

cd ..

# Frontend setup
echo ""
echo "⚛️  Setting up frontend..."
cd frontend

npm install
echo "✅ Installed Node.js dependencies"

cd ..

# Summary
echo ""
echo "✅ Installation complete!"
echo ""
echo "📚 Next steps:"
echo ""
echo "1. Set up Supabase database:"
echo "   - Go to https://supabase.com/ and create a project"
echo "   - Run the SQL from shared/supabase-schema.sql in SQL Editor"
echo ""
echo "2. Start the backend:"
echo "   cd backend"
echo "   source venv/bin/activate"
echo "   uvicorn app.main:app --reload"
echo ""
echo "3. In a new terminal, start the frontend:"
echo "   cd frontend"
echo "   npm run dev"
echo ""
echo "4. Open http://localhost:3000 in your browser"
echo ""
echo "📖 For detailed instructions, see SETUP.md"
echo "⚡ For quick start, see QUICKSTART.md"
echo ""
echo "Happy coding! 🎉"
