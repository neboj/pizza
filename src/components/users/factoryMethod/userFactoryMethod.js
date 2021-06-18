const User = require("../model/Users");

class UserFactoryMethod {
  make({ name, password }) {
    return new User({
      name,
      password,
    });
  }
}

module.exports.UserFactoryMethod = UserFactoryMethod;
