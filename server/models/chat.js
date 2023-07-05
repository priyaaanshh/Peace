import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema(
    {
        groupName:String,
        members: [
            {
                type: String,
                required: true,
            },
        ],
        messages: [
            {
                author: String,
                message: String,
                time: String,
            },
        ],
        isGroupChat: {
            type: Boolean,
            default: false,
            required: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Chat", ChatSchema, "ChatCollection");
