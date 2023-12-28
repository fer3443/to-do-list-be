import express from "express";
import { CreateUser, LoginUser } from "../controllers/user.controller";

const router = express.Router()

router.post('/user/add', CreateUser) //crea un usuario
router.post('/user/login', LoginUser)//login

export default router