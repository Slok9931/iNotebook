const express = require("express");
const { body, validationResult } = require("express-validator");
const Router = express.Router();
const Note = require("../models/Notes");
const fetchuser = require("../middleware/fetchuser");
Router.get("/fetchallnotes", fetchuser, async (req, res) => {
  const notes = await Note.find({ user: req.user.id });
  res.json(notes);
});
Router.post(
  "/addnotes",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 1 }),
    body("description", "Enter a valid description").isLength({ min: 1 }),
  ],
  async (req, res) => {
    const { title, description } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const note = new Note({
        title,
        description,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.log(error.message);
      res.status(500).json("Error occured.");
    }
  }
);
Router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, favourite } = req.body;
  try {
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (favourite){
      newNote.favourite = favourite;
    }
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }
    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Error occured.");
  }
});
Router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  const { title, description } = req.body;
  try {
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }
    note = await Note.findByIdAndDelete(req.params.id);
    res.send("Success: Note has been deleted");
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Error occured.");
  }
});
module.exports = Router;
