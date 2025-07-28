const express = require('express');
const mongoose = require('mongoose');
const Recipe = require('./models/Recipe');

const router = express.Router();

// Validation middleware
const validateRecipeData = (req, res, next) => {
  const { name, description, difficulty, ingredients, steps } = req.body;

  const errors = [];

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    errors.push('Recipe name is required');
  }

  if (!description || typeof description !== 'string' || description.trim().length === 0) {
    errors.push('Recipe description is required');
  }

  if (!difficulty || !['Easy', 'Medium', 'Hard'].includes(difficulty)) {
    errors.push('Difficulty must be Easy, Medium, or Hard');
  }

  if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
    errors.push('At least one ingredient is required');
  }

  if (!steps || !Array.isArray(steps) || steps.length === 0) {
    errors.push('At least one cooking step is required');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      error: 'Validation failed',
      details: errors
    });
  }

  next();
};

// Validate MongoDB ObjectId
const validateObjectId = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({
      error: 'Invalid recipe ID format'
    });
  }
  next();
};

// GET /recipe - Fetch all recipes
router.get('/', async (req, res) => {
  try {
    const { difficulty, sort = 'createdAt', order = 'desc' } = req.query;

    let query = {};
    if (difficulty && ['Easy', 'Medium', 'Hard'].includes(difficulty)) {
      query.difficulty = difficulty;
    }

    const sortOrder = order === 'asc' ? 1 : -1;
    const sortObj = { [sort]: sortOrder };

    const recipes = await Recipe.find(query).sort(sortObj);

    res.json({
      success: true,
      count: recipes.length,
      data: recipes
    });
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).json({
      error: 'Failed to fetch recipes',
      message: error.message
    });
  }
});

// POST /recipe - Add a new recipe
router.post('/', validateRecipeData, async (req, res) => {
  try {
    const { name, description, difficulty, ingredients, steps } = req.body;

    // Filter out empty strings from arrays
    const filteredIngredients = ingredients
      .filter(ingredient => ingredient && ingredient.trim() !== '');
    const filteredSteps = steps
      .filter(step => step && step.trim() !== '');

    const newRecipe = new Recipe({
      name: name.trim(),
      description: description.trim(),
      difficulty: difficulty.trim(),
      ingredients: filteredIngredients,
      steps: filteredSteps
    });

    const savedRecipe = await newRecipe.save();

    res.status(201).json({
      success: true,
      message: 'Recipe created successfully',
      data: savedRecipe
    });
  } catch (error) {
    console.error('Error creating recipe:', error);

    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        error: 'Validation failed',
        details: validationErrors
      });
    }

    res.status(500).json({
      error: 'Failed to create recipe',
      message: error.message
    });
  }
});

// GET /recipe/:id - Get a specific recipe by ID
router.get('/:id', validateObjectId, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({
        error: 'Recipe not found',
        message: `No recipe found with ID: ${req.params.id}`
      });
    }

    res.json({
      success: true,
      data: recipe
    });
  } catch (error) {
    console.error('Error fetching recipe:', error);
    res.status(500).json({
      error: 'Failed to fetch recipe',
      message: error.message
    });
  }
});

// PUT /recipe/:id - Update a specific recipe by ID
router.put('/:id', validateObjectId, validateRecipeData, async (req, res) => {
  try {
    const { name, description, difficulty, ingredients, steps } = req.body;

    // Filter out empty strings from arrays
    const filteredIngredients = ingredients
      .filter(ingredient => ingredient && ingredient.trim() !== '');
    const filteredSteps = steps
      .filter(step => step && step.trim() !== '');

    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      {
        name: name.trim(),
        description: description.trim(),
        difficulty: difficulty.trim(),
        ingredients: filteredIngredients,
        steps: filteredSteps
      },
      { new: true, runValidators: true }
    );

    if (!updatedRecipe) {
      return res.status(404).json({
        error: 'Recipe not found',
        message: `No recipe found with ID: ${req.params.id}`
      });
    }

    res.json({
      success: true,
      message: 'Recipe updated successfully',
      data: updatedRecipe
    });
  } catch (error) {
    console.error('Error updating recipe:', error);

    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        error: 'Validation failed',
        details: validationErrors
      });
    }

    res.status(500).json({
      error: 'Failed to update recipe',
      message: error.message
    });
  }
});

// DELETE /recipe/:id - Delete a specific recipe by ID
router.delete('/:id', validateObjectId, async (req, res) => {
  try {
    const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);
    if (!deletedRecipe) {
      return res.status(404).json({
        error: 'Recipe not found',
        message: `No recipe found with ID: ${req.params.id}`
      });
    }

    res.json({
      success: true,
      message: 'Recipe deleted successfully',
      data: deletedRecipe
    });
  } catch (error) {
    console.error('Error deleting recipe:', error);
    res.status(500).json({
      error: 'Failed to delete recipe',
      message: error.message
    });
  }
});

module.exports = router;
