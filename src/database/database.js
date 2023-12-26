import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()

const mongoUri = process.env.MONGO_URI
mongoose.set('strictQuery', true)
mongoose
  .connect(mongoUri)
  .then((res) => {
    console.log("se conecto correctamente a la base de datos");
  })
  .catch((err) => console.log("error al conectar con la base de datos" +err));