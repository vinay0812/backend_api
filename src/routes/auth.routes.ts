import { Router } from "express";
import registerUser, { login } from "../controllers/auth.controller";
import validateRegisterUser from "../middlewares/validate.middleware";

const authRouter = Router()

authRouter.post('/register',validateRegisterUser,registerUser)
authRouter.post('/login',login)


export default authRouter;