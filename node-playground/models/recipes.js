const { Schema, model } = require("mongoose");

const recipeSchema = new Schema({
  title: String,
  calories_per_serving: Number,
  cook_time: Number,
  desc: String,
  directions: [String],
  ingredients: [
    {
      name: String,
      quantity: {
        amount: Number,
        unit: String,
      },
    },
  ],
  likes: [Number],
  likes_count: Number,
  prep_time: Number,
  rating: [Number],
  rating_avg: Number,
  servings: Number,
  tags: [String],
  type: String,
});

module.exports = model("recipes", recipeSchema);
