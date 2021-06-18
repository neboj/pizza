const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../src/components/users/model/Users");
const UserService = require("../src/components/users/service/registration-service");
//check login cred

router.post("/login", (req, res) => {
  User.findOne({
    name: req.body.name,
  })
    .then((data) => {
      console.log(data);
      const token = jwt.sign(
        { user: { _id: data._id } },
        process.env.TOKEN_SECRET
      );
      res.header("auth-token", token).send(token);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

router.post("/register", async (req, res) => {
  const { name, password } = req.body;
  const user = UserService.createUser({ name, password });
  try {
    const savedUser = await UserService.addUser(user);
    res.json({ savedUser });
  } catch (err) {
    console.log("Register user failed err.");
    return res.json({ message: "Sorry something went wrong" });
  }
});

module.exports = router;
