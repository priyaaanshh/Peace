import React, { useEffect, useState } from 'react'
import './assesment.css'
import { baseURL } from '../../baseURL/baseURL';
import useFetch from '../../hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import NavButtons from '../../components/NavButtons/navButtons';
import SearchBar from '../../components/SearchBar/searchBar';
import GetRewards from '../../assets/svg/getRewards';
import MoodMeter from '../../assets/svg/MoodMeter';
import DotMenu from '../../assets/svg/dot menu';


const Assesment = ({setSelectedPage}) => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});

  const { data } = useFetch(`${baseURL}/user/userInfo/${localStorage.getItem("access_token")}/${JSON.parse(localStorage.getItem("user"))?._id}`);
  useEffect(() => {
    setUserInfo(data);
  }, [data]);


  return (
    <div className='home-page'>
      <div className='navbar'>
        <div className='nav-text'>
          <p className='home-main-heading' style={{ fontWeight: "600" }}>Assesment </p>
        </div>
        <SearchBar />
        <NavButtons />
      </div>
      <div className='assesment-page-quote'>*”Your good mood, your great rewards! Embrace the benefits of a healthy mind and body."</div>
      <div className='home-page-tiles'>
        <div className="home-page-tile" onClick={() => { setSelectedPage(7) }}>
          <GetRewards className="home-page-tile" />
        </div>
        <div className="home-page-tile" onClick={() => {  }}>
          <MoodMeter className="home-page-tile" />
        </div>
        {/* <div className='home-page-tile tile-container'>
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
        </div> */}
      </div>

      <div className='home-page-heading'>Recent Survey</div>

      <div className='mood-score-list'>

        <div className='mood-score-tile'>
          <div className='mood-tile-left'>
            <p>1.</p>
            <p>Mood Score:</p>
            <p>48</p>
          </div>
          <div className='mood-tile-right'>
            <p>15 Aug</p>
            <DotMenu color={"black"} />
          </div>
        </div>


        <div className='mood-score-tile'>
          <div className='mood-tile-left'>
            <p>2.</p>
            <p>Mood Score:</p>
            <p>40</p>
          </div>
          <div className='mood-tile-right'>
            <p>16 Aug</p>
            <DotMenu color={"black"} />
          </div>
        </div>


        <div className='mood-score-tile'>
          <div className='mood-tile-left'>
            <p>3.</p>
            <p>Mood Score:</p>
            <p>30</p>
          </div>
          <div className='mood-tile-right'>
            <p>17 Aug</p>
            <DotMenu color={"black"} />
          </div>
        </div>


        <div className='mood-score-tile'>
          <div className='mood-tile-left'>
            <p>4.</p>
            <p>Mood Score:</p>
            <p>25</p>
          </div>
          <div className='mood-tile-right'>
            <p>18 Aug</p>
            <DotMenu color={"black"} />
          </div>
        </div>

      </div>
    </div>
  )
}

export default Assesment