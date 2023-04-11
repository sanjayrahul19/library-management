import mongoose from "mongoose";
import { Book } from "../../model/books";
import { User } from "../../model/user";
import { responseHandler } from "../../response/responseHandler";

export const bookDelete = async (req, res) => {
  try {
    const bookId = req.query.bookId;
    const userId = req.query.userId;

    console.log(bookId);

    // const book = await Book.findByIdAndDelete({ _id: bookId });

    const user = await User.updateMany(
      {},
      { $pull: { books: bookId } },
      { new: true }
    );
    console.log(user);
    return responseHandler(res, 200, "book deleted successfully", true);
  } catch (err) {
    return responseHandler(res, 500, err.message, false);
  }
};
