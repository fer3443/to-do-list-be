import express from "express";
import { CreateUser, ForgotPassword, GetUserDataById, LoginUser, ResetPassword, UpdateUser } from "../controllers/user.controller";
import { Authenticate } from "../middlewares/auth";

const router = express.Router()

router.post('/user/add', CreateUser) //crea un usuario
router.post('/user/login', LoginUser)//login
router.get('/user', Authenticate, GetUserDataById)//lee usuario por Id
router.post('/user/forgot-password', ForgotPassword)//envia un mail con el token temporal
router.post('/user/reset-password/:token', ResetPassword)
router.put('/user/updateProfile', Authenticate, UpdateUser)//actualizar datos de usuario

export default router