const mongoose = require("mongoose");

const IngredientSchema = mongoose.Schema({
  name: {
    type: String,
  },
  price: {
    type: Number,
  },
  time: {
    type: Number,
  },
});

module.exports = mongoose.model("Ingredient", IngredientSchema);
