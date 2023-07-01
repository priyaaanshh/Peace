import React, { useEffect, useState } from 'react'
import './home.css'
import homepglogo from '../../assets/home-page-logo.png'
import HomeLogo from '../../assets/svg/home-logo';
import Right from '../../assets/svg/right';
import Leaf from '../../assets/svg/leaf';
import Happy from '../../assets/svg/happy';
import Presentation from '../../assets/svg/presentation';
import SearchLogo from '../../assets/svg/search';
import Book from '../../assets/svg/book';
import Present from '../../assets/svg/present';
import NotificationLogo from '../../assets/svg/notification';
import StartConversation from '../../assets/svg/startConversation';
import { ReactComponent as UpComingSessions } from '../../assets/svg/upcomingSessions.svg';
import { baseURL } from '../../baseURL/baseURL';
import useFetch from '../../hooks/useFetch';
import SessionSlider from '../../components/Slider/slider';
import sliderImage from '../../assets/default-slider-img.png'
import Card from '../../components/HomePageCard/card';
import { useNavigate } from 'react-router-dom';


const Home = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});


  const { data } = useFetch(`${baseURL}/user/userInfo/${localStorage.getItem("access_token")}/${JSON.parse(localStorage.getItem("user"))?._id}`);
  useEffect(() => {
    setUserInfo(data);

  }, [data]);
  const [selectedPage, setSelectedPage] = useState(1);
  const [progress, setProgress] = useState(12);
  const onSelect = (page) => {
    setSelectedPage(page);
  }
  return (
    <div className='home'>
      <div className='home-sidebar'>
        <img src={homepglogo} alt='' />
        <div className='sidebar-buttons'>
          <button className={`sidebar-btn ${selectedPage === 1 ? "sidebar-btn-selected" : ""}`} onClick={() => onSelect(1)}>
            <HomeLogo color={`${selectedPage === 1 ? "white" : "#C6C8D3"}`} />
            <p className={`sidebar-btn-text ${selectedPage === 1 ? "sidebar-btn-text-selected" : ""}`}>Home</p>
            {selectedPage !== 1 ? <Right color="#C6C8D3" /> : <div></div>}
          </button>

          <button className={`sidebar-btn ${selectedPage === 2 ? "sidebar-btn-selected" : ""}`} onClick={() => onSelect(2)}>
            <Leaf color={`${selectedPage === 2 ? "white" : "#C6C8D3"}`} />
            <p className={`sidebar-btn-text ${selectedPage === 2 ? "sidebar-btn-text-selected" : ""}`}>Medidate</p>
            {selectedPage !== 2 ? <Right color="#C6C8D3" /> : <div></div>}
          </button>

          <button className={`sidebar-btn ${selectedPage === 3 ? "sidebar-btn-selected" : ""}`} onClick={() => onSelect(3)}>
            <Happy color={`${selectedPage === 3 ? "white" : "#C6C8D3"}`} />
            <p className={`sidebar-btn-text ${selectedPage === 3 ? "sidebar-btn-text-selected" : ""}`}>Therapy Session</p>
            {selectedPage !== 3 ? <Right color="#C6C8D3" /> : <div></div>}
          </button>

          <button className={`sidebar-btn ${selectedPage === 4 ? "sidebar-btn-selected" : ""}`} onClick={() => onSelect(4)}>
            <Presentation color={`${selectedPage === 4 ? "white" : "#C6C8D3"}`} />
            <p className={`sidebar-btn-text ${selectedPage === 4 ? "sidebar-btn-text-selected" : ""}`}>Assessment</p>
            {selectedPage !== 4 ? <Right color="#C6C8D3" /> : <div></div>}
          </button>

          <button className={`sidebar-btn ${selectedPage === 5 ? "sidebar-btn-selected" : ""}`} onClick={() => onSelect(5)}>
            <SearchLogo color={`${selectedPage === 5 ? "white" : "#C6C8D3"}`} />
            <p className={`sidebar-btn-text ${selectedPage === 5 ? "sidebar-btn-text-selected" : ""}`}>Social Forum</p>
            {selectedPage !== 5 ? <Right color="#C6C8D3" /> : <div></div>}
          </button>

          <button className={`sidebar-btn ${selectedPage === 6 ? "sidebar-btn-selected" : ""}`} onClick={() => onSelect(6)}>
            <Book color={`${selectedPage === 6 ? "white" : "#C6C8D3"}`} />
            <p className={`sidebar-btn-text ${selectedPage === 6 ? "sidebar-btn-text-selected" : ""}`}>Journaling </p>
            {selectedPage !== 6 ? <Right color="#C6C8D3" /> : <div></div>}
          </button>

          <button className={`sidebar-btn ${selectedPage === 7 ? "sidebar-btn-selected" : ""}`} onClick={() => onSelect(7)}>
            <Present color={`${selectedPage === 7 ? "white" : "#C6C8D3"}`} />
            <p className={`sidebar-btn-text ${selectedPage === 7 ? "sidebar-btn-text-selected" : ""}`}>Rewards </p>
            {selectedPage !== 7 ? <Right color="#C6C8D3" /> : <div></div>}
          </button>
        </div>
        <div ></div>
        <div ></div>
        <div ></div>
        <div className='PrivacyText'>Privacy Policy</div>
      </div>
      <div className='home-page'>
        <div className='navbar'>
          <div className='nav-text'>
            <div className='greeting-container'>
              <p className='home-main-heading'>Good Morning,  </p>
              <p className='home-main-heading' style={{ fontWeight: "600" }}>{userInfo.username} </p>
            </div>
            <p className='home-sub-heading'>"Your mental health is a priority. Take care of yourself, unplug, recharge, and remember that you are worth it."</p>
          </div>
          <div className='nav-buttons'>
            <div className='notification-button'><NotificationLogo color="#111111" /></div>
            <div className='user-avatar'>
              <img src={sliderImage} alt='' className='user-avatar' />
            </div>
          </div>
        </div>
        <div className='home-page-tiles'>
          <div className="home-page-tile" onClick={() => { navigate('/chats'); }}>
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

export default Home