import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema({
    note: {
        type: String,
    },
    user: {
        type:String,
    },
    date: {
        type:String,
    }
});

export default mongoose.model("Note", NoteSchema, "NoteCollection");
