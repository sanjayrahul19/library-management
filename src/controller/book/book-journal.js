import { Book } from "../../model/books";
import { responseHandler } from "../../response/responseHandler";

export const bookJournal = async (req, res) => {
  try {
    const books = await Book.find({ journal: req.body.journal }).select(
      "name author journal"
    );
    return responseHandler(res, 200, "Book sent successfully", true, books);
  } catch (err) {
    return responseHandler(res, 500, err.message, false);
  }
};
