import express from "express";
import { AddTask, DeleteTask, GetTaskById, GetTasks, TemporalDeleteTask, UpdateTask } from "../controllers/task.controller";
import { Authenticate } from "../middlewares/auth";

const router = express.Router()

router.get('/task', Authenticate ,GetTasks)//lee todas las tareas
router.get('/task/:id', Authenticate, GetTaskById)//lee una tarea por ID
router.post('/task', Authenticate ,AddTask);//crea una nueva tarea
router.put('/task/:id', Authenticate,UpdateTask); //modifica una tarea
router.put('/task/temp-del/:id', Authenticate,TemporalDeleteTask); //borra una tarea de forma temporal
router.delete('/task/:id', Authenticate ,DeleteTask); //borra una tarea de forma permanente

export default router;