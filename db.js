import mongoose from "mongoose";

export default function dbConnection() {
  const params = {
    useUnifiedTopology: true,
    useNewURLParser: true,
  };
  try {
    mongoose.connect(
      "mongodb+srv://venki31:venki31@cluster0.pdvcbwv.mongodb.net/?retryWrites=true&w=majority",
      params
    );
    console.log("Mongo Connected");
  } catch (error) {
    console.log("Error connecting to:", error);
  }
}
