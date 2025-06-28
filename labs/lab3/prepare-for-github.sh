#!/bin/bash

# Script to prepare Lab 3 for GitHub submission
echo "🚀 Preparing Lab 3 for GitHub submission..."

# Create .gitignore if it doesn't exist
if [ ! -f .gitignore ]; then
    echo "📝 Creating .gitignore file..."
    cat > .gitignore << 'EOF'
# Dependencies
node_modules/
*/node_modules/

# Build outputs
dist/
build/

# Environment variables
.env*

# Logs
*.log

# Runtime data
*.pid
*.seed
*.pid.lock

# Coverage directory
coverage/

# Dependency directories
jspm_packages/

# Optional npm cache directory
.npm

# Optional eslint cache
.eslintcache

# Editor directories and files
.vscode/*
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

# OS generated files
Thumbs.db
EOF
fi

# Remove node_modules directories if they exist
echo "🧹 Cleaning up node_modules directories..."
if [ -d "server/node_modules" ]; then
    echo "   Removing server/node_modules..."
    rm -rf server/node_modules
fi

if [ -d "client/node_modules" ]; then
    echo "   Removing client/node_modules..."
    rm -rf client/node_modules
fi

# Remove package-lock.json files (they'll be regenerated)
echo "🔄 Removing package-lock.json files..."
if [ -f "server/package-lock.json" ]; then
    rm server/package-lock.json
fi

if [ -f "client/package-lock.json" ]; then
    rm client/package-lock.json
fi

# Create a quick setup script
echo "📋 Creating setup script..."
cat > setup.sh << 'EOF'
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
EOF

chmod +x setup.sh

echo "✅ Project prepared for GitHub!"
echo ""
echo "📁 Files ready for commit:"
echo "   - Source code (without node_modules)"
echo "   - Package.json files with dependencies"
echo "   - README.md with full documentation"
echo "   - .gitignore to exclude large files"
echo "   - setup.sh for easy installation"
echo ""
echo "💡 To submit:"
echo "   1. git add ."
echo "   2. git commit -m 'Lab 3: Image Upload & Gallery Application'"
echo "   3. git push origin main"
echo ""
echo "🎯 Project size should now be much smaller for GitHub!"
