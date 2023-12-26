import express from "express";
import { AddTask, DeleteTask, GetTasks, TemporalDeleteTask, UpdateTask } from "../controllers/task.controller";

const router = express.Router()

router.get('/api/task', GetTasks)//lee todas las tareas
router.post('/api/task', AddTask);//crea una nueva tarea
router.put('/api/task/:id', UpdateTask); //modifica una tarea
router.put('/api/task/temp-del/:id', TemporalDeleteTask); //borra una tarea de forma temporal
router.delete('/api/task/:id', DeleteTask); //borra una tarea de forma permanente

export default router;