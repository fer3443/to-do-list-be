import mongoose, { Schema } from "mongoose";

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

export default mongoose.model('user', userScheme);