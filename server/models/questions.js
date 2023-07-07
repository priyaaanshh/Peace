import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
    questionNumber: {
        type: Number,
        required: true
    },
    question: {
        type: String,
        required: true
    },
    options: [{
        moodScoreBoost: {
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