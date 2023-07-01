import React, { useEffect, useState } from 'react';
import ScrollToBottom from "react-scroll-to-bottom";
import socketIo from "socket.io-client";
import './chat.css'
import useravatar from '../../assets/default-slider-img.png';


let socket;

const ENDPOINT = "http://localhost:8080";


const Chat = () => {
    const user = JSON.parse(localStorage.getItem("user")).username;
    const [messages, setMessages] = useState([]);
    const [currentMessage, setCurrentMessage] = useState("");
    const [joinedRoom, setJoinedRoom] = useState(0);


    const joinRoom = (roomId) => {
        socket.emit('leaveRoom', joinedRoom);
        socket.emit("join_room", roomId);
        setMessages([]);
        setJoinedRoom(roomId);
    };

    console.log(messages);
    useEffect(() => {
        socket = socketIo(ENDPOINT, { transports: ['websocket'] });

        console.log(socket);

        return () => {
            socket.emit('connection disconnect');
            socket.off();
        }
    }, []);

    const sendMessage = async () => {
        if (currentMessage !== "") {
            const messageData = {
                room: joinedRoom,
                author: user,
                message: currentMessage,
                time:
                    new Date(Date.now()).getHours() +
                    ":" +
                    new Date(Date.now()).getMinutes(),
            };

            await socket.emit("send_message", messageData);
            setCurrentMessage("");
        }
    };


    useEffect(() => {
        socket.on("receive_message", (data) => {
            console.log("Updated by receive_message");
            setMessages((list) => [...list, data]);
        });
    }, []);

    return (
        <div className='chat-page-container'>
            <div className='chat-page'>
                <div className='chat-nav'>
                    <div className='user-avatar-chat'>
                        <img src={useravatar} alt='' className='user-avatar-chat' />
                    </div>
                    <p className='chat-user-name'>Peace+ Group Chat</p>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <button onClick={() => joinRoom(1)}>Room: 1</button>
                        <button onClick={() => joinRoom(2)}>Room: 2</button>
                    </div>
                </div>
                <ScrollToBottom className='chat-msg-box'>
                    {messages?.map((item, i) => {
                        return (
                            <div className={`${item.author === user ? "right-msg-tile" : "left-msg-tile"}`}>
                                <div className={`msg ${item.author === user ? "right-side-msg" : "left-side-msg"}`} ><p>{item.author}: </p><p>{item.message}</p></div>
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
                    <button onClick={()=>sendMessage()} className='send-btn'>Send</button>
                </div>
            </div>
        </div>
    )
}

export default Chat