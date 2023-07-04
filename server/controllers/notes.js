import Notes from "../models/notes.js";

export const getNote = async (req, res, next) => {
    const { date, user } = req.query;
    // console.log(req.params, req.query, req.body,"get");
    try {
        const note = await Notes.findOne({
            user: user,
            date: date,
        });
        res.status(200).json(note);
    } catch (error) {
        next(error);
    }
}
export const updateNote = async (req, res, next) => {
    const { id, note } = req.body;
    // console.log(req.params, req.query, req.body,"update");
    try {
        const updatedNote = await Notes.findByIdAndUpdate(id, { note: note }, { new: true });
        res.status(200).json(updatedNote);
    } catch (error) {
        next(error);
    }
}
export const createNote = async (req, res, next) => {
    const { date, user, note } = req.body;
    // console.log(req.params, req.query, req.body,"create");
    try {
        const newNote = new Notes({
            user: user,
            date: date,
            note: note,
        });
        const savedNote = await newNote.save();
        res.status(200).json(savedNote);
    } catch (error) {
        next(error);
    }
}
export const deleteNote = async (req, res, next) => {
    // console.log(req.params, req.query, req.body,"delete");
    const { id } = req.params;
    try {
        await Notes.findByIdAndDelete(id);
        res.status(200).json({ message: "Note deleted" });
    } catch (error) {
        next(error);
    }
}