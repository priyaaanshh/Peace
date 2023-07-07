import React, { useEffect, useState } from 'react'
import './meditate.css'
import '../Home/home.css'
import Sidebar from '../../components/SideBar/sidebar';
import { baseURL } from '../../baseURL/baseURL';
import useFetch from '../../hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/HomePageCard/card';
import Navbar from '../../components/Navbar/navbar';

const Meditate = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});

  const { data } = useFetch(`${baseURL}/user/userInfo/${localStorage.getItem("access_token")}/${JSON.parse(localStorage.getItem("user"))?._id}`);
  useEffect(() => {
    setUserInfo(data);
  }, [data]);


  return (
    <div className='home'>
      <Sidebar Page={"Meditate"} />
      <div className='home-page'>

        <Navbar mainHeading={"Meditate"} searchBar={true} />
      
      <div className='option-row'>
        <div className='option-row-item' style={{background: "#113F67"}}>All</div>
        <div className='option-row-item'>Sleep</div>
        <div className='option-row-item'>Anxiety</div>
        <div className='option-row-item'>Inner Peace</div>
        <div className='option-row-item'>Stress</div>
        <div className='option-row-item'>Work</div>
        <div className='option-row-item'>Self Care</div>
      </div>
      <div className='home-page-heading'>Featured</div>

      <div className='home-page-cards'>
        <Card />
        <Card />
      </div>

        <div className='home-page-heading'>Quick & Easy</div>
      </div>
    </div>
  )
}

export default Meditate