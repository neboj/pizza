const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/Users");

//check login cred

router.post("/login", (req, res) => {
  const user = User.findOne({
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

router.post("/register", (req, res) => {
  const user = new User({
    name: req.body.name,
    password: req.body.password,
  });

  user
    .save()
    .then((data) => {
      console.log(data);
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

module.exports = router;
