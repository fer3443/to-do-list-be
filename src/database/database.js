import mongoose, { mongo } from "mongoose";

mongoose
  .connect(
    "mongodb+srv://fer3443:1RqnRlHHNUJfg5Fy@cluster0.9z6qiw6.mongodb.net/"
  )
  .then((res) => {
    console.log("se conecto correctamente a la base de datos");
  })
  .catch((err) => console.log("error al conectar con la base de datos" +err));
mongoose.set('strictQuery', true)