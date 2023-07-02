import Chat from "../models/chat.js";

export const createNewChat = async (req, res, next) => {
    const { chatId, members, isGroupChat } = req.body;
    try {
        const newChat = new Chat({
            chatId,
            members,
            isGroupChat,
            messages: []
        });
        const savedChat = await newChat.save();
        return res.status(201).json({ chat: savedChat });
    } catch (error) {
        next(error);
    }
}

export const getAllMessages = async (req, res, next) => {
    const { chatId } = req.query;
    // console.log(`chatId searched: ${chatId}`);
    // console.log(req.query);
    try {
        const chat = await Chat.findOne({ chatId: chatId });

        if (!chat) {
            return res.status(404).json({ message: "Chat not found" });
        }

        // Retrieve all messages from the chat
        const messages = chat.messages;

        return res.status(200).json({ messages });
    } catch (error) {
        next(error);
    }
}
export const updateMessages = async (req, res, next) => {

    console.log("chatId = ",req.query.chatId);
    try {
        const chat = await Chat.findOne({ chatId: req.query.chatId });

        if (!chat) {
            return res.status(404).json({ message: "Chat not found while updation" });
        }

        await Chat.findByIdAndUpdate(chat._id.toString(),req.body);
        console.log("id: ", chat._id.toString());
        console.log(req.body);

        return res.status(200).json({ message: "Message added successfully" });
    } catch (error) {
        next(error);
    }
}

export const addMemberToGroup = async (req, res, next) => {
    try {
        const { id, user } = req.body;

        const chat = await Chat.findById(id);
        if (!chat) {
            return res.status(404).json({ message: "Chat not found" });
        }
        chat.members.push(user);
        await chat.save();
        return res.status(200).json({ message: "User added to the group successfully" });

    } catch (error) {
        next(error);
    }
}

export const removeMemberFromGroup = async (req, res, next) => {
    try {
        const { id, user } = req.body;

        const chat = await Chat.findById(id);
        if (!chat) {
            return res.status(404).json({ message: "Chat not found" });
        }

        const userIndex = chat.members.indexOf(user);

        if (userIndex !== -1) {
            chat.members.splice(userIndex, 1);
        }

        await chat.save();
        return res.status(200).json({ message: "User removed from the group successfully" });

    } catch (error) {
        next(error);
    }
}