const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const recipesRouter = require('./recipes_router');

const app = express();
const PORT = process.env.PORT || 8001;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:5173'],
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// MongoDB Connection with better error handling
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/recipedb', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    console.log('Please ensure MongoDB is running on your system');
    process.exit(1);
  }
};

// Connect to database
connectDB();

// Handle MongoDB connection events
mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

mongoose.connection.on('error', (error) => {
  console.error('MongoDB error:', error);
});

// Routes
app.use('/recipe', recipesRouter);

// Basic route for testing
app.get('/', (req, res) => {
  res.json({
    message: 'Recipe Server is running successfully!',
    port: PORT,
    endpoints: {
      'GET /recipe': 'Get all recipes',
      'POST /recipe': 'Create new recipe',
      'GET /recipe/:id': 'Get recipe by ID',
      'PUT /recipe/:id': 'Update recipe by ID',
      'DELETE /recipe/:id': 'Delete recipe by ID'
    }
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    message: `Cannot ${req.method} ${req.originalUrl}`
  });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('Global error handler:', error);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🗄️  Database: MongoDB (recipedb)`);
});
