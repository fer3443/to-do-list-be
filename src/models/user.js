import mongoose, { Schema } from "mongoose";
import { Jwt } from "jsonwebtoken";

const userScheme = new Schema({
  name: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  passHash: String,
  avatar: String,
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
});

userScheme.methods.generateAccesToken = function(){
  const token =  Jwt.sign({_id: this._id}, process.env.SECRET_KEY)
  return token
}
export default mongoose.model('user', userScheme);