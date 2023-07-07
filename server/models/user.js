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
    moodScores: [{
        questionNumber: {
            type:Number
        },
        moodScore: {
            type: Number
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
}, { timestamps: true });

export default mongoose.model('User', UserSchema, 'UserCollection');