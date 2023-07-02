import React, { useEffect, useState } from 'react'
import './meditate.css'
import { baseURL } from '../../baseURL/baseURL';
import useFetch from '../../hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import NavButtons from '../../components/NavButtons/navButtons';
import SearchBar from '../../components/SearchBar/searchBar';
import Card from '../../components/HomePageCard/card';

const Meditate = () => {
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
          <p className='home-main-heading' style={{ fontWeight: "600" }}>Meditate </p>
        </div>
        <SearchBar />
        <NavButtons />
      </div>
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
  )
}

export default Meditate