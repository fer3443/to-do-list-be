import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.set("PORT", process.env.PORT || 5000);

//middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

//conexion con DB
import './database/database';

app.listen(app.get("PORT"), () => {
  console.log(`Servidor ejecutandose en ${app.get("PORT")}`);
});
