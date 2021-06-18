module.exports = {
  getIngredients: (order) => {
    const currentIngredients = order.ingredients.map((orderIngredientName) => {
      return state.cache.ingredients.find((cachedIngred) => {
        return cachedIngred.name === orderIngredientName;
      });
    });
    return currentIngredients;
  },
};
