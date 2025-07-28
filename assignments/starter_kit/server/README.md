# Recipe Server App - CPAN 212 Assignment 2

## 🎯 Assignment Overview
**Student:** CPAN 212 Student
**Assignment:** Assignment 2 - Recipe Server App
**Weight:** 10% of final grade
**Submission Date:** July 28, 2025

A complete Node.js Express server application for managing recipes with MongoDB database integration, designed to work seamlessly with the provided React client application.



## 🛠️ Installation & Setup

### 1. Navigate to Server Directory
```bash
cd starter_kit/server
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start MongoDB
Ensure MongoDB is running on your system:
```bash
# On macOS with Homebrew
brew services start mongodb-community

# On Windows
net start MongoDB

# On Linux
sudo systemctl start mongod
```

### 4. Start the Server

#### Development Mode (with auto-restart)
```bash
npm run dev
```

#### Production Mode
```bash
npm start
```

The server will start on `http://localhost:8001`

## 🌐 Client Integration

### Start the Client Application
```bash
cd ../client
npm install
npm run dev
```

The client will run on `http://localhost:5173` or `http://localhost:5174`

### Full-Stack Testing
1. Start the server (port 8001)
2. Start the client (port 5173/5174)
3. Open browser to client URL
4. Test all CRUD operations through the UI

## 📚 API Documentation

### Response Format
All API responses follow a consistent format:
```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": { /* response data */ },
  "count": 1  // for list endpoints
}


```

#### Get All Recipes
```bash
curl http://localhost:8001/recipe
```

#### Get Recipe by ID
```bash
curl http://localhost:8001/recipe/{recipe_id}
```

#### Update Recipe
```bash
curl -X PUT http://localhost:8001/recipe/{recipe_id} \
  -H "Content-Type: application/json" \
  -d '{ /* updated recipe data */ }'
```

#### Delete Recipe
```bash
curl -X DELETE http://localhost:8001/recipe/{recipe_id}
```

## 📁 Project Structure

```
server/
├── models/
│   └── Recipe.js          # Mongoose schema and model
├── recipes_router.js      # All recipe routes
├── server.js             # Main server file
├── package.json          # Dependencies and scripts
├── .gitignore           # Git ignore rules
└── README.md            # This documentation
```
### Note for Instructor:
No `node_modules` folder is included in submission as requested. Run `npm install` to install dependencies before testing.
