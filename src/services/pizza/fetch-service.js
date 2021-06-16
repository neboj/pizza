const IngredientsService = require("../ingredients/fetch-service");

const getPizza = (order) => {
  const currentPizza = state.cache.pizzas.find((pizza) => {
    return pizza.name == order.size;
  });
  return currentPizza;
};

const getPrice = (order) => {
  const currentPizza = getPizza(order);
  const currentIngredients = IngredientsService.getIngredients(order);
  const priceOfThisPizza = currentIngredients.reduce((accumulator, current) => {
    return accumulator + current.price;
  }, currentPizza.price);
  return priceOfThisPizza;
};

const getCookingTime = (order) => {
  const currentPizza = getPizza(order);
  const currentIngredients = IngredientsService.getIngredients(order);
  const timeForThisPizza = currentIngredients.reduce((accumulator, current) => {
    return accumulator + current.time;
  }, currentPizza.time);
  return timeForThisPizza;
};

module.exports = {
  getPizza: getPizza,
  getPrice: getPrice,
  getCookingTime: getCookingTime,
};
