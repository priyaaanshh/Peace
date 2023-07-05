import Chat from "../models/chat.js";
import User from "../models/user.js";

export const createNewChat = async (req, res, next) => {
    // console.log(req.params, req.query, req.body, "createNewChat");

    const { members, isGroupChat, groupName } = req.body;
    try {
        if (!isGroupChat) {
            const foundChat = await Chat.findOne({ members: { $all: members } });
            if (foundChat) {
                if (!(members[0] === members[1] && foundChat.members[0] !== foundChat.members[1])) {
                    return res.status(200).json(foundChat);
                }

            }
        }
        const newChat = new Chat({
            groupName,
            members,
            isGroupChat,
            messages: []
        });
        const savedChat = await newChat.save();
        return res.status(201).json(savedChat);
    } catch (error) {
        next(error);
    }
}

export const getAllMessages = async (req, res, next) => {
    const { id } = req.query;
    try {
        const chat = await Chat.findOne(id);

        if (!chat) {
            return res.status(404).json({ message: "Chat not found" });
        }

        return res.status(200).json(chat);
    } catch (error) {
        next(error);
    }
}

export const getAllChats = async (req, res, next) => {
    try {
        const { member, isGroupChat } = req.query;
        // console.log(req.query);

        if (isGroupChat === "false") {
            const chats = await Chat.find({
                members: member,
                isGroupChat: false,
            }).sort({ updatedAt: -1 });

            const friendUsers = [];
            for (let i = 0; i < chats.length; i++) {
                const chat = chats[i];
                const id = chat?.members[0] === member ? chat?.members[1] : chat?.members[0];
                const user = await User.findById(id);
                friendUsers.push({ chat: chat, user: user });
            }

            return res.status(200).json(friendUsers);
            console.log(friendUsers);
        } else {
            const groupChats = await Chat.find({
                members: member,
                isGroupChat: true,
            }).sort({ updatedAt: -1 });
            return res.status(200).json(groupChats);
        }
    } catch (error) {
        next(error);
    }
};

export const updateMessages = async (req, res, next) => {
    const { id, message } = req.body;
    console.log(message)
    // console.log(req.body);
    try {
        const chat = await Chat.findById(id);

        if (!chat) {
            return res.status(404).json({ message: "Chat not found while updation" });
        }
        // const chat = await Chat.findByIdAndUpdate(id, messages, { new: true });

        chat.messages.push(message);
        await chat.save();

        // console.log(chat);

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