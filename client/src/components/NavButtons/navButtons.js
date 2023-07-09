import React, { useState, useEffect } from 'react';
import NotificationLogo from '../../assets/svg/notification';
import { useNavigate } from 'react-router-dom';

const NavButtons = () => {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem("user")));

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
            <div className='notification-button'><NotificationLogo color="#111111" /></div>
            <div className='user-avatar' onClick={() => { navigate("/user"); }}>
                {userInfo?.profilePicture ? <img src={userInfo?.profilePicture} alt='' className='user-avatar' /> : null}
            </div>
        </div>
    );
}

export default NavButtons;
