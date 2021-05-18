const mongoose = require("mongoose");

const StateSchema = mongoose.Schema({
  size: {
    type: String,
    required: [true, "Pizza size required"],
    enum: ["small", "medium", "large"],
  },
  firstName: {
    type: String,
    required: [true, "First name required"],
  },
  lastName: {
    type: String,
    required: [true, "Last name required"],
  },
  address: {
    type: String,
    required: [true, "Address required"],
  },
  phone: {
    type: String,
    required: [true, "Phone required"],
    min: [3, "Phone must have more than 3 digits"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    default: "pending",
  },
  ingredients: [
    {
      type: [String],
      required: [true, "Ingredient is required"],
      enum: [
        "cheese",
        "tomato sauce",
        "pepperoni",
        "mushrooms",
        "onions",
        "pineapple",
        "bacon",
        "olives",
      ],
    },
  ],
  orderNumber: {
    type: Number,
  },
  orderTime: {
    type: Number,
  },
  orderPrice: {
    type: Number,
  },
});

module.exports = mongoose.model("State", StateSchema);
