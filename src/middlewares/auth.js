import jwt from "jsonwebtoken";

const DATA_ERROR = {
  ok: false,
  error_msg: "usuario no autorizado"
};
export function Authenticate(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token)
    return res.status(404).json(DATA_ERROR);
  jwt.verify(token, process.env.SECRET_KEY, (error, payload) => {
    if (error) return res.status(404).json(DATA_ERROR);
    req.payload = payload;
    next();
  });
}
