import Express from "express";
import { addQuestion, deleteQuestion, getAllQuestions } from "../controllers/questions.js";
const router = Express.Router();


router.get('/getAllQuestions', getAllQuestions);
router.post('/addQuestion', addQuestion);
router.delete('/deleteQuestion', deleteQuestion);

export default router;