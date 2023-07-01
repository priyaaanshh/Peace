import Express from "express";
import { addAppointmentWithDoctor, addEmptyAnswer, addNoteToUser, deleteUser, getCurrentMonthNewUserCount, getTotalUserCount, getUser, getUsers, updateAnswer, updateUser } from "../controllers/user.js";
import { verifyAdmin, verifyUser } from "../utils/verification.js";
const router = Express.Router();

// READ One by Id
router.get('/userInfo/:access_token/:id', verifyUser, getUser);

// UPDATE
router.patch('/:access_token/:id', verifyUser, updateUser); //Only user can update it's account

// DELETE
router.delete('/:access_token/:id', verifyUser, deleteUser); //Only user can delete it's account

router.post('/addEmptyAnswer', addEmptyAnswer);
router.patch('/updateAnswer', updateAnswer);
router.post('/addNoteToUser', addNoteToUser);
router.post('/addAppointmentWithDoctor', addAppointmentWithDoctor);

//Only admin can access
router.get('/:access_token', verifyAdmin, getUsers); 
router.get('/totalusers/:access_token', verifyAdmin, getTotalUserCount);
router.get('/newusers/:access_token', verifyAdmin, getCurrentMonthNewUserCount);

export default router;