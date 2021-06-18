const express = require("express");
const Order = require("../src/components/order/model/Order");

const router = express.Router();

// Get all orders
router.get("/all", (req, res) => {
  Order.find()
    .then((data) => {
      console.log(data);
      res.json(data);
    })
    .catch((err) => {
      console.log({ message: err });
      res.json({ message: err });
    });
});

// Get all money spent
router.get("/money", (req, res) => {
  Order.find({ status: "done" }, "orderPrice")
    .then((data) => {
      console.log(data);
      let allEarnings = data.reduce((accumulator, current) => {
        return accumulator + current.orderPrice;
      }, 0);
      res.json({ allEarnings });
    })
    .catch((err) => {
      console.log({ message: err });
      res.json({ message: err });
    });
});

// Get all working hours spent
router.get("/worktime", (req, res) => {
  Order.find({ status: "done" }, "orderTime")
    .then((data) => {
      let allWorkingTime = data.reduce((accumulator, current) => {
        return accumulator + current.orderTime;
      }, 0);
      allWorkingTime = parseInt(allWorkingTime / 1000) + "s";

      res.json({ allWorkingTime });
    })
    .catch((err) => {
      console.log({ message: err });
      res.json({ message: err });
    });
});

// Get time since last server start
router.get("/apptime", (req, res) => {
  let result = Date.now() - state.admin.serverStartTime;
  result += "ms";
  res.json({ result });
});

// Get top 5 ingredients
router.get("/ingredients", (req, res) => {
  let ingredientsFull = state.cache.ingredients;
  let ingredients = ingredientsFull.map((current) => current.name);
  let result = {};
  for (const [key, value] of Object.entries(ingredients)) {
    result[value] = 0;
  }

  Order.find({ status: "done" }, "ingredients")
    .then((data) => {
      //fill the result object with db data
      data.forEach((order) => {
        order.ingredients.forEach((i) => {
          result[i]++;
        });
      });

      let entries = Object.entries(result);
      let sorted = entries.sort((a, b) => b[1] - a[1]);
      let final5 = sorted.slice(0, 5);
      res.json({ final5 });
    })
    .catch((err) => {
      console.log({ message: err });
      res.json({ message: err });
    });
});
module.exports = router;
