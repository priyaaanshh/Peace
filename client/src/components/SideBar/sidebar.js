import React, { useContext } from 'react'
import Logo from '../../assets/logo.png'
import HomeLogo from '../../assets/svg/home-logo';
import Right from '../../assets/svg/right';
import Leaf from '../../assets/svg/leaf';
import Happy from '../../assets/svg/happy';
import Presentation from '../../assets/svg/presentation';
import SearchLogo from '../../assets/svg/search';
import Book from '../../assets/svg/book';
import Present from '../../assets/svg/present';
import { Sling as Hamburger } from 'hamburger-react';
import { useNavigate } from 'react-router-dom';
import { VolumeContext } from '../../Context/volumeContext';
import { GoMute, GoUnmute } from "react-icons/go";




const Sidebar = ({ isOpen, setOpen, Page, displayTrue }) => {
    const navigate = useNavigate();


    const SideBarData = [
        {
            title: 'Home',
            path: '/',
            icon: <HomeLogo color={`${Page === 'Home' ? "white" : "#333"}`} />,
        },
        {
            title: 'Meditate',
            path: '/meditate',
            icon: <Leaf color={`${Page === 'Meditate' ? "white" : "#333"}`} />,
        },
        {
            title: 'Therapy Session',
            path: '/therapy-session',
            icon: <Happy color={`${Page === 'Therapy Session' ? "white" : "#333"}`} />,
        },
        {
            title: 'Assessment',
            path: '/assessment',
            icon: <Presentation color={`${Page === 'Assessment' ? "white" : "#333"}`} />,
        },
        {
            title: 'Social Forum',
            path: '/social-forum',
            icon: <SearchLogo color={`${Page === 'Social Forum' ? "white" : "#333"}`} />,
        },
        {
            title: 'Journaling',
            path: '/journaling',
            icon: <Book color={`${Page === 'Journaling' ? "white" : "#333"}`} />,
        },
        {
            title: 'Rewards',
            path: '/rewards',
            icon: <Present color={`${Page === 'Rewards' ? "white" : "#333"}`} />,
        },
    ];

    const { volume, setVolume } = useContext(VolumeContext);
    const handleVolumeChange = (event) => {
        const volumeValue = event.target.value;
        setVolume(volumeValue);
    };

    return (
        <div className={` ${displayTrue ? "show-side-bar" : "home-sidebar"}`}>
            <div className='hamburger-on-sidebar hamburger-menu-button'>
                < Hamburger toggled={isOpen} toggle={setOpen} color='white'/>
            </div>
            <img src={Logo} alt='' onClick={() => navigate('/')} style={{ width: "150px", cursor: "pointer" }} />
            <div className='sidebar-buttons'>

                {SideBarData.map((data, index) => {
                    return (
                        <button key={index} className={`sidebar-btn ${Page === data.title ? "sidebar-btn-selected" : ""}`} onClick={() => navigate(`${data.path}`)}>
                            {data.icon}
                            <p className={`sidebar-btn-text ${Page === data.title ? "sidebar-btn-text-selected" : ""}`}>{data.title}</p>
                            {Page !== data.title ? <Right color="#333" /> : <div></div>}
                        </button>
                    );
                })}
                <div></div>
                <div></div>
                <div className='background-Volume-controller'>
                    <GoMute size='24px' color='white' />
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.2"
                        value={volume}
                        onChange={handleVolumeChange}
                        className="background-Volume-controller-input"
                    // style={{ transform: 'rotate(270deg)' }}
                    />
                    <GoUnmute size='24px' color='white' />
                </div>

                <div></div>
                <div></div>
            </div>
            <div></div>
            <div className='PrivacyText'>Privacy Policy</div>
        </div>
    )
}

export default Sidebar