import { User } from "../../model/user";
import bcrypt from "bcrypt";
import { responseHandler } from "../../response/responseHandler";
import jwt from "jsonwebtoken";

export const userLogin = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (user.verified) {
        const password = await bcrypt.compare(req.body.password, user.password);
        if (password) {
          const token = await jwt.sign(
            { id: user._id, role: user.role },
            "sanjay"
          );
          return responseHandler(
            res,
            200,
            "LoggedIn Successfully",
            true,
            token,
            {
              name: user.name,
              _id: user._id,
              email: user.email,
              role: user.role,
            }
          );
        } else {
          return responseHandler(res, 401, "Incorrect password", false);
        }
      } else {
        return responseHandler(res, 401, "User not Verified", false);
      }
    } else {
      return responseHandler(res, 404, "User not found", false);
    }
  } catch (err) {
    return responseHandler(res, 500, err.message, false);
  }
};
