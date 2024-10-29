const express = require("express");
const { body, validationResult } = require("express-validator");
const Router = express.Router();
const Todo = require("../models/Todo");
const fetchuser = require("../middleware/fetchuser");
Router.get("/fetchalltodos", fetchuser, async (req, res) => {
  const todos = await Todo.find({ user: req.user.id });
  res.json(todos);
});
Router.post(
  "/addtodos",
  fetchuser,
  [
    body("work", "Enter a valid work").isLength({ min: 2 })
  ],
  async (req, res) => {
    const { work, date } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const todo = new Todo({
        work,
        user: req.user.id,
        date
      });
      const savedTodo = await todo.save();
      res.json(savedTodo);
    } catch (error) {
      console.log(error.message);
      res.status(500).json("Error occured.");
    }
  }
);
Router.put("/updatetodo/:id", fetchuser, async (req, res) => {
  const { work, status, date, priority } = req.body;
  try {
    const newTodo = {};
    if (work) {
      newTodo.work = work;
    }
    if (status){
      newTodo.status = status;
    }
    if (date){
      newTodo.date = date;
    }
    if (priority){
      newTodo.priority = priority;
    }
    let todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).send("Not found");
    }
    if (todo.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }
    todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { $set: newTodo },
      { new: true }
    );
    res.json({ todo });
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Error occured.");
  }
});
Router.delete("/deletetodo/:id", fetchuser, async (req, res) => {
  try {
    let todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).send("Not found");
    }
    if (todo.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }
    todo = await Todo.findByIdAndDelete(req.params.id);
    res.send("Success: Note has been deleted");
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Error occured.");
  }
});
module.exports = Router;
