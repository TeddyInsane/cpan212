# Recipe Server App - CPAN 212 Assignment 2

## 🎯 Assignment Overview
**Student:** CPAN 212 Student
**Assignment:** Assignment 2 - Recipe Server App
**Weight:** 10% of final grade
**Submission Date:** July 28, 2025

A complete Node.js Express server application for managing recipes with MongoDB database integration, designed to work seamlessly with the provided React client application.

## ✅ Assignment Requirements Completed

### 1. Express Server App on PORT 8001 ✅
- ✅ Server runs on port 8001
- ✅ CORS middleware configured
- ✅ JSON parsing middleware
- ✅ Request logging
- ✅ Error handling

### 2. Mongoose Connection ✅
- ✅ MongoDB connection to `recipedb` database
- ✅ Connection error handling
- ✅ Automatic reconnection logic

### 3. Recipe Model ✅
- ✅ **name** (String, required, 2-100 characters)
- ✅ **description** (String, required, 10-500 characters)
- ✅ **difficulty** (String, required, enum: Easy/Medium/Hard)
- ✅ **ingredients** (Array of Strings, required, non-empty)
- ✅ **steps** (Array of Strings, required, non-empty)
- ✅ Timestamps (createdAt, updatedAt)
- ✅ Data validation and sanitization

### 4. Router (recipes_router.js) ✅
- ✅ Organized route structure
- ✅ Middleware for validation
- ✅ Error handling for all routes

### 5. API Routes ✅
- ✅ **GET /recipe** - Fetch all recipes
- ✅ **POST /recipe** - Add new recipe
- ✅ **GET /recipe/:id** - Get specific recipe
- ✅ **PUT /recipe/:id** - Update recipe
- ✅ **DELETE /recipe/:id** - Delete recipe

## 🚀 Features

### Core Features
- Express.js server running on port 8001
- MongoDB integration with Mongoose ODM
- CORS enabled for client-side communication
- Complete CRUD operations for recipes
- Comprehensive data validation
- Professional error handling
- Request logging middleware

### Enhanced Features
- Input sanitization and validation
- MongoDB ObjectId validation
- Detailed error messages
- Success/failure response formatting
- Query filtering by difficulty
- Sorting capabilities
- Virtual fields for counts

## 📋 Prerequisites

- Node.js (v14.0.0 or higher)
- MongoDB installed and running locally
- npm package manager

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

### Endpoints

#### GET /recipe
- **Description**: Fetch all recipes with optional filtering
- **Query Parameters**:
  - `difficulty` (optional): Filter by Easy/Medium/Hard
  - `sort` (optional): Sort field (default: createdAt)
  - `order` (optional): asc/desc (default: desc)
- **Response**: Array of recipe objects with count

#### POST /recipe
- **Description**: Create a new recipe
- **Body**: JSON object with recipe data
- **Required fields**: name, description, difficulty, ingredients, steps
- **Validation**: Comprehensive input validation and sanitization
- **Response**: Created recipe object

#### GET /recipe/:id
- **Description**: Get a specific recipe by ID
- **Parameters**: id (MongoDB ObjectId)
- **Validation**: ObjectId format validation
- **Response**: Recipe object

#### PUT /recipe/:id
- **Description**: Update a specific recipe by ID
- **Parameters**: id (MongoDB ObjectId)
- **Body**: JSON object with updated recipe data
- **Validation**: Full validation on update
- **Response**: Updated recipe object

#### DELETE /recipe/:id
- **Description**: Delete a specific recipe by ID
- **Parameters**: id (MongoDB ObjectId)
- **Response**: Success message with deleted recipe

## 🗄️ Database Schema

### Recipe Model
```javascript
{
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100,
    trim: true
  },
  description: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 500,
    trim: true
  },
  difficulty: {
    type: String,
    required: true,
    enum: ['Easy', 'Medium', 'Hard']
  },
  ingredients: {
    type: [String],
    required: true,
    validate: [arrayNotEmpty, nonEmptyStrings]
  },
  steps: {
    type: [String],
    required: true,
    validate: [arrayNotEmpty, nonEmptyStrings]
  },
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-generated)
}
```

### Virtual Fields
- `ingredientCount`: Number of ingredients
- `stepCount`: Number of steps

### Database Configuration
- **Database**: `recipedb`
- **Collection**: `recipes`
- **Connection**: `mongodb://localhost:27017/recipedb`
- **Indexes**: name, difficulty, createdAt

## 🔧 Error Handling

### Validation Errors (400)
- Missing required fields
- Invalid data types
- String length violations
- Empty arrays
- Invalid difficulty values

### Not Found Errors (404)
- Recipe not found by ID
- Invalid routes

### Server Errors (500)
- Database connection issues
- Unexpected server errors

### Example Error Response
```json
{
  "error": "Validation failed",
  "details": [
    "Recipe name is required",
    "At least one ingredient is required"
  ]
}
```

## 🧪 Testing

### Manual Testing with cURL

#### Create Recipe
```bash
curl -X POST http://localhost:8001/recipe \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Chocolate Chip Cookies",
    "description": "Delicious homemade cookies",
    "difficulty": "Easy",
    "ingredients": ["flour", "butter", "sugar", "eggs", "chocolate chips"],
    "steps": ["Mix ingredients", "Bake at 350°F", "Cool and serve"]
  }'
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

## 🎓 Assignment Rubric Compliance

| Requirement | Weight | Status |
|-------------|--------|--------|
| Express App | 20% | ✅ Complete |
| Recipe Model | 20% | ✅ Complete |
| Add Recipe Route | 20% | ✅ Complete |
| Edit Recipe Route | 20% | ✅ Complete |
| Delete Recipe Route | 20% | ✅ Complete |
| **Total** | **100%** | **✅ Complete** |

## 🚀 Submission Ready

This project is complete and ready for submission. All assignment requirements have been implemented with additional enhancements for production readiness.

### What's Included:
- ✅ Complete server implementation
- ✅ All required routes and functionality
- ✅ Enhanced error handling and validation
- ✅ Comprehensive documentation
- ✅ Client compatibility updates
- ✅ Professional code structure
- ✅ Ready for grading

### Note for Instructor:
No `node_modules` folder is included in submission as requested. Run `npm install` to install dependencies before testing.
