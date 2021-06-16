const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  port: process.env.PORT,
  mongoUrl: process.env.DB_CONNECTION,
};
