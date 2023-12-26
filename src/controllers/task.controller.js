import TaskScheme from "../models/task";
//trae todas las tareas de la bd
async function GetTasks(req, res) {
  try {
    const task = await TaskScheme.find();
    return res.status(200).json({
      ok: true,
      data: task,
      msg: "peticion exitosa"
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      error_msg: "error en el servidor " + error,
    });
  }
}

//crea una tarea
async function AddTask(req, res){
  try {
    const newTask = await TaskScheme.create(req.body)
    return res.status(201).json({
      ok: true,
      addedTask: newTask,
      msg: 'tarea agregada con exito'
    })
  } catch (error) {
    return res.status(500).json({
      ok: false,
      error_msg: "error al intentar agregar una tarea " + error
    })
  }
}

//modifica una tarea
async function UpdateTask(req, res){
  const {id} = req.params
  try {
    const updateTask = await TaskScheme.findByIdAndUpdate(id, req.body);
    return res.status(202).json({
      ok: true,
      updatedTask: updateTask,
      msg: "tarea modificada con exito"
    })
  } catch (error) {
    return res.status(404).json({
      ok: false,
      error_msg: 'error al modificar tarea ' + error
    })
  }
}
export { GetTasks, AddTask, UpdateTask };