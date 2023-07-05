import React, { useEffect, useState } from 'react'
import sliderImage from '../../assets/default-slider-img.png'
import NotificationLogo from '../../assets/svg/notification';
import { baseURL } from '../../baseURL/baseURL';
import useFetch from '../../hooks/useFetch';
import { useNavigate } from 'react-router-dom';

const NavButtons = () => {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem("user")));

    return (
        <div className='nav-buttons'>
            <div className='notification-button'><NotificationLogo color="#111111" /></div>
            <div className='user-avatar' onClick={() => { navigate("/user"); }}>
                {userInfo?.profilePicture ? <img src={userInfo?.profilePicture} alt='' className='user-avatar' /> : <></>}
            </div>
        </div>
    )
}

export default NavButtons