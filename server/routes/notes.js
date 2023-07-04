import Express from "express";
import { createNote, deleteNote, getNote, updateNote } from "../controllers/notes.js";
const router = Express.Router();


router.get('/getNote', getNote);
router.put('/updateNote', updateNote);
router.post('/createNote', createNote);
router.delete('/deleteNote/:id', deleteNote);

export default router;