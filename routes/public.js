const express = require("express");

const router = express.Router();
const Order = require("../models/Order");
const State = require("../models/State");

const validationUtil = require("../models/utils/validation");
const helperUtil = require("../models/utils/helper");
const { json } = require("body-parser");

// Get recent orders
router.get("/recent", (req, res) => {
  //remove order ids for security
  const result = state.public.recentOrders.map((current) => {
    return {
      status: current.status,
      size: current.size,
      ingredients: current.ingredients,
      size: current.size,
      firstName: current.firstName,
      lastName: current.lastName,
      orderNumber: current.orderNumber,
    };
  });
  res.json({
    message: "Recent orders (pending)",
    orders: result,
  });
});

// Get order by Id
router.get("/:orderId", (req, res) => {
  //check recents
  let cachedOrder = state.public.recentOrders.find(
    (recentOrder) => recentOrder._id == req.params.orderId
  );
  if (cachedOrder) {
    return res.json({ message: "Your order is still preparing" });
  }
  //check db
  const order = Order.findOne({ _id: req.params.orderId })
    .then((data) => {
      if (!data) {
        return res.json({ message: "No such order" });
      } else {
        console.log("Get order: " + data);
        if (data.status == "cancelled")
          return res.json({ message: "You order is cancelled" });
        else return res.json({ message: "You order is done" });
      }
    })
    .catch((err) => {
      if (err.name) console.log({ message: err });
      return res.json({ message: err });
    });
});

// Post order
router.post("/", (req, res) => {
  if (state.public.recentOrders.length === 15) {
    return res.json({ messsage: "Sorry we are full, try later" });
  }

  const order = new Order({
    status: "pending",
    size: req.body.size,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    address: req.body.address,
    phone: req.body.phone,
    ingredients: req.body.ingredients,
    orderNumber: state.public.recentOrders.length + 1,
  });

  validationUtil
    .testValidation(order)
    .then((data) => {
      state.orderCount++;
      // order.orderNumber = state.orderCount;
      order.orderNumber = state.public.recentOrders.length + 1;

      state.public.recentOrders.push(order);

      const [orderWaitTime, price] = helperUtil.calculateCooking(order);
      order.orderTime = orderWaitTime;
      order.orderPrice = price;

      order
        .save()
        .then((data) => {
          //chef handle
          console.time("TimeTookMakingThisPizza" + order._id);
          setTimeout(
            (data) => {
              console.log("This order is finished: " + data._id);
              console.timeEnd("TimeTookMakingThisPizza" + data._id);

              state.public.recentOrders.shift();
              state.public.recentOrders = state.public.recentOrders.map(
                (current, index) => {
                  current.orderNumber--;
                  return current;
                }
              );

              // update order db status to done
              Order.updateOne(
                { _id: data._id },
                { $set: { status: "done", orderNumber: -1 } }
              )
                .then((data) => {
                  console.log({ message: "Updated order" });
                })
                .catch((err) => {
                  console.log({ message: err });
                });
            },
            orderWaitTime,
            data
          );

          res.json({
            orderNumber: order.orderNumber,
            orderWaitTime: data.orderTime,
            id: data._id,
            order: data,
          });
        })
        .catch((err) => {
          console.log(err);
          res.json({ message: err.message });
        });
    })
    .catch((err) => {
      return res.json({ message: err });
    });
});

// Cancel (Patch) order by Id
router.patch("/:orderId", (req, res) => {
  //check recents
  let cachedOrder = state.public.recentOrders.find(
    (recentOrder) => recentOrder._id == req.params.orderId
  );
  if (!cachedOrder) {
    return res.json({ message: "Sorry, no such order is currently preparing" });
  }
  Order.updateOne(
    { _id: req.params.orderId },
    { $set: { status: "cancelled", orderNumber: -1 } }
    //   { $set: { status: req.body.status } }
  )
    .then((data) => {
      console.log({ message: "Updated order", data });
      res.json({ message: "Updated order", data });
    })
    .catch((err) => {
      console.log({ message: err });
      res.json({ message: err });
    });
});

module.exports = router;
