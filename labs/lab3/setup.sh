#!/bin/bash
echo "🚀 Setting up Lab 3 project..."

echo "📦 Installing server dependencies..."
cd server
npm install
cd ..

echo "📦 Installing client dependencies..."
cd client
npm install
cd ..

echo "✅ Setup complete!"
echo ""
echo "To run the application:"
echo "1. Start server: cd server && node index.js"
echo "2. Start client: cd client && npm run dev"
