import React, { useEffect, useState } from 'react'
import { ReactComponent as UpComingSessions } from '../../assets/svg/upcomingSessions.svg';
import { baseURL } from '../../baseURL/baseURL';
import useFetch from '../../hooks/useFetch';
import StartConversation from '../../assets/svg/startConversation';
import SessionSlider from '../../components/Slider/slider';
import Card from '../../components/HomePageCard/card';
import '../Home/home.css'
import './dashboard.css'
import { useNavigate } from 'react-router-dom';
import SidebarRough from '../../components/SideBar/sidebar';
import Navbar from '../../components/Navbar/navbar';

const Dashboard = () => {

    const navigate = useNavigate();
    const [progress, setProgress] = useState(52);
    const [userInfo, setUserInfo] = useState({});


    const { data } = useFetch(`${baseURL}/user/userInfo/${localStorage.getItem("access_token")}/${JSON.parse(localStorage.getItem("user"))?._id}`);
    useEffect(() => {
        setUserInfo(data);
    }, [data]);

    return (
        <div className='home'>
            <SidebarRough Page={"Home"} />
            <div className='home-page'>
                <Navbar isHomePage={true}/>
                <div className='home-page-tiles'>
                    <div className="home-page-tile" onClick={() => { navigate('/therapy-session') }}>
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
        </div>
    )
}

export default Dashboard