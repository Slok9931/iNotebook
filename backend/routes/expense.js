const express = require("express");
const { body, validationResult } = require("express-validator");
const Router = express.Router();
const Expense = require("../models/Expense");
const fetchuser = require("../middleware/fetchuser");
Router.get("/fetchallexpenses", fetchuser, async (req, res) => {
  const expenses = await Expense.find({ user: req.user.id });
  res.json(expenses);
});
Router.post(
  "/addexpenses",
  fetchuser,
  async (req, res) => {
    const { amount, date, category, note, transaction } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const expense = new Expense({
        amount,
        category,
        note,
        user: req.user.id,
        date,
        transaction
      });
      const savedExpense = await expense.save();
      res.json(savedExpense);
    } catch (error) {
      console.log(error.message);
      res.status(500).json("Error occured.");
    }
  }
);
Router.put("/updateexpense/:id", fetchuser, async (req, res) => {
  const { amount, category, date, note, transaction } = req.body;
  try {
    const newExpense = {};
    if (amount) {
      newExpense.amount = amount;
    }
    if (category){
      newExpense.category = category;
    }
    if (date){
      newExpense.date = date;
    }
    if (note){
      newExpense.note = note;
    }
    if (transaction){
      newExpense.transaction = transaction;
    }
    let expense = await Expense.findById(req.params.id);
    if (!expense) {
      return res.status(404).send("Not found");
    }
    if (expense.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }
    expense = await Expense.findByIdAndUpdate(
      req.params.id,
      { $set: newExpense },
      { new: true }
    );
    res.json({ expense });
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Error occured.");
  }
});
Router.delete("/deleteexpense/:id", fetchuser, async (req, res) => {
  try {
    let expense = await Expense.findById(req.params.id);
    if (!expense) {
      return res.status(404).send("Not found");
    }
    if (expense.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }
    expense = await Expense.findByIdAndDelete(req.params.id);
    res.send("Success: Note has been deleted");
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Error occured.");
  }
});
module.exports = Router;
