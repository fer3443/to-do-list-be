import express from "express";
import { AddTask, DeleteTask, GetTasks, TemporalDeleteTask, UpdateTask } from "../controllers/task.controller";

const router = express.Router()

router.get('/task', GetTasks)//lee todas las tareas
router.post('/task', AddTask);//crea una nueva tarea
router.put('/task/:id', UpdateTask); //modifica una tarea
router.put('/task/temp-del/:id', TemporalDeleteTask); //borra una tarea de forma temporal
router.delete('/task/:id', DeleteTask); //borra una tarea de forma permanente

export default router;