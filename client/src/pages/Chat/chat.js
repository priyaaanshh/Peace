import React, { useEffect, useState } from 'react';
import ScrollToBottom from "react-scroll-to-bottom";
import socketIo from "socket.io-client";
import './chat.css'
import { baseURL } from '../../baseURL/baseURL';
import axios from 'axios';
import NavButtons from '../../components/NavButtons/navButtons';
import Back from '../../assets/svg/back';
import SearchBar from '../../components/SearchBar/searchBar';



let socket;

const ENDPOINT = "http://localhost:8080";

const Chat = () => {

    const me = JSON.parse(localStorage.getItem("user"));
    const [allUsers, setallUsers] = useState([]);
    const [chats, setChats] = useState([]);
    // const [groupChats, setGroupChats] = useState([]);

    const [addFriendPage, setAddFriendPage] = useState(false);
    const [openChat, setOpenChat] = useState(true);
    const [openedChat, setOpenedChat] = useState({
        username: "",
        profilePicture: "",
        joinedRoom: ""
    });


    // const user = JSON.parse(localStorage.getItem("user"))?.username;
    const [messages, setMessages] = useState([]);
    const [currentMessage, setCurrentMessage] = useState("");
    const [joinedRoom, setJoinedRoom] = useState(0);


    useEffect(() => {
        socket = socketIo(ENDPOINT, { transports: ['websocket'] });
        console.log("New Connection made");
        return () => {
            socket.emit('connection disconnect');
            socket.off();
        }
    }, []);

    const joinRoom = async (chatId) => {
        socket.emit('leaveRoom', joinedRoom);
        socket.emit("join_room", chatId);
        setJoinedRoom(chatId);
        console.log(`joinedRoom set with chatId: ${chatId}`);
    };

    useEffect(() => {
        console.log(`JoinedRoom has changed it's value. joinedRoom: ${joinedRoom}`);
    }, [joinedRoom]);

    // console.log(messages);

    const sendMessage = async () => {
        if (currentMessage !== "") {
            const currentDate = new Date();
            let hours = currentDate.getHours();
            let minutes = currentDate.getMinutes();
            const ampm = hours >= 12 ? 'PM' : 'AM';

            hours = hours % 12 || 12;

            minutes = minutes < 10 ? '0' + minutes : minutes;

            const newData = {
                room: joinedRoom,
                author: me?.username,
                message: currentMessage,
                time: `${hours}:${minutes} ${ampm}`
            };

            await socket.emit("send_message", newData);

            setMessages((list) => [...list, newData]);

        }
    };

    useEffect(() => {
        console.log("messages updated");
        try {
            if (joinedRoom !== 0 && joinedRoom !== "") {
                if (currentMessage) {

                    const currentDate = new Date();
                    let hours = currentDate.getHours();
                    let minutes = currentDate.getMinutes();
                    const ampm = hours >= 12 ? 'PM' : 'AM';

                    hours = hours % 12 || 12;

                    minutes = minutes < 10 ? '0' + minutes : minutes;

                    const newData = {
                        room: joinedRoom,
                        author: me?.username,
                        message: currentMessage,
                        time: `${hours}:${minutes} ${ampm}`
                    };
                    console.log(messages);
                    axios.put(`${baseURL}/chat/updateMessages`, { id: joinedRoom, message: newData });
                    setCurrentMessage("");
                }
            }
        } catch (error) {
            console.log(error)
        }
    }, [joinedRoom, messages]);


    useEffect(() => {
        socket.on("receive_message", async (data) => {
            console.log("Updated by receive_message");
            console.log(data);
            // setMessages((list) => [...list, data]);
        });
    }, []);

    const fecthData = async () => {
        try {
            const allUsersData = await axios.get(`${baseURL}/user/getUsers`);
            setallUsers(allUsersData.data);
            // console.log(allUsersData)


            const allChatsData = await axios.get(`${baseURL}/chat/getAllChats`, {
                params: {
                    member: me?._id,
                    isGroupChat: false,
                }
            });
            console.log(allChatsData.data)
            setChats(allChatsData.data);
            // setGroupChats(allChatsData.data);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fecthData();

        setInterval(() => {
            fecthData();
        }, 10000);
    }, [currentMessage]);

    const handleOpenMessage = async (user, chat) => {
        setMessages([]);
        fecthData();
        let myId = me?._id;
        let otherId = user._id;

        const data = {
            members: [myId, otherId],
            isGroupChat: false,
        }
        if (addFriendPage) {
            try {
                const response = await axios.post(`${baseURL}/chat/createNewChat`, data);
                // console.log(response.data);
                setOpenedChat({
                    username: user.username,
                    profilePicture: user.profilePicture,
                    joinedRoom: response.data?._id
                });
                joinRoom(response.data?._id);
                setMessages(response.data?.messages);
            } catch (error) {
                console.log(error);
            }
        } else {
            setOpenedChat({
                username: user.username,
                profilePicture: user.profilePicture,
                joinedRoom: chat?._id
            });
            setMessages(chat?.messages);
        }

        // console.log(openedChat);
        setAddFriendPage(false);
    }

    useEffect(() => {
        console.log(openedChat);
        joinRoom(openedChat.joinedRoom);
    }, [openedChat]);


    return (
        <div className='home-page'>
            <div className='navbar'>
                <div className='nav-text'>
                    <p className='home-main-heading' style={{ fontWeight: "600" }}>Social Forum </p>
                </div>
                <NavButtons />
            </div>





            <div className='social-forum-page-row'>
                <div className='chat-users-container'>
                    <div className='chat-users-container-nav'>
                        {addFriendPage === false ? <button className='chat-users-add-friend-btn' onClick={() => { setAddFriendPage(true) }}>Add friends</button> :
                            <button className='back-btn'
                                style={{ backgroundColor: "#C0B1D2" }}
                                onClick={() => { setAddFriendPage(false) }}><Back color="black" /></button>}
                        <SearchBar />
                    </div>
                    {addFriendPage === false ? <div className='chat-users-container-btn-row'>
                        <button className='chat-users-btn' onClick={() => setOpenChat(true)}>Friends</button>
                        <button className='chat-users-btn' onClick={() => setOpenChat(false)}>Group</button>
                    </div>

                        : <div className='chat-users-container-btn-row'>
                            <button className='chat-users-btn'>Add Friends</button>
                        </div>}
                    <div className='chat-users-seperator-line'></div>

                    <div className='chat-users-msg-column-container'>


                        {
                            addFriendPage &&
                            allUsers.map((user, index) => {
                                return (
                                    <MessageTile
                                        handleOpenMessage={handleOpenMessage}
                                        user={user}
                                        key={index}
                                    />
                                );
                            })
                        }

                        {
                            openChat &&
                            !addFriendPage &&
                            chats.map((chat, index) => {
                                return (
                                    <MessageTile
                                        handleOpenMessage={handleOpenMessage}
                                        user={chat.user}
                                        chat={chat.chat}
                                        key={index}
                                    />
                                );
                            })
                        }

                        {
                            !openChat &&
                            !addFriendPage &&
                            <MessageTile
                                user={{
                                    username: "New Group",
                                    profilePicture: "https://cdn.pixabay.com/photo/2016/11/14/17/39/group-1824145_960_720.png"
                                }} />}

                    </div>
                </div>





                <div className='chat-users-container msg-box-container'>
                    <div className='chat-users-container-nav msg-box-nav'>
                        <div className='chat-users-display-image'>
                            {openedChat?.profilePicture ? <img src={openedChat?.profilePicture} alt='' className='chat-users-display-image' /> : <></>}
                        </div>
                        <div className='chat-users-msg-column'>
                            <div className='chat-users-username'>{openedChat?.username}</div>
                            {openedChat?.username ? <div className='chat-users-msg'>Online</div> : <></>}
                        </div>
                    </div>
                    <ScrollToBottom className='chat-msg-box'>
                        {messages?.map((item, i) => {
                            return (
                                <div className={`${item?.author === me?.username ? "right-msg-tile" : "left-msg-tile"}`} key={i}>
                                    <div className={`msg ${item?.author === me?.username ? "right-side-msg" : "left-side-msg"}`} ><p>{item?.message}</p></div>
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
        </div>
    )
}

export default Chat


const MessageTile = ({ handleOpenMessage, user, chat }) => {
    return (
        <div
            className="chat-users-msg-tile"
            onClick={() => {
                handleOpenMessage(user, chat);
            }}
        >
            <div className="chat-users-msg-left-row">
                <div className="chat-users-display-image">
                    {user?.profilePicture ? (
                        <img
                            src={user?.profilePicture}
                            alt=""
                            className="chat-users-display-image"
                        />
                    ) : (
                        <></>
                    )}
                </div>
                <div className="chat-users-msg-column">
                    {user?.username ? (
                        <div className="chat-users-username">{user?.username}</div>
                    ) : (
                        <></>
                    )}
                    {chat?.messages.length ? (
                        <div className="chat-users-msg">{chat?.messages[chat?.messages.length - 1].message}</div>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
            {chat?.messages.length ? (
                <div className="chat-users-msg-time">{chat?.messages[chat?.messages.length - 1].time}</div>
            ) : (
                <></>
            )}
        </div>
    );
};
