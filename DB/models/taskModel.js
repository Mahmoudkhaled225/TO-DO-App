import mongoose from "mongoose"

const taskSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    addBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    status: {
        type: String,
        default: "pending",
        enum: ["done", "pending"],
    }
}, {
    timestamps: true
})

export const taskModel = mongoose.model("Task",taskSchema)

