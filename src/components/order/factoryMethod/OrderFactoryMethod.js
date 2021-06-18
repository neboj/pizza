const Order = require("../model/Order");

class OrderFactoryMethod {
  make(data) {
    return new Order({
      status: "pending",
      size: data.size,
      firstName: data.firstName,
      lastName: data.lastName,
      address: data.address,
      phone: data.phone,
      ingredients: data.ingredients,
    });
  }
}

module.exports.OrderFactoryMethod = OrderFactoryMethod;
