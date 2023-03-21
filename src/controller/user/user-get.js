import { User } from "../../model/user";
import { responseHandler } from "../../response/responseHandler";
import { client } from "../../server";

export const getAllUser = async (req, res) => {
  let results;

  try {
    const user = await User.find({})
      .select("name email role")
      .populate("books", { name: 1, author: 1, journal: 1 });
    const cachedResult = await client.get("user");
    if (cachedResult) {
      results = JSON.parse(cachedResult);
      return responseHandler(res, 200, "Data sent from cache", true, results);
    } else {
      results = await client.set("user", JSON.stringify(user), {
        EX: 60,
        NX: true,
      });

      return responseHandler(res, 200, "Data sent from database", true, user);
    }
  } catch (err) {
    return responseHandler(res, 500, err.message);
  }
};
