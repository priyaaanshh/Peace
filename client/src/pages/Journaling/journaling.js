import React, { useEffect, useState } from 'react'
import './journaling.css'
import { baseURL } from '../../baseURL/baseURL';
import useFetch from '../../hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import NavButtons from '../../components/NavButtons/navButtons';
import SearchBar from '../../components/SearchBar/searchBar';
import CalendarComponent from '../../components/Calendar/calendar';


const Journaling = () => {
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
          <p className='home-main-heading' style={{ fontWeight: "600" }}>Journaling </p>
        </div>
        <SearchBar />
        <NavButtons />
      </div>
        <CalendarComponent/>
    </div>
  )
}

export default Journaling


