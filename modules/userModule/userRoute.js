import {Router} from "express";
import * as userController from "./userController.js";
import {auth} from "../../middleware/auth.js";
import {validation} from "../../middleware/validation.js";
import * as userValidation from "./userValidationSchema.js"
const userRouter = Router();

userRouter.post("/signup",validation(userValidation.signUpValidatinon),userController.signUp);
userRouter.post("/login",validation(userValidation.logInValidation),userController.logIn);
userRouter.patch("/update",
                    auth(),
                    validation(userValidation.updateNameAndEmailValidation),
                    userController.updateNameAndEmail);
userRouter.delete("/delete",auth(),userController.deleteUser);
userRouter.get("/logout",auth(),userController.logOut);




export default userRouter;