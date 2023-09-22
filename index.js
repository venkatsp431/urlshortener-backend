import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dbConnection from "./db.js";
import { userRouter } from "./Routes/user.js";
import { urlRouter } from "./Routes/url.js";
// import { userRouter } from "./Routes/user.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

dbConnection();
app.use(cors());
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/urlshort", urlRouter);

app.listen(PORT, () => console.log("Server is running in localhost:8000"));
