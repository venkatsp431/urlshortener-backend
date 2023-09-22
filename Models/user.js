import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;
import jwt from "jsonwebtoken";

const generatejwtToken = function (id) {
  return jwt.sign({ id }, process.env.SECRETKEY);
};

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Users = mongoose.model("user", userSchema);
export { Users };
export { generatejwtToken };
