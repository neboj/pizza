module.exports = {
  updateLastOrderTimestamp: (order, timeForThisPizza) => {
    if (order.orderNumber === 1) {
      state.whenIsLastOrderDoneTimestamp = Date.now() + timeForThisPizza;
    } else {
      state.whenIsLastOrderDoneTimestamp += timeForThisPizza;
    }
  },
};
