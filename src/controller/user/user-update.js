import { updateSchema, User } from "../../model/user";
import { responseHandler } from "../../response/responseHandler";
import { client } from "../../server";
import { redis } from "../../server";

export const userUpdate = async (req, res) => {
  try {
    const id = req.params.id;
    const { error, value } = updateSchema.validate(req.body);
    if (error) {
      return responseHandler(res, 403, error.details[0].message, false);
    } else {
      const user = await User.findByIdAndUpdate(
        { _id: id },
        {
          name: value.name,
          email: value.email,
        },
        { new: true }
      );
      redis.del("user"); 
      return responseHandler(
        res,
        200,
        "User details updated successfully",
        true,
        user
      );
    }
  } catch (err) {
    return responseHandler(res, 500, err.message, false);
  }
};
