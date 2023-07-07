import React, { useEffect, useState } from 'react'
import './assesment.css'
import '../Home/home.css'
import { baseURL } from '../../baseURL/baseURL';
import useFetch from '../../hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import GetRewards from '../../assets/svg/getRewards';
import MoodMeter from '../../assets/svg/MoodMeter';
import DotMenu from '../../assets/svg/dot menu';
import Chart from '../../components/Chart/chart.tsx';
import Sidebar from '../../components/SideBar/sidebar';
import Navbar from '../../components/Navbar/navbar';


const Assesment = () => {
  const navigate = useNavigate();

  const [me, setMe] = useState(null);

  const { data } = useFetch(`${baseURL}/user/userInfo/${localStorage.getItem("access_token")}/${JSON.parse(localStorage.getItem("user"))._id}`)

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
    // console.log(labels);
  }


  const generateData = () => {
    return labels.map((e, i) => {
      return values[i]
    });
  };

  const graphData = {
    labels,
    datasets: [
      {
        label: 'Mood Score',
        data: generateData(),
        borderColor: '#113F67',
        backgroundColor: '#113F67B0',
      }
    ],
  };



  return (
    <div className='home'>
      <Sidebar Page={"Assessment"} />
      <div className='home-page'>

        <Navbar mainHeading={"Assessment"} searchBar={true} />

        <div className='assesment-page-quote'>*”Your good mood, your great rewards! Embrace the benefits of a healthy mind and body."</div>
        <div className='home-page-tiles'>
          <div className="home-page-tile" onClick={() => { navigate('/assesment/questions') }}>
            <GetRewards className="home-page-tile" />
          </div>
          <div className="home-page-tile" onClick={() => { }}>
            <MoodMeter className="home-page-tile" />
          </div>
          <div className='home-page-tile tile-container'>
            {/* <UpComingSessions /> */}
            <div id="carousel">
              <div>
                {/* <SessionSlider /> */}
              </div>
            </div>
            <div id="progress">
              <Chart data={graphData} />
              {/* <div className='empty-progress-bar'>
              <div className='filled-progress-bar' style={{ width: `${1.8 * progress}px` }}>
              </div>
              <p id='percentage'>{progress}%</p>
            </div> */}
            </div>
          </div>
        </div>

        <div className='home-page-heading'>Recent Survey</div>

        <div className='mood-score-list'>
          {me?.moodScores?.reverse().map((item, index) => {
            // console.log(item)
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