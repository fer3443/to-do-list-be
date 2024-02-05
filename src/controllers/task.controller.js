import TaskScheme from "../models/task";
import UserScheme from "../models/user";
//trae todas las tareas de la bd
async function GetTasks(req, res) {
  try {
    const {
      payload: { _id },
    } = req;
    const task = await TaskScheme.find({ user_id: _id }).populate(
      "user_id",
      "userName"
    );

    return res.status(200).json({
      ok: true,
      data: task,
      msg: "peticion exitosa",
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      error_msg: "error en el servidor " + error,
    });
  }
}

//crea una tarea
async function AddTask(req, res) {
  try {
    const {
      payload: { _id },
    } = req; //viene desde la funcion authenticate
    const newTask = await TaskScheme.create({ ...req.body, user_id: _id });
    const user = await UserScheme.findById(_id);
    user.tasks.push({ _id: newTask._id });
    user.save();
    return res.status(201).json({
      ok: true,
      addedTask: newTask,
      msg: "tarea agregada con exito",
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      error_msg: "error al intentar agregar una tarea " + error,
    });
  }
}

//modifica una tarea
async function UpdateTask(req, res) {
  const { id } = req.body;
  try {
    const updateTask = await TaskScheme.findByIdAndUpdate(id, req.body);
    return res.status(202).json({
      ok: true,
      updatedTask: updateTask,
      msg: "tarea modificada con exito",
    });
  } catch (error) {
    return res.status(404).json({
      ok: false,
      error_msg: "error al modificar tarea " + error,
    });
  }
}

//funcion para borrar tareas permanentemente
async function DeleteTask(req, res) {
  const { id } = req.body;
  try {
    const deleteTask = await TaskScheme.findByIdAndDelete(id);
    return res.status(201).json({
      ok: true,
      deletedTask: deleteTask,
      msg: "tarea borrada con exito",
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg_error: "error al borrar la tarea " + error,
    });
  }
}

//"borra" una tarea de manera temporal
async function TemporalDeleteTask(req, res) {
  const { id } = req.params;
  try {
    const tempDeleteTask = await TaskScheme.findByIdAndUpdate(id, {
      virtual_delete: true,
    });
    return res.status(200).json({
      ok: true,
      tempDeletedTask: tempDeleteTask,
      msg: "tarea eliminada con éxito",
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg_error: "error al eliminar la tarea " + error,
    });
  }
}
export { GetTasks, AddTask, UpdateTask, DeleteTask, TemporalDeleteTask };
