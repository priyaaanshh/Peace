import React, { useState, useEffect } from 'react';
import NotificationLogo from '../../assets/svg/notification';
import { useNavigate } from 'react-router-dom';
import { BsDot } from "react-icons/bs";
const NavButtons = () => {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem("user")));
    const [isNotificationVisible, setIsNotificationVisible] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            const user = JSON.parse(localStorage.getItem("user"));
            if (!user) {
                navigate('/login');
            } else {
                setUserInfo(user);
            }
        }, 100);

        return () => {
            clearInterval(interval);
        };
    }, [navigate]);

    return (
        <div className='nav-buttons'>
            <div className='notification-button' onClick={() => setIsNotificationVisible(!isNotificationVisible)}>
                <NotificationLogo color="#111111" />
            </div>
            <div className='user-avatar' onClick={() => { navigate("/user"); }}>
                {userInfo?.profilePicture ? <img src={userInfo?.profilePicture} alt='' className='user-avatar' /> : null}
            </div>
            {isNotificationVisible && <div className='notification-pannel'>
                <div className='noti-logo'>Notification</div>
                <div className='notification'>
                    <BsDot size='40px' />
                    <div>
                        You have avail some points, please redeem in your reward page.
                    </div>
                </div>
                <div className='notification'>
                    <BsDot size='40px' />
                    <div>
                        Reminder: You have an upcoming appointment on 15 Aug at 6:00 PM.
                    </div>
                </div>
                <div className='notification'>
                    <BsDot size='40px' />
                    <div>
                        You have a new friend request! Connect and expand your community.
                    </div>
                </div>
            </div>}
        </div>
    );
}

export default NavButtons;
