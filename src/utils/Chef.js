const {
  OrderRepository,
} = require("../components/order/repository/Order");
const StateOrderService = require("../services/state/order-service");

class Chef {
  cook(orderData, orderWaitTime) {
    const data = orderData;
    console.time("TimeTookMakingThisPizza: " + data._id);
    setTimeout(
      (data) => {
        console.log(
          `This order is finished (#${data.orderNumber}): ${data._id}`
        );
        console.timeEnd("TimeTookMakingThisPizza: " + data._id);

        StateOrderService.decrementOrders();

        try {
          const repo = new OrderRepository();
          repo.finishOrder(data);
        } catch (err) {
          console.log("Could not finish order.");
          throw err;
        }
      },
      orderWaitTime,
      data
    );
  }
}

module.exports.Chef = Chef;
