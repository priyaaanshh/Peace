import React, { useEffect, useState } from 'react'
import './assesment.css'
import '../Home/home.css'
import { baseURL } from '../../baseURL/baseURL';
import useFetch from '../../hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as MoodMeter } from '../../assets/svg/MoodMeter.svg';
import { ReactComponent as GetRewards } from '../../assets/svg/getRewards.svg';
import DotMenu from '../../assets/svg/dot menu';
import Sidebar from '../../components/SideBar/sidebar';
import Navbar from '../../components/Navbar/navbar';
import CommonChart from '../../components/Chart/commonChart';


const Assesment = () => {
  const navigate = useNavigate();

  const [me, setMe] = useState(null);

  const { data } = useFetch(`${baseURL}/user/userInfo/${localStorage.getItem("access_token")}/${JSON.parse(localStorage.getItem("user"))?._id}`)

  useEffect(() => {
    setMe(data);
  }, [data]);


  const labels = [];
  const values = [];

  for (let i = 0; i < me?.moodScores?.length; i++) {
    const label = me?.moodScores[i].date;
    const value = me?.moodScores[i].moodScore;
    labels.push(label.split(',')[0]);
    values.push(value);
  }


  return (
    <div className='home'>
      <Sidebar Page={"Assessment"} />
      <div className='home-page'>

        <Navbar mainHeading={"Assessment"} searchBar={true} />

        <div className='assesment-page-quote'>*”Your good mood, your great rewards! Embrace the benefits of a healthy mind and body."</div>
        <div className='home-page-tiles'>
          <div className="home-page-tile" onClick={() => { navigate('/assesment/questions') }}>
            <GetRewards />
          </div>
          <div className="MoodMeter">
            <MoodMeter />
            <div className='MoodMeter-chart'>
              <CommonChart values={values} label={labels}/>
            </div>
          </div>
        </div>

        <div className='home-page-heading'>Recent Survey</div>

        <div className='mood-score-list'>
          {me?.moodScores?.reverse().map((item, index) => {
            return (
              <div className='mood-score-tile' key={index}>
                <div className='mood-tile-left'>
                  <p>{index + 1}.</p>
                  <p>Mood Score:</p>
                  <p>{item.moodScore}</p>
                </div>
                <div className='mood-tile-right'>
                  <p>{item.date}</p>
                  <DotMenu color={"black"} />
                </div>
              </div>
            );
          })}


          <div style={{ height: "20px" }}></div>
        </div>
      </div>
    </div>
  )
}

export default Assesment