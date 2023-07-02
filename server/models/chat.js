import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema({
    chatId: {
        type: String,
        required: true,
        unique:true,
    },
    members: [
        {
            type: String,
            required: true,
        },
    ],
    messages: [
        {
            sender: String,
            message: String,
        },
        { timestamps: true }],
    isGroupChat: {
        type: Boolean,
        default: false,
        required: true,
    },
});

export default mongoose.model("Chat", ChatSchema, "ChatCollection");
