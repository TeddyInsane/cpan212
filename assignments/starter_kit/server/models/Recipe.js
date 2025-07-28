const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Recipe name is required'],
    trim: true,
    minlength: [2, 'Recipe name must be at least 2 characters long'],
    maxlength: [100, 'Recipe name cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Recipe description is required'],
    trim: true,
    minlength: [10, 'Description must be at least 10 characters long'],
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  difficulty: {
    type: String,
    required: [true, 'Difficulty level is required'],
    enum: {
      values: ['Easy', 'Medium', 'Hard'],
      message: 'Difficulty must be Easy, Medium, or Hard'
    },
    trim: true
  },
  ingredients: {
    type: [String],
    required: [true, 'Ingredients are required'],
    validate: [
      {
        validator: function(array) {
          return array && array.length > 0;
        },
        message: 'At least one ingredient is required'
      },
      {
        validator: function(array) {
          return array.every(ingredient => ingredient && ingredient.trim().length > 0);
        },
        message: 'All ingredients must be non-empty'
      }
    ]
  },
  steps: {
    type: [String],
    required: [true, 'Cooking steps are required'],
    validate: [
      {
        validator: function(array) {
          return array && array.length > 0;
        },
        message: 'At least one cooking step is required'
      },
      {
        validator: function(array) {
          return array.every(step => step && step.trim().length > 0);
        },
        message: 'All steps must be non-empty'
      }
    ]
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for ingredient count
recipeSchema.virtual('ingredientCount').get(function() {
  return this.ingredients ? this.ingredients.length : 0;
});

// Virtual for step count
recipeSchema.virtual('stepCount').get(function() {
  return this.steps ? this.steps.length : 0;
});

// Pre-save middleware to clean up arrays
recipeSchema.pre('save', function(next) {
  if (this.ingredients) {
    this.ingredients = this.ingredients
      .map(ingredient => ingredient.trim())
      .filter(ingredient => ingredient.length > 0);
  }

  if (this.steps) {
    this.steps = this.steps
      .map(step => step.trim())
      .filter(step => step.length > 0);
  }

  next();
});

// Index for better search performance
recipeSchema.index({ name: 1 });
recipeSchema.index({ difficulty: 1 });
recipeSchema.index({ createdAt: -1 });

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
