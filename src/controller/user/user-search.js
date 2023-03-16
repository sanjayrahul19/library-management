import { User } from "../../model/user";
import { responseHandler } from "../../response/responseHandler";

export const searchUser = async (req, res) => {
  try {
    const user = await User.find({
      name: { $regex: req.body.name, $options: "i" },
    })
      .select("name email role")
      .populate("books", { name: 1, author: 1, journal: 1 });
    return responseHandler(res, 200, "User details sent successfully", user);
  } catch (err) {
    return responseHandler(res, 500, err.message);
  }
};
