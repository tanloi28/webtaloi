import { Router } from "express";
import { login, register } from "../controllers/auth.js";
import { validBodyRequest } from "../middlewares/valiBodyReques.js";
import { loginValid, registerValue } from "../validations/user.js";

const authRouter = Router()
authRouter.post('/register',validBodyRequest(registerValue) , register)
authRouter.post('/login',validBodyRequest(loginValid), login)

export default authRouter