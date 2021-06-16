module.exports = {
  getWaitTimeForOrder: (order, pizzaWaitTime) => {
    if (order.orderNumber === 1) {
      console.log("whenIsThisPizzaComing FIRST: " + pizzaWaitTime / 1000 + "s");
      return pizzaWaitTime;
    } else {
      const orderWaitTime =
        state.whenIsLastOrderDoneTimestamp - Date.now() + pizzaWaitTime;
      console.log(
        "When is this pizza coming  not first: " + orderWaitTime / 1000 + "s"
      );
      return orderWaitTime;
    }
  },
};
