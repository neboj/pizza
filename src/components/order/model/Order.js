const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
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
  orderWaitTime: {
    type: Number,
  },
  orderPrice: {
    type: Number,
  },
});

const allOriginalValues = (arr) => {
  // checks for duplicate values
  return !arr.some(
    (current, currentIndex) => arr.indexOf(current) !== currentIndex
  );
};
const validator = (value) => {
  return allOriginalValues(value);
};
OrderSchema.path("ingredients").validate(
  validator,
  "`{VALUE}` - repeated ingredient, only once is allowed per pizza !"
);
module.exports = mongoose.model("Order", OrderSchema);
