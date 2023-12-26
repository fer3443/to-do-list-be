import express from "express";
import { AddTask, GetTasks, UpdateTask } from "../controllers/task.controller";

const router = express.Router()

router.get('/api/task', GetTasks)//lee todas las tareas
router.post('/api/task', AddTask);//crea una nueva tarea
router.put('/api/task/:id', UpdateTask); //modifica una tarea

export default router;