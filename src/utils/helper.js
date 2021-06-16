const PizzaService = require("../services/pizza/fetch-service");
const UpdateStateService = require("../services/state/update-service");
const StateService = require("../services/state/state-service");

const calculateCooking = (order) => {
  const priceOfThisPizza = PizzaService.getPrice(order);
  const timeForThisPizza = PizzaService.getCookingTime(order);

  const orderWaitTime = StateService.getWaitTimeForOrder(
    order,
    timeForThisPizza
  );
  UpdateStateService.updateLastOrderTimestamp(order, timeForThisPizza);

  return [orderWaitTime, priceOfThisPizza, timeForThisPizza];
};

module.exports.calculateCooking = calculateCooking;
