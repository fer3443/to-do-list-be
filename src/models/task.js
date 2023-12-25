import mongoose, { Schema } from "mongoose";

const TaskScheme = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    completed: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

export default mongoose.model("task", TaskScheme)