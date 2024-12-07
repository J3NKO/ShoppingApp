import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
//import DB data/docuemnt model
import { UserModel } from "../models/Users.js";


//initialising express routing - /auth route
const router = express.Router();

//post route for registering (sending log in data to db)
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required." });
  }

  const user = await UserModel.findOne({ username });
  if (user) {
    return res.status(400).json({ message: "Username already exists!" });
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const newUser = new UserModel({
    username,
    password: hashedPassword,
  });

  await newUser.save();
  res.status(201).json({ message: "Account Registered Successfully!" });
});

// Login Route
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required." });
  }

  const user = await UserModel.findOne({ username });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const isPassValid = await bcrypt.compare(password, user.password);
  if (!isPassValid) {
    return res.status(401).json({ message: "Invalid password" });
  }

  const token = jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: "1h" });

  res.json({ token, UserID: user._id });
});



//exporting and renaming router for users
export {router as userRouter};