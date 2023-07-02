import React, { useEffect, useState } from 'react'
import { ReactComponent as UpComingSessions } from '../../assets/svg/upcomingSessions.svg';
import { baseURL } from '../../baseURL/baseURL';
import useFetch from '../../hooks/useFetch';
import StartConversation from '../../assets/svg/startConversation';
import SessionSlider from '../../components/Slider/slider';
import Card from '../../components/HomePageCard/card';
import './dashboard.css'
import { useNavigate } from 'react-router-dom';
import NavButtons from '../../components/NavButtons/navButtons';

const Dashboard = ({ setSelectedPage }) => {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({});
    const [progress, setProgress] = useState(12);


    const { data } = useFetch(`${baseURL}/user/userInfo/${localStorage.getItem("access_token")}/${JSON.parse(localStorage.getItem("user"))?._id}`);
    useEffect(() => {
        setUserInfo(data);
    }, [data]);

    return (
        <div className='home-page'>
            <div className='navbar'>
                <div className='nav-text'>
                    <div className='greeting-container'>
                        <p className='home-main-heading'>Good Morning,  </p>
                        <p className='home-main-heading' style={{ fontWeight: "600" }}>{userInfo.username} </p>
                    </div>
                    <p className='home-sub-heading'>"Your mental health is a priority. Take care of yourself, unplug, recharge, and remember that you are worth it."</p>
                </div>
                <NavButtons />
            </div>
            <div className='home-page-tiles'>
                <div className="home-page-tile" onClick={() => { setSelectedPage(3)}}>
                    <StartConversation className="home-page-tile" />
                </div>
                <div className='home-page-tile tile-container'>
                    <UpComingSessions />
                    <div id="carousel">
                        <div>
                            <SessionSlider />
                        </div>
                    </div>
                    <div id="progress">
                        <div className='empty-progress-bar'>
                            <div className='filled-progress-bar' style={{ width: `${1.8 * progress}px` }}>
                            </div>
                            <p id='percentage'>{progress}%</p>
                        </div>
                    </div>
                </div>
            </div>
            <div></div>
            <div></div>
            <div></div>
            <div className='home-page-heading'>Today’s Dailies</div>
            <div></div>
            <div></div>
            <div className='home-page-cards'>
                <Card />
                <Card />
                <Card />
                <Card />
            </div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}

export default Dashboard