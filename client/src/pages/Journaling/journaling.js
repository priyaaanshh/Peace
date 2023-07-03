import React, { useEffect, useState } from 'react'
import './journaling.css'
import { baseURL } from '../../baseURL/baseURL';
import useFetch from '../../hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import NavButtons from '../../components/NavButtons/navButtons';
import SearchBar from '../../components/SearchBar/searchBar';
import CalendarComponent from '../../components/Calendar/calendar';
import { ReactComponent as SideComma } from '../../assets/svg/sideComma.svg'


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
      <div className='Journaling-page-row'>
        <div className='Journaling-page-column'>
          <CalendarComponent />
          <div style={{ height: "10px" }}></div>
          <div className='quote-card'>
            <p className='quote-heading'>Quotes to remember</p>
            <p className='quote'>Just one small positive thought in the morning can change your whole day.</p>
            <p className='side-comma'><SideComma /></p>
          </div>
        </div>
        <div className='Journaling-page-column textarea-right'>
          <div className='notes-container'>
            <p className='notes-text'>Notes</p>
            <p className='notes-title'> ✨ Your thoughts about today ✨</p>
            <textarea className='note-text-area' />
          </div>
          <button className='save-note'>Save</button>
        </div>
      </div>
    </div>
  )
}

export default Journaling


