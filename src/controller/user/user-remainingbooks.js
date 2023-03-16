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

    return responseHandler(res, 200, "Book details sent successfully", book);
  } catch (err) {
    return responseHandler(res, 500, err.message);
  }
};
