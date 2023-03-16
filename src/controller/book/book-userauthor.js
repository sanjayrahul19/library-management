import { User } from "../../model/user";
import { responseHandler } from "../../response/responseHandler";

export const bookByUserAuthor = async (req, res) => {
  try {
    const name = req.query.name;
    const user = await User.find()
      .select("name email")
      .populate("books", { name: 1, author: 1, journal: 1 });
    // console.log(user);
    const book = [];
    if (user.length > 0) {
      for (let i = 0; i < user.length; i++) {
        const books = user[i].books;
        console.log(books[0]);
        console.log(books.length);
        if (books.length !== 0) {
          let num = 0;
          for (let j = 0; j < books.length; j++) {
            if (books[j].author === name) {
              num += 1;
            } else {
              return responseHandler(res, 400, "No  Books found", true);
            }
            if (books.length - 1 === j && num > 0) {
              book.push(user[i]);
            }
          }
        }
      }
    } else {
      return responseHandler(res, 200, "No  user found", true);
    }
    return responseHandler(res, 200, "Books sent successfully", true, book);
  } catch (err) {
    return responseHandler(res, 500, err.message, false);
  }
};
