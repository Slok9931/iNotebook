const express = require("express");
const Router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
Router.post(
  "/createuser",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Enter a valid password").isLength({ min: 3 }),
    body("name", "Enter a valid name").isLength({ min: 3 }),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ success, error: "This email address already exists." });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        username: req.body.username,
        password: secPass,
        email: req.body.email,
        name: req.body.name,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const JWT_SECRET =
        "c0d608098b78d61cf5654965dab8b53632bf831dc6b43f29289411376ac107b";
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.send({ success, authtoken });
    } catch (error) {
      console.log(error.message);
      res.status(500).json("Error occured.");
    }
  }
);
Router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password can't be blank").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return re
          .status(400)
          .json({ error: "Please try to login with correct credentials." });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success = false;
        return re
          .status(400)
          .json({ error: "Please try to login with correct credentials." });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const JWT_SECRET =
        "c0d608098b78d61cf5654965dab8b53632bf831dc6b43f29289411376ac107b";
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.send({ success, authtoken });
    } catch (error) {
      console.log(error.message);
      res.status(500).json("Internal server error.");
    }
  }
);
Router.post("/getuser", fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Internal server error.");
  }
});


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

Router.put("/updateuser", fetchuser, upload.single("photo"), async (req, res) => {
  const { name, email, username, bio } = req.body;
  try {
    const userId = req.user.id;
    const newUser = {};
    if (name) newUser.name = name;
    if (email) newUser.email = email;
    if (username) newUser.username = username;
    if (bio) newUser.bio = bio;

    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const existingUserByEmail = await User.findOne({
      email: newUser.email,
      _id: { $ne: userId },
    });
    if (existingUserByEmail) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const existingUserByUsername = await User.findOne({
      username: newUser.username,
      _id: { $ne: userId },
    });
    if (existingUserByUsername) {
      return res.status(400).json({ error: "Username already exists" });
    }

    if (req.file) {
      const oldPhotoPath = existingUser.photo;
      if (oldPhotoPath) {
        const oldFilePath = path.join('uploads', path.basename(oldPhotoPath));
        fs.unlink(oldFilePath, (err) => {
          if (err) {
            console.error("Error deleting old photo:", err);
          }
        });
      }
      newUser.photo = `/uploads/${req.file.filename}`; 
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: newUser },
      { new: true, runValidators: true }
    ).select("-password");
    res.json(updatedUser);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Internal server error.");
  }
});


module.exports = Router;
