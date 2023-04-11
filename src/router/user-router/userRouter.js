import { Router } from "express";
export const userRouter = Router();
import { userSignUp } from "../../controller/user/user-signUp";
import { verifyToken } from "../../middleware/verify-token";
import { userVerify } from "../../controller/user/user-verify";
import { userLogin } from "../../controller/user/user-login";
import { userUpdate } from "../../controller/user/user-update";
import { deleteUser } from "../../controller/user/user-delete";
import { userSignOut } from "../../controller/user/user-signout";
import { buyBooks } from "../../controller/user/user-buybooks";
import { searchUser } from "../../controller/user/user-search";
import { remainingBooks } from "../../controller/user/user-remainingbooks";
import { getAllUser } from "../../controller/user/user-get";
import { resetPassword } from "../../controller/user/user-resetpassword";


userRouter.post("/signup", userSignUp);
userRouter.patch("/verify", verifyToken, userVerify);
userRouter.post("/login", userLogin);
userRouter.patch("/update/:id", userUpdate);
userRouter.patch("/signout/:id", userSignOut);
userRouter.patch("/buybooks", buyBooks);
userRouter.delete("/delete/:id", deleteUser);
userRouter.get("/search", searchUser);
userRouter.get("/remainingbooks", remainingBooks);
userRouter.get("/alluser", getAllUser);
userRouter.patch("/resetpassword/:id", resetPassword);
