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
