//schemas
const Order = require("../../api/components/order/model/Order");

//services
const OrderService = require("../order/registration-service");

module.exports = {
  restorePreviousState: async () => {
    try {
      const data = await Order.find({ status: "pending" });

      console.log("Got all the pending orders from db");
      for (let pendingOrder of data) {
        pendingOrder = await OrderService.addCookingTimeToOrder(pendingOrder);
        await OrderService.addOrder(pendingOrder);
      }
    } catch (err) {
      console.log("Restore previous state err.");
      throw err;
    }
  },
};
