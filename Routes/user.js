import express from "express";
import { Users, generatejwtToken } from "../Models/user.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.get("/all", async (req, res) => {
  try {
    const users = await Users.find();
    if (!users) res.status(400).json({ message: "No users Found" });
    res.status(200).json({ data: users, message: "Data found Successfull" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/signup", async (req, res) => {
  try {
    let user = await Users.findOne({ email: req.body.email });
    if (user) return res.status(400).json({ message: "User Already exists" });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    user = await new Users({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    }).save();
    const token = generatejwtToken(user._id);
    res.status(200).json({ message: "Token Generated", token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
router.post("/login", async (req, res) => {
  try {
    const user = await Users.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ message: "User not found" });
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      res.status(400).json({ message: "Password not matching" });
    const token = generatejwtToken(user._id);
    res.status(200).json({ token: token, message: "Login Successful" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export const userRouter = router;
