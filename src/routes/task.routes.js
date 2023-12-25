import express from "express";
import { GetTasks } from "../controllers/task.controller";

const router = express.Router()

router.get('/api/task', GetTasks)

export default router;