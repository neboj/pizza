const helperUtil = require("../../../../utils/helper");

class CookingTimeDecorator {
  decorate(order) {
    order.orderNumber = state.public.recentOrders.length + 1;
    const [orderWaitTime, price, orderTime] =
      helperUtil.calculateCooking(order);
    order.orderWaitTime = orderWaitTime;
    order.orderPrice = price;
    order.orderTime = orderTime;
    return order;
  }
}

module.exports.CookingTimeDecorator = CookingTimeDecorator;
