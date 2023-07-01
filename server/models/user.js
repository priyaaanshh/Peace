import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
    },
    name: {
        type: String,
    },
    phone: {
        type: Number,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    answer: [[{
        type: Number
    }]],
    notes: [{
        note: {
            type: String
        },
        date: {
            type: String
        }
    }],
    appointments: [{
        doctor: {
            type: String
        },
        date: {
            type: String
        }
    }],
    chats: [{
        chatId: {
            type: String,
            required:true,
        },
        userIdLinkedWithChat: {
            type: String,
        },
    }],
}, { timestamps: true });

export default mongoose.model('User', UserSchema, 'UserCollection');