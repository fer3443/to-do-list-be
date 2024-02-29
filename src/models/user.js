import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";

const userScheme = new Schema({
  name: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
    unique: true //sirve para agregar un indice en el campo de usarName (evito que se creen dos usarnames iguales)
  },
  passHash: String,
  avatar: String,
  allowLS:{
    type: Boolean,
    default: false
  },
	tasks:[{
		type: Schema.Types.ObjectId,
		ref: 'task'
	}],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
  // resetPasswordToken: {
  //   token: String,
  //   default: null
  // }
});

userScheme.methods.generateAccesToken = function(){
  const token =  jwt.sign({_id: this._id}, process.env.SECRET_KEY)
  return token
}

// userScheme.methods.generateResetPasswordToken = function(){
//   const passwordToken = jwt.sign({_id: this._id}, process.env.SECRET_KEY, { expiresIn: "1h"});
//   this.resetPasswordToken = passwordToken;
//   return this.save()
// }

// userScheme.statics.findByResetPasswordToken = function(passwordToken){
//   return this.findOne({resetPasswordToken: passwordToken})
// }

userScheme.set("toJSON",{
  transform: function(doc, retorno){
    retorno.id = retorno._id,
    delete retorno._id,
    delete retorno.passHash,
    delete retorno.tasks,
    delete retorno.__v
  }
})
export default mongoose.model('user', userScheme);