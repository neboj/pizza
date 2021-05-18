const calculateCooking = (order) => {
  const currentPizza = state.cache.pizzas.find((pizza) => {
    return pizza.name == order.size;
  });
  const currentIngredients = order.ingredients.map((orderIngredientName) => {
    //   console.log("orderIngredientName: " + orderIngredientName);
    return state.cache.ingredients.find((cachedIngred) => {
      // console.log(cachedIngred);
      return cachedIngred.name === orderIngredientName;
    });
  });
  let priceOfThisPizza = currentIngredients.reduce((accumulator, current) => {
    return accumulator + current.price;
  }, currentPizza.price);
  let timeForThisPizza = currentIngredients.reduce((accumulator, current) => {
    return accumulator + current.time;
  }, currentPizza.time);

  if (order.orderNumber === 1) {
    state.whenIsLastOrderDoneTimestamp = Date.now() + timeForThisPizza;
    console.log(
      "Last order done timestamp FIRST: " + state.whenIsLastOrderDoneTimestamp
    );
    console.log("whenIsThisPizzaComing FIRST: " + timeForThisPizza);
    return [timeForThisPizza, priceOfThisPizza];
  } else {
    let whenIsThisPizzaComing =
      state.whenIsLastOrderDoneTimestamp - Date.now() + timeForThisPizza;
    state.whenIsLastOrderDoneTimestamp += timeForThisPizza;
    console.log(
      "Last order done timestamp: " + state.whenIsLastOrderDoneTimestamp
    );
    console.log("Date now timestamp: " + Date.now());
    console.log(state.whenIsLastOrderDoneTimestamp > Date.now());
    console.log(
      "When is this pizza comming  not first: " +
        whenIsThisPizzaComing / 1000 +
        "s"
    );
    return [whenIsThisPizzaComing, priceOfThisPizza];
  }
};

module.exports.calculateCooking = calculateCooking;
