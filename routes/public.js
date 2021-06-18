const express = require("express");

const router = express.Router();
const capacityMiddleware = require("../src/middleware/capacity");
const Order = require("../src/components/order/model/Order");
const OrderService = require("../src/components/order/service/registration-service");

const { json } = require("body-parser");
const { ValidationError } = require("../src/exceptions/ValidationException");

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
router.post("/", capacityMiddleware, async (req, res) => {
  try {
    let order = await OrderService.createOrder(req.body);
    order = await OrderService.addCookingTimeToOrder(order);
    const savedOrder = await OrderService.addOrder(order);

    return res.json({
      orderNumber: order.orderNumber,
      orderWaitTime: order.orderWaitTime / 1000 + "s",
      id: savedOrder._id,
      order: savedOrder,
    });
  } catch (err) {
    console.log(err.message);
    if (err instanceof ValidationError)
      return res.json({ message: err.message });
    return res.json({ message: "Sorry, something went wrong" });
  }
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
