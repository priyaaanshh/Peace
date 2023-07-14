import React, { useEffect, useState } from 'react'
import { ReactComponent as UpComingSessions } from '../../assets/svg/upcomingSessions.svg';
import { baseURL } from '../../baseURL/baseURL';
import useFetch from '../../hooks/useFetch';
import { ReactComponent as StartConversation } from '../../assets/svg/startConversation.svg';
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
                <Navbar isHomePage={true} />
                <div className='home-page-tiles'>
                    <div className="home-page-tile" onClick={() => { navigate('/therapy-session') }}>
                        <StartConversation />
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
                                <div className='filled-progress-bar' style={{ width: `${progress}%` }}>
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
                    <Card
                        image={"https://images.pexels.com/photos/3265460/pexels-photo-3265460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}
                        CardHeading={"Daily  Lofi "}
                        songs={[
                            'https://www.chosic.com/wp-content/uploads/2022/10/Lost-and-Found.mp3',
                            'https://www.chosic.com/wp-content/uploads/2022/10/Bedhead.mp3',
                            'https://www.chosic.com/wp-content/uploads/2022/10/Signs-of-Life.mp3',
                        ]}
                    />
                    <Card
                        CardHeading={"Daily  Study"}
                        CardSubHeading1={"Wisdom"}
                        CardSubHeading2={"Jay Shetty"}
                        CardSubHeading4={"Self View"}
                        image={"https://images.bauerhosting.com/celebrity/sites/3/2022/09/GettyImages-1369475529-e1662563431594.jpg?q=80&auto=format&w=1400&ar=16:9&fit=crop&crop=top"}
                        songs={[
                            'https://www.chosic.com/wp-content/uploads/2022/01/sugar-coat.mp3',
                            'https://www.chosic.com/wp-content/uploads/2021/07/Embrace.mp3',
                            'https://www.chosic.com/wp-content/uploads/2021/08/scott-buckley-jul.mp3'
                        ]}
                    />
                    <Card
                        image={"https://wildclinicandnaturaltreat.com/cdn/shop/articles/bodytight_73e09894-d6fa-46a1-b1cf-f6d0a40bb2c0.jpg?v=1617873300"}
                        CardHeading={"Daily  Ambient"}
                        CardSubHeading1={"Movement "}
                        CardSubHeading2={"Mia Meh"}
                        CardSubHeading4={"Daily Practice"}
                        songs={[
                            'https://www.chosic.com/wp-content/uploads/2022/01/silent-wood.mp3',
                            'https://www.chosic.com/wp-content/uploads/2020/07/Art-Of-Silence_V2.mp3',
                            'https://www.chosic.com/wp-content/uploads/2022/01/journey-end.mp3'
                        ]}
                    />
                    <Card
                        image={"https://renascent.ca/wp-content/uploads/2016/11/step-11-prayer-and-meditation.jpg"}
                        CardHeading={"Daily  Calm"}
                        CardSubHeading1={"Meditation "}
                        songs={[
                            'https://www.chosic.com/wp-content/uploads/2022/03/Ghostrifter-Official-Devyzed-Downtown-Glow.mp3',
                            'https://www.chosic.com/wp-content/uploads/2021/02/Warm-Memories-Emotional-Inspiring-Piano.mp3',
                            'https://www.chosic.com/wp-content/uploads/2022/02/a-promise.mp3'
                        ]}
                    />
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