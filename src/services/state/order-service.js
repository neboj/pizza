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
};
