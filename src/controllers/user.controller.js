import { transporter } from "../config/mailer";
import { Compare, Encrypt } from "../helpers/password.helper";
import UserScheme from "../models/user";

const res_error = {
  msg_error: "Error al iniciar sesion, usuario o contraseña invalida",
};
async function CreateUser(req, res) {
  try {
    const { name, userName, password, avatar } = req.body;
    //verifico si ya existe el nombre de usuario
    const existingUser = await UserScheme.findOne({ userName });
    if (existingUser) {
      return res.status(400).json({
        ok: false,
        msg_error: "El nombre de usuario ya está en uso. Por favor elige otro",
      });
    }
    //verifico los requisitos minimos de 6 caracteres, incluyendo un numero y una mayuscula en el password
    const alphanumericRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (!alphanumericRegex.test(password)) {
      return res.status(400).json({
        ok: false,
        msg_error:
          "La contraseña debe contener al menos 6 caracteres, incluyendo al menos una letra mayuscula y un numero.",
      });
    }
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
      msg: "Usuario creado con exito",
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
    const { userName, password, allowLS } = req.body;
    if (userName.trim() === "" || password.trim() === "") {
      return res.status(400).json({
        ok: false,
        msg: "Todos los campos deben estar completos",
      });
    }
    const userLogged = await UserScheme.findOne({ userName }).populate("tasks");
    if (!userLogged) return res.status(500).json(res_error);
    const rightPass = await Compare(password, userLogged.passHash);
    if (!rightPass) return res.status(500).json(res_error);
    if (allowLS !== undefined) {
      userLogged.allowLS = allowLS;
      await userLogged.save();
    }

    const token = userLogged.generateAccesToken();
    return res.status(200).json({
      ok: true,
      user: userLogged,
      token: token,
      msg: "inicio de sesion exitoso PERRA!",
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      msg_error: "error en el servidor",
    });
  }
}

async function UpdateUser(req, res) {
  try {
    const {
      payload: { _id },
    } = req;
    const body = req.body;
    const user = await UserScheme.findById(_id);
    if (!user) {
      return res.status(404).json({
        ok: false,
        msg_error: "usuario no encontrado",
      });
    }
    if (Object.keys(body).length === 0) {
      return res.status(400).json({
        ok: false,
        msg_error: "todos los campos deben ser completados",
      });
    }
    const updatedUser = await UserScheme.findByIdAndUpdate(_id, body, {
      new: true,
    });

    return res.status(200).json({
      ok: true,
      user: updatedUser,
      msg: "Datos actualizados con exito",
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg_error: `error en el servidor ${err}`,
    });
  }
}

async function GetUserDataById(req, res) {
  try {
    const {
      payload: { _id },
    } = req;
    const user = await UserScheme.findById(_id);
    if (!user) {
      return res.status(404).json({
        ok: false,
        msg_error: "usuario no encontrado",
      });
    }
    return res.status(200).json({
      ok: true,
      readedUser: user,
      msg: "peticion exitosa",
    });
  } catch (error) {
    console.error(error);
    throw new Error("Error en el servidor " + error);
  }
}

async function ForgotPassword(req, res) {
  try {
    const { userName } = req.body;
    const user = await UserScheme.findOne({ userName });
    if (!user) {
      return res.status(404).json({
        ok: false,
        msg_error: "usuario invalido",
      });
    }
    const token = await user.generateResetPasswordToken();
    const {resetPasswordToken} = token
    const mailOption = {
      from: process.env.USER_MAILER,
      to: user.userName,
      subject: "Recuperación de contraseña",
      text: `Hola ${user.name},

Para recuperar tu contraseña, haz clic en el siguiente enlace:

<a href="${process.env.CLIENT_URL}/reset-password/${resetPasswordToken}">Click aquí para reestablecer su contraseña</a>

Este enlace caducará en 1 hora.

Si no has solicitado recuperar tu contraseña, ignora este mensaje.

Atentamente,

El equipo de administrador de tareas`,
    };
    transporter.sendMail(mailOption, (err, info) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: 'Error al enviar el correo electrónico' });
      }
  
      res.json({ message: 'Se ha enviado un correo electrónico con instrucciones para recuperar tu contraseña' });
    });
  } catch (error) {
    console.error(error);
    throw new Error("Error en el servidor " + error);
  }
}
export { CreateUser, LoginUser, UpdateUser, GetUserDataById, ForgotPassword };
