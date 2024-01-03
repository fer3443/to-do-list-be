"use strict";

var _express = _interopRequireDefault(require("express"));
var _morgan = _interopRequireDefault(require("morgan"));
var _cors = _interopRequireDefault(require("cors"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _task = _interopRequireDefault(require("./routes/task.routes"));
var _user = _interopRequireDefault(require("./routes/user.routes"));
require("./database/database");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
_dotenv.default.config();
const app = (0, _express.default)();
//
app.set("PORT", process.env.PORT || 5000);

//middlewares
app.use((0, _morgan.default)("dev"));
app.use((0, _cors.default)());
app.use(_express.default.json());

//conexion con DB

//rutas
app.use('/api', _task.default);
app.use('/api', _user.default);
app.listen(app.get("PORT"), () => {
  console.log(`Servidor ejecutandose en ${app.get("PORT")}`);
});