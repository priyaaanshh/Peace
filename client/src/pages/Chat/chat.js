import React, { useEffect, useState } from 'react';
import ScrollToBottom from "react-scroll-to-bottom";
import socketIo from "socket.io-client";
import './chat.css'
import '../Home/home.css'
import Sidebar from '../../components/SideBar/sidebar';
import { baseURL } from '../../baseURL/baseURL';
import axios from 'axios';
import Back from '../../assets/svg/back';
import SearchBar from '../../components/SearchBar/searchBar';
import { ReactComponent as SendBtn } from '../../assets/svg/Vector.svg'
import Navbar from '../../components/Navbar/navbar';



let socket;

const ENDPOINT = "http://localhost:8080";
const me = JSON.parse(localStorage.getItem("user"));

const Chat = () => {

    const [allUsers, setallUsers] = useState([]);
    const [chats, setChats] = useState([]);
    const [groupChats, setGroupChats] = useState([]);

    const groupChatLogo = "https://t3.ftcdn.net/jpg/05/30/75/24/360_F_530752499_43sQKflFSktAmJWM8ZBsINR5ic7CKIbo.jpg";

    const [addFriendPage, setAddFriendPage] = useState(false);
    const [openChat, setOpenChat] = useState(true);
    const [openCreateGroup, setOpenCreateGroup] = useState(false);
    const [selectedMembers, setSelectedMembers] = useState([me?._id]);
    const [newGroupName, setNewGroupName] = useState("");

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
        // console.log("New Connection made");
        return () => {
            socket.emit('connection disconnect');
            socket.off();
        }
    }, []);

    const joinRoom = async (chatId) => {
        socket.emit('leaveRoom', joinedRoom);
        socket.emit("join_room", chatId);
        setJoinedRoom(chatId);
        // console.log(`joinedRoom set with chatId: ${chatId}`);
    };

    useEffect(() => {
        // console.log(`JoinedRoom has changed it's value. joinedRoom: ${joinedRoom}`);
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
        // console.log("messages updated");
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
            // console.log(data);
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
            // console.log(allChatsData.data)
            setChats(allChatsData.data);

            const allGroupChatsData = await axios.get(`${baseURL}/chat/getAllChats`, {
                params: {
                    member: me?._id,
                    isGroupChat: true,
                }
            });
            setGroupChats(allGroupChatsData.data);
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

        if (chat?.isGroupChat) {
            setOpenedChat({
                username: chat?.groupName,
                profilePicture: groupChatLogo,
                joinedRoom: chat?._id
            });

            setMessages(chat?.messages);
        } else {



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
        }

        // console.log(openedChat);
        setAddFriendPage(false);
    }

    const handleCreateGroup = async (user, chat) => {
        setOpenCreateGroup(!openCreateGroup);
        // console.log(newGroupName);
        // console.log(selectedMembers);

        if (newGroupName !== "") {
            const data = {
                groupName: newGroupName,
                members: selectedMembers,
                isGroupChat: true,
            }
            try {
                const response = await axios.post(`${baseURL}/chat/createNewChat`, data);
                // console.log(response.data);
                setOpenedChat({
                    username: newGroupName,
                    profilePicture: groupChatLogo,
                    joinedRoom: response.data?._id
                });
                joinRoom(response.data?._id);
                setMessages(response.data?.messages);
            } catch (error) {
                console.log(error);
            }
        }
    }
    useEffect(() => {
        // console.log(selectedMembers);
    }, [selectedMembers])


    useEffect(() => {
        // console.log(openedChat);
        joinRoom(openedChat.joinedRoom);
    }, [openedChat]);


    return (
        <div className='home'>
            <Sidebar Page={"Social Forum"} />
            <div className='home-page'>

                <Navbar mainHeading={"Social Forum"} />

                <div className='social-forum-page-row'>
                    <div className='chat-users-container'>
                        <div className='chat-users-container-nav'>
                            {addFriendPage === false ? <button className='chat-users-add-friend-btn' onClick={() => { setAddFriendPage(true); setOpenCreateGroup(false); }}>Add friends</button> :
                                <button className='back-btn'
                                    style={{ backgroundColor: "#C0B1D2" }}
                                    onClick={() => { setAddFriendPage(false) }}><Back color="black" /></button>}
                            <SearchBar onChats={true}/>
                        </div>
                        {addFriendPage === false ? <div className='chat-users-container-btn-row'>
                            <button className='chat-users-btn' onClick={() => { setOpenChat(true); setOpenCreateGroup(false); }}>Friends</button>
                            <button className='chat-users-btn' onClick={() => { setOpenChat(false); }}>Group</button>
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
                                // !openCreateGroup &&
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
                                !openCreateGroup &&
                                <div style={{ width: "100%" }}>
                                    <MessageTile
                                        handleOpenMessage={handleCreateGroup}
                                        user={{
                                            username: "New Group",
                                            profilePicture: "https://huntsman.upenn.edu/wp-content/uploads/2019/07/mentoring-icon-10.jpg.png"
                                        }}
                                    />
                                    {groupChats.map((chat, index) => {
                                        return (
                                            <MessageTile
                                                handleOpenMessage={handleOpenMessage}
                                                user={{
                                                    username: chat.groupName,
                                                    profilePicture: groupChatLogo
                                                }}
                                                chat={chat}
                                                key={index}
                                            />
                                        );
                                    })}
                                </div>
                            }

                            {
                                !openChat &&
                                !addFriendPage &&
                                openCreateGroup &&
                                <div style={{ width: "100%" }}>
                                    <CreateGroupTile
                                        handleCreateGroup={handleCreateGroup}
                                        newGroupName={newGroupName}
                                        setNewGroupName={setNewGroupName}
                                    />
                                    <div className='chat-users-container-btn-row'>
                                        <button className='chat-users-btn'>Add Members</button>
                                    </div>
                                    <div className='chat-users-seperator-line'></div>
                                    {allUsers.map((user, index) => {
                                        if (user._id === me?._id) {
                                            return null;
                                        }
                                        return (
                                            <AddToGroupTile
                                                key={index}
                                                user={user}
                                                selectedMembers={selectedMembers}
                                                setSelectedMembers={setSelectedMembers}
                                            />
                                        );
                                    })}
                                </div>
                            }

                        </div>
                    </div>





                    <div className='chat-users-container '>
                        <div className='chat-users-container-nav msg-box-nav'>
                            <div className='chat-users-display-image'>
                                {openedChat?.profilePicture ? <img src={openedChat?.profilePicture} alt='' className='chat-users-display-image' /> : <></>}
                            </div>
                            <div className='chat-users-msg-column'>
                                <div className='chat-users-username'>{openedChat?.username}</div>
                                {openedChat?.username ? <div className='chat-users-msg'>Online</div> : <></>}
                            </div>
                        </div>
                        <div style={{ height: "18px" }}></div>
                        <div className='chat-users-seperator-line'></div>
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
                            <button onClick={() => sendMessage()} className='send-btn'>
                                <SendBtn />
                            </button>
                        </div>
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
                        <div className="chat-users-msg">{chat?.messages[chat?.messages.length - 1].author === me?.username ? "You" : chat?.messages[chat?.messages.length - 1].author} : {chat?.messages[chat?.messages.length - 1].message}</div>
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

const CreateGroupTile = ({ handleCreateGroup, newGroupName, setNewGroupName }) => {
    return (
        <div
            className="chat-users-msg-tile"
        >
            <div className="chat-users-msg-left-row">
                <div className="chat-users-display-image">
                    <img
                        src="https://cdn.pixabay.com/photo/2016/11/14/17/39/group-1824145_960_720.png"
                        alt=""
                        className="chat-users-display-image"
                    />
                </div>
                <div className="chat-users-msg-column">
                    <input
                        className='chat-users-groupname-input'
                        placeholder='Enter group name'
                        value={newGroupName}
                        onChange={(e) => setNewGroupName(e.target.value)}
                    />
                </div>
            </div>

            <div
                className="chat-users-group-create-btn"
                onClick={() => {
                    handleCreateGroup();
                }}
            >
                Create
            </div>

        </div>
    );
};

const AddToGroupTile = ({ user, selectedMembers, setSelectedMembers }) => {
    const selectMembers = (e) => {
        if (e.target.checked) {
            setSelectedMembers([...selectedMembers, user?._id]);
        } else {
            setSelectedMembers(selectedMembers.filter(member => member !== user?._id));
        }
    }
    return (
        <label
            htmlFor={`${user?.username}`}
            className="chat-users-msg-tile"
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
                </div>
            </div>

            <input
                type='checkbox'
                id={`${user?.username}`}
                onChange={(e) => {
                    selectMembers(e);
                }}
            />

        </label>
    );
};
