import { Book } from "../../model/books";
import { responseHandler } from "../../response/responseHandler";

export const bookAll = async (req, res) => {
  try {
    const books = await Book.find().select("-__v");
    if (books.length == 0) {
      return responseHandler(res, 400, "No Books", false);
    }
    return responseHandler(
      res,
      200,
      "All Books sent successfully",
      true,
      books
    );
  } catch (err) {
    return responseHandler(res, 500, err.message, false);
  }
};
