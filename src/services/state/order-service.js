module.exports = {
  incrementOrders: (order) => {
    state.orderCount++;
    order.orderNumber = state.public.recentOrders.length + 1;
    state.public.recentOrders.push(order);
  },

  decrementOrders: () => {
    state.public.recentOrders.shift();
    state.public.recentOrders = state.public.recentOrders.map((current) => {
      current.orderNumber--;
      return current;
    });
  },

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
