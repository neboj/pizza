const MESSAGE_FULL_CAPACTIY = "Sorry we are full, try later";
const LIMIT_FULL_CAPACITY = 15;

const capacityMiddleware = (req, res, next) => {
  if (state.public.recentOrders.length >= LIMIT_FULL_CAPACITY)
    return res.json({ message: MESSAGE_FULL_CAPACTIY });
  next();
};

module.exports = capacityMiddleware;
