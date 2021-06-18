const PizzaService = require("../components/pizza/service/fetch-service");
const UpdateStateService = require("../services/state/update-service");
const OrderService = require("../services/state/order-service");

const calculateCooking = (order) => {
  const priceOfThisPizza = PizzaService.getPrice(order);
  const timeForThisPizza = PizzaService.getCookingTime(order);

  const orderWaitTime = OrderService.getWaitTimeForOrder(
    order,
    timeForThisPizza
  );
  UpdateStateService.updateLastOrderTimestamp(order, timeForThisPizza);

  return [orderWaitTime, priceOfThisPizza, timeForThisPizza];
};

module.exports.calculateCooking = calculateCooking;
