import jwt from "jsonwebtoken";
import { Users } from "../Models/user";

const isAuthenticated = async (req, res, next) => {
  let token;
  if (req.headers) {
    try {
      token = await req.headers["x-auth-token"];
      const decode = jwt.verify(token, process.env.SECRETKEY);
      req.user = await Users.findById(decode.id).select("id email name");
      next();
    } catch (error) {
      console.log(error);
      return res.status(401).json({ message: "Invalid Token" });
    }
  }
};
export default isAuthenticated;
