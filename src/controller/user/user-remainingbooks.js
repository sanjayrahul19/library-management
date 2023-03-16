import { Book } from "../../model/books";
import { responseHandler } from "../../response/responseHandler";

export const remainingBooks = async (req, res) => {
  try {
    const book = await Book.find({
      $and: [
        {
          bought: false,
          rented: false,
        },
      ],
    }).select("name author journal");
    if (book === 0) {
      return responseHandler(res, 400, "No Books", false);
    }
    return responseHandler(
      res,
      200,
      "Book details sent successfully",
      true,
      book
    );
  } catch (err) {
    return responseHandler(res, 500, err.message);
  }
};
