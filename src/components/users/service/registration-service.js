const { UserFactoryMethod } = require("../factoryMethod/userFactoryMethod");

/**
 *
 * @param {object} user
 * @returns
 */
const addUser = async (user) => {
  try {
    const savedUser = await user.save();
    console.log("Saved user: ", savedUser);
    return savedUser;
  } catch (err) {
    console.log("User save failed err.");
    throw err;
  }
};

const createUser = (user) => {
  const userFactoryMethod = new UserFactoryMethod();
  const newUser = userFactoryMethod.make(user);
  return newUser;
};

module.exports = {
  createUser,
  addUser,
};
