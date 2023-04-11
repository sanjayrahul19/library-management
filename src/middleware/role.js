import jwt from "jsonwebtoken";
import { responseHandler } from "../response/responseHandler";

export const role = async (req, res, next) => {
  try {
    let token = req.headers["authorization"];
    console.log(token.split(" "), "token");
    if (token) {
      console.log(token, "token22222");
       token = token.split(" ")[1];
      console.log(token, "token");
      const data = await jwt.verify(token, "sanjay");
      console.log(data);
      if (data) {
        req.userId = data.id;
        req.role = data.role;
        // console.log(req.role);
        next();
      } else {
        res.status(401).json({ error: "Unauthorized" });
      }
    }
  } catch (err) {
    return responseHandler(res, 500, err.message, false);
  }
};
