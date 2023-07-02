import React, { useEffect, useState } from 'react'
import './therapy.css'
import { baseURL } from '../../baseURL/baseURL';
import useFetch from '../../hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import NavButtons from '../../components/NavButtons/navButtons';
import SearchBar from '../../components/SearchBar/searchBar';
import BookCard from '../../components/DoctorBookCard/bookCard';


const Therapy = () => {
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
          <p className='home-main-heading' style={{ fontWeight: "600" }}>Therapy Session </p>
        </div>
        <SearchBar />
        <NavButtons />
      </div>
      <div className='home-page-heading'>Top  psychiatrist</div>
      <div className='home-page-cards'>
        <BookCard />
        <BookCard />
      </div>
      <div className='home-page-heading'>Clincal Experts</div>
      <div className='home-page-cards'>
        <BookCard />
        <BookCard />
        <BookCard />
        <BookCard />
      </div>
    </div>
  )
}

export default Therapy