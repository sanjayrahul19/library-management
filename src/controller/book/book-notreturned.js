import { Book } from "../../model/books";
import { responseHandler } from "../../response/responseHandler";

export const bookNotReturned = async (req, res) => {
  try {
    const book = await Book.find({ returned: false }).select(
      "name author journal"
    );
    return responseHandler(
      res,
      200,
      "Book details sent successfully",
      true,
      book
    );
  } catch (err) {
    return responseHandler(res, 500, err.message, false);
  }
};
