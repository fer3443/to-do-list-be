import { Compare, Encrypt } from "../helpers/password.helper";
import UserScheme from "../models/user";

const res_error = {
  msg_error: "Error al iniciar sesion, usuario o contraseña invalida",
};
async function CreateUser(req, res) {
  try {
    const { name, userName, password, avatar } = req.body;
    const passHash = await Encrypt(password);
    const newUser = await UserScheme.create({
      name,
      userName,
      passHash,
      avatar,
    });
    return res.status(201).json({
      ok: true,
      addedUser: newUser,
      msg: "usuario creado con exito",
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      msg_error: "error al crear usuario " + error,
    });
  }
}

async function LoginUser(req, res) {
  try {
    const { userName, password } = req.body;
    const userLogged = await UserScheme.findOne({ userName }).populate("tasks");
    if (!userLogged) return res.status(500).json(res_error);
    const rightPass = await Compare(password, userLogged.passHash);
    if (!rightPass) return res.status(500).json(res_error);
    const token = userLogged.generateAccesToken();
    return res.status(200).json({
      ok: true,
      user: userLogged,
      token: token,
      msg: "inicio de sesion exitoso!",
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      msg_error: "error en el servidor",
    });
  }
}
export { CreateUser, LoginUser };
