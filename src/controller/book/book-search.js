import { Book } from "../../model/books";
import { responseHandler } from "../../response/responseHandler";

export const searchBook = async (req, res) => {
  try {
    const student = await Book.find({
      name: { $regex: req.body.name, $options: "i" },
    }).select("name author journal");
    return responseHandler(res, 200, "Book details sent successfully", student);
  } catch (err) {
    return responseHandler(res, 500, err.message);
  }
};
