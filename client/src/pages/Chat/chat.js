import React, { useEffect, useState } from 'react';
import ScrollToBottom from "react-scroll-to-bottom";
import socketIo from "socket.io-client";
import './chat.css'
import useravatar from '../../assets/default-slider-img.png';
import { baseURL } from '../../baseURL/baseURL';
import axios from 'axios';
import useFetch from '../../hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import NavButtons from '../../components/NavButtons/navButtons';
import SearchBar from '../../components/SearchBar/searchBar';



let socket;

const ENDPOINT = "http://localhost:8080";


const Chat = () => {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({});

    const { data } = useFetch(`${baseURL}/user/userInfo/${localStorage.getItem("access_token")}/${JSON.parse(localStorage.getItem("user"))?._id}`);
    useEffect(() => {
        setUserInfo(data);
    }, [data]);


    const user = JSON.parse(localStorage.getItem("user")).username;
    const [messages, setMessages] = useState([]);
    const [currentMessage, setCurrentMessage] = useState("");
    const [joinedRoom, setJoinedRoom] = useState(0);


    const joinRoom = async (chatId) => {
        socket.emit('leaveRoom', joinedRoom);
        socket.emit("join_room", chatId);
        setJoinedRoom(chatId);
        console.log(`joinedRoom set with chatId: ${chatId}`);
        try {
            console.log(`Searching chat with chatId ${chatId}`);
            const messageData = await axios.get(`${baseURL}/chat/getAllMessages?chatId=${chatId}`);
            console.log("Got the chat");
            setMessages([messageData.data.messages]);
        } catch (error) {
            console.log("Failed to get the chat...");
            if (error.response.data.message === "Chat not found") {
                setMessages([]);
                const newChatData = {
                    chatId: chatId,
                    members: ["Aman", "Shruti"],
                    isGroupChat: false
                }
                try {
                    console.log(`creating a new chat with chatId : ${chatId}`);
                    const newChat = await axios.post(`${baseURL}/chat/createNewChat`, newChatData);
                    console.log(newChat);
                } catch (error) {
                    console.log("Can't create new chat")
                    console.log(error.response.data);
                }
            }
            console.log(error);
            console.log("first")
        }

    };
    useEffect(() => {
        console.log(`JoinedRoom has changed it's value. joinedRoom: ${joinedRoom}`);
    }, [joinedRoom]);

    // console.log(messages);
    useEffect(() => {
        socket = socketIo(ENDPOINT, { transports: ['websocket'] });

        return () => {
            socket.emit('connection disconnect');
            socket.off();
        }
    }, []);

    const sendMessage = async () => {
        if (currentMessage !== "") {
            const newData = {
                room: joinedRoom,
                author: user,
                message: currentMessage,
                time:
                    new Date(Date.now()).getHours() +
                    ":" +
                    new Date(Date.now()).getMinutes(),
            };

            await socket.emit("send_message", newData);
            setCurrentMessage("");
        }
    };


    useEffect(() => {
        socket.on("receive_message", async (data) => {
            console.log("Updated by receive_message");
            setMessages((list) => [...list, data]);
        });
    }, []);

    useEffect(() => {
        try {
            console.log("chatId = ", joinedRoom);
            console.log(messages);
            if (joinedRoom !== 0) {
                axios.put(`${baseURL}/chat/updateMessages?chatId=${joinedRoom}`, { messages: messages });
            }
        } catch (error) {
            console.log(error)
        }
    }, [messages]);


    return (
        <div className='home-page'>
            <div className='navbar'>
                <div className='nav-text'>
                    <p className='home-main-heading' style={{ fontWeight: "600" }}>Social Forum </p>
                </div>
                <NavButtons />
            </div>
            <div className='chat-page'>
                <div className='chat-nav'>
                    <div className='user-avatar-chat'>
                        <img src={useravatar} alt='' className='user-avatar-chat' />
                    </div>
                    <p className='chat-user-name'>Peace+ Group Chat</p>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <button onClick={(e) => { e.preventDefault(); joinRoom("room1"); }}>Room: 1</button>
                        <button onClick={(e) => { e.preventDefault(); joinRoom("room2"); }}>Room: 2</button>
                        <SearchBar />

                    </div>
                </div>
                <ScrollToBottom className='chat-msg-box'>
                    {messages?.map((item, i) => {
                        return (
                            <div className={`${item?.author === user ? "right-msg-tile" : "left-msg-tile"}`} key={i}>
                                <div className={`msg ${item?.author === user ? "right-side-msg" : "left-side-msg"}`} ><p>{item?.author}: </p><p>{item?.message}</p></div>
                            </div>
                        )
                    })}
                </ScrollToBottom>
                <div className='chat-bottom'>
                    <input type="text" id="chatInput"
                        value={currentMessage}
                        onChange={(event) => {
                            setCurrentMessage(event.target.value);
                        }}
                        onKeyPress={(event) => {
                            event.key === "Enter" && sendMessage();
                        }}
                        className='chat-input' placeholder='Send message...' />
                    <button onClick={() => sendMessage()} className='send-btn'>Send</button>
                </div>
            </div>
        </div>
    )
}

export default Chat