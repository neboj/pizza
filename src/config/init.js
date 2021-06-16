const { mongoUrl } = require("./index");
const mongoose = require("mongoose");

module.exports = {
  initializeDB: async () => {
    try {
      await mongoose.connect(mongoUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Connected to db");
    } catch (err) {
      console.log(`Mongo db setup err.`);
      throw err;
    }
  },
};
