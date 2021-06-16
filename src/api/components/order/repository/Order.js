const Order = require("../model/Order");

class OrderRepository {
  finishOrder(data) {
    // update order db status to done
    Order.updateOne(
      { _id: data._id },
      { $set: { status: "done", orderNumber: -1 } }
    )
      .then((data) => {
        console.log({ message: "Done order" });
      })
      .catch((err) => {
        console.log({ message: err });
        throw err;
      });
  }
}

module.exports.OrderRepository = OrderRepository;
