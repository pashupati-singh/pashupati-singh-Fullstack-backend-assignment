const express = require("express");
const { auth } = require("../Middleware/Authentication.Middleware");
const { TodosModel } = require("../Model/Todos.Model");

const TodoRoutes = express.Router();

TodoRoutes.get("/", auth, async (req, res) => {
  const { userId } = req.body;
  try {
    const todos = await TodosModel.find();
    res.status(200).json({ todos });
  } catch (error) {
    res.status(400).json({ err: error });
  }
});

TodoRoutes.post("/add", auth, async (req, res) => {
  try {
    const newTodo = await TodosModel(req.body);
    await newTodo.save();
    res.status(200).json({ msg: "new Todo is added", newTodo });
  } catch (error) {
    res.status(400).json({ err: error });
  }
});

TodoRoutes.patch("/update/:id", auth, async (req, res) => {
  const { id } = req.params;
  const userID = req.body.userId;
  const Todos = await TodosModel.findOne({ _id: id });
  const todoUserId = Todos.userId;
  if (userID === todoUserId) {
    const Todo = await TodosModel.findByIdAndUpdate(
      { _id: Todos._id },
      req.body
    );
    res.status(200).json({ msg: "Item updated" });
  } else {
    res
      .status(400)
      .json({ msg: "you are not authorized to perform this task" });
  }
});

TodoRoutes.delete("/delete/:id", auth, async (req, res) => {
  const { id } = req.params;
  const userID = req.body.userId;
  const Todos = await TodosModel.findOne({ _id: id });
  const todoUserId = Todos.userId;
  if (userID === todoUserId) {
    const Todo = await TodosModel.findByIdAndDelete({ _id: Todos._id });
    res.status(200).json({ msg: "Item deleted" });
  } else {
    res
      .status(400)
      .json({ msg: "you are not authorized to perform this task" });
  }
});

module.exports = { TodoRoutes };
