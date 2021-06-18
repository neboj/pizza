const { Chef } = require("../../utils/Chef");
const {
  OrderFactoryMethod,
} = require("../../components/order/factoryMethod/OrderFactoryMethod");
const { validate } = require("../../utils/Validator");
const {
  CookingTimeDecorator,
} = require("../../components/order/decorator/CookingTime");
const OrderStateService = require("../state/order-service");
const { ValidationError } = require("../../exceptions/ValidationException");

/**
 * Creates and validates new Order Schema doc object
 *
 * @param {object} data
 * @returns
 */
const createOrder = async (data) => {
  try {
    const orderFactoryMethod = new OrderFactoryMethod();
    let order = orderFactoryMethod.make(data);
    validate(order);
    return order;
  } catch (err) {
    console.log("Create order err.");
    throw new ValidationError(err.message, "");
  }
};

/**
 * Adds new order to prepare
 *
 * @param {object} order
 * @returns
 */
const addOrder = async (order) => {
  try {
    const savedOrder = await order.save();

    OrderStateService.incrementOrders(order);

    const chef = new Chef();
    chef.cook(savedOrder, order.orderWaitTime);

    return savedOrder;
  } catch (err) {
    console.log("Add order err.");
    throw err;
  }
};

/**
 * Adds cooking time to order
 *
 * @param {object} order
 * @returns
 */
const addCookingTimeToOrder = async (order) => {
  const cookingTimeDecorator = new CookingTimeDecorator();
  return cookingTimeDecorator.decorate(order);
};

module.exports = { createOrder, addOrder, addCookingTimeToOrder };
