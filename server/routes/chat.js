import Express from "express";
import { addMemberToGroup, createNewChat, getAllMessages, removeMemberFromGroup, updateMessages } from "../controllers/chat.js";
const router = Express.Router();


router.get('/getAllMessages', getAllMessages);
router.post('/createNewChat', createNewChat);
router.put('/updateMessages', updateMessages);
router.put('/addMemberToGroup', addMemberToGroup);
router.put('/removeMemberFromGroup', removeMemberFromGroup);

export default router;