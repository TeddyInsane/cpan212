# CPAN 212 Assignment 2 - Recipe Server App
## 🎯 SUBMISSION PACKAGE

**Student:** CPAN 212 Student  
**Assignment:** Assignment 2 - Recipe Server App  
**Weight:** 10% of final grade  
**Submission Date:** July 28, 2025

---

## 📁 SUBMISSION STRUCTURE

```
starter_kit/
├── client/                    # Provided React client (updated for compatibility)
│   ├── src/
│   │   ├── pages/
│   │   │   ├── AddRecipe.jsx     # Updated for new API format
│   │   │   ├── EditRecipe.jsx    # Updated for new API format
│   │   │   ├── DetailedRecipe.jsx # Updated for new API format
│   │   │   └── ListRecipe.jsx    # Updated for new API format
│   │   └── ...
│   └── package.json
│
└── server/                    # MAIN SUBMISSION - Recipe Server App
    ├── models/
    │   └── Recipe.js          # Mongoose schema and model
    ├── recipes_router.js      # All recipe routes
    ├── server.js             # Main Express server
    ├── package.json          # Dependencies and scripts
    ├── .gitignore            # Git ignore rules
    └── README.md             # Comprehensive documentation
```

---

## 🚀 QUICK START GUIDE

### Prerequisites
- Node.js (v14+)
- MongoDB running locally
- npm package manager

### 1. Start the Server
```bash
cd starter_kit/server
npm install
npm start
```
Server runs on: `http://localhost:8001`

### 2. Start the Client (Optional - for testing)
```bash
cd starter_kit/client
npm install
npm run dev
```
Client runs on: `http://localhost:5173` or `http://localhost:5174`

### 3. Test the API
- Open browser to client URL
- Test all CRUD operations through the UI
- Or use cURL commands (see server/README.md)

---


## 📝 INSTRUCTOR NOTES

### Running the Application
1. Ensure MongoDB is running locally
2. Navigate to `starter_kit/server`
3. Run `npm install` (node_modules excluded from submission)
4. Run `npm start`
5. Server will be available at `http://localhost:8001`

### Testing with Client
1. Navigate to `starter_kit/client`
2. Run `npm install` and `npm run dev`
3. Open browser to client URL
4. Test all recipe operations through the UI

### API Testing
- Use the provided cURL examples in server/README.md
- All endpoints return JSON responses
- Comprehensive error messages for debugging

---
**No node_modules folders included** as requested in assignment instructions.
