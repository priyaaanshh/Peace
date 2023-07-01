import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
    {
        sender: String,
        message: String,
    },
    { timestamps: true }
);

const ChatSchema = new mongoose.Schema({
    chatId: {
        type: String,
        required:true,
    },
    members: [
        {
            type: String,
            required: true,
        },
    ],
    messages: [MessageSchema],
    isGroupChat: {
        type: Boolean,
        default: false,
        required: true,
    },
});

export default mongoose.model("Chat", ChatSchema, "ChatCollection");
