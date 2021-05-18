const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const fetch = require("node-fetch");
require("dotenv/config");

global.state = {
  orderCount: 0,
  public: {
    recentOrders: [],
  },
  admin: {
    serverStartTime: Date.now(), //for total app working time (DO NOT TOUCH)
    lastOrderTimestamp: Date.now(), //for work time since last start (UPDATE ON EVERY FIRST ORDER)
  },
  cache: {
    ingredients: [],
    pizzas: [],
  },
  currentCookingWaitingTime: 0,
  whenIsLastOrderDoneTimestamp: Date.now(),
};

const Ingredient = require("./models/Ingredient");
const Pizza = require("./models/Pizza");
const Order = require("./models/Order");

app.use(cors());
app.use(bodyParser.json());

//import routes
const orderRoutes = require("./routes/public");
const loginRoutes = require("./routes/login");
const adminRoutes = require("./routes/admin");
const authMiddleware = require("./routes/verifyToken");

//middlewares
app.use("/order", orderRoutes);
app.use("/", loginRoutes);
app.use("/admin", authMiddleware, adminRoutes);

//connect to db
mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to db");
    const ingredients = Ingredient.find()
      .then((data) => {
        console.log("Order count: " + state.orderCount);
        console.log("Got all the ingredients from db for cache");
        state.cache.ingredients = data;
        console.log("Storing ingredients in cache done.");
      })
      .catch((err) => {
        console.error({ message: err });
      });

    const pizzas = Pizza.find()
      .then((data) => {
        console.log("Order count: " + state.orderCount);
        console.log("Got all the pizzas from db for cache");
        state.cache.pizzas = data;
        console.log("Storing pizzas in cache done.");
      })
      .catch((err) => {
        console.error({ message: err });
      });

    const pendingOrders = Order.find({ status: "pending" })
      .then((data) => {
        console.log("Got all the pending orders from db");

        data.map((pendingOrder) => {
          Order.deleteOne({ _id: pendingOrder._id })
            .then((data) => {
              console.log({ message: "Deleted old order" });
            })
            .catch((err) => {
              console.log({ message: err });
            });
          fetch("http://localhost:3000/order/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(pendingOrder),
          })
            .then((fetchData) => {
              return fetchData.json();
            })
            .then((data) => {
              console.log(data);
            })
            .catch((err) => {
              console.log(err);
            });
        });
      })
      .catch((err) => {
        console.error({ message: err });
      });
  })
  .catch((err) => console.error("Something went wrong with mongoose db", err));

// listen
app.listen(3000, () => {
  console.log("Server listening");
});
