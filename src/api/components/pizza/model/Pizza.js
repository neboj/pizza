const mongoose = require("mongoose");

const PizzaSchema = mongoose.Schema({
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

//add collection name as 3rd parameter bcs it will look for
//pluralized collection name 'pizzas' by default
module.exports = mongoose.model("Pizza", PizzaSchema, "pizza");
