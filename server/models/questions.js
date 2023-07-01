import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    options: [{
        mood: {
            type: Number,
            required: true
        },
        option: {
            type: String,
            required: true
        },
    }],
}, { timestamps: true });

export default mongoose.model('Question', QuestionSchema, 'QuestionCollection');