const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const { port } = require("./config");
require("./config/globals");
const config = require("../src/config/init");

app.use(cors());
app.use(bodyParser.json());

//services
const CacheService = require("./services/cache/prepare-service");
const GlobalStateService = require("./services/state/restore-service");

//schemas
const Ingredient = require("./api/components/ingredient/model/Ingredient");
const Pizza = require("./api/components/pizza/model/Pizza");

//import routes
const orderRoutes = require("../routes/public");
const loginRoutes = require("../routes/login");
const adminRoutes = require("../routes/admin");
const authMiddleware = require("./middleware/verifyToken");

//middlewares
app.use("/order", orderRoutes);
app.use("/", loginRoutes);
app.use("/admin", authMiddleware, adminRoutes);

const startServer = async () => {
  //connect to db
  try {
    await config.initializeDB();
    await CacheService.prepareCacheDocs(Ingredient, "ingredients");
    await CacheService.prepareCacheDocs(Pizza, "pizzas");
    await GlobalStateService.restorePreviousState();
  } catch (err) {
    console.log("Mongoose setup err: ", err.message);
    return;
  }

  // listen
  app.listen(port, () => {
    console.log("Server listening");
  });
};
startServer();
