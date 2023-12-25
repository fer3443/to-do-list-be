import TaskScheme from "../models/task";

async function GetTasks(req, res) {
  try {
    const task = await TaskScheme.find();
    return res.status(200).json({
      ok: true,
      data: task,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      error_msg: "error en el servidor " + error,
    });
  }
}
export { GetTasks };