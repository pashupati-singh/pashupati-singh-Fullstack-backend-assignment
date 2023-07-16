const express = require("express");
const userRoutes = express.Router();
const bcrypt = require("bcrypt");
const { UserModel } = require("../Model/User.Model");
const jwt = require("jsonwebtoken");
const { blacklist } = require("../db/BlackList");

userRoutes.post("/register", async (req, res) => {
  const { name, email, password, address, age } = req.body;
  const user1 = await UserModel.findOne({ email });
  if (user1)
    return res
      .status(200)
      .json({ msg: "Email is already exist in different account" });

  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) {
        return res.status(200).json({ msg: "bcrypt" });
      } else if (hash) {
        const user = new UserModel({
          name,
          email,
          password: hash,
          address,
          age,
        });
        await user.save();
        res.status(200).json({ msg: "user successfully register" });
      }
    });
  } catch (error) {
    res.status(400).json({ err: error });
  }
});

userRoutes.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const userfound = await UserModel.findOne({ email });

    bcrypt.compare(password, userfound.password, (err, result) => {
      if (err) {
        return res.status(200).json({ msg: "wrong credientials" });
      } else if (result) {
        const token = jwt.sign(
          { userID: userfound._id, userName: userfound.name },
          "helloworld"
        );
        res.status(200).json({ msg: "you logged in succcesfully", token });
      }
    });
  } catch (error) {
    res.status(400).json({ err: error });
  }
});

userRoutes.get("/logout", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  try {
    blacklist.push(token);
    res.status(200).json({ msg: "you successfilly logged out" });
  } catch (error) {}
});

module.exports = { userRoutes };
