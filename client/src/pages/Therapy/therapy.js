import React, { useEffect, useState } from 'react'
import './therapy.css'
import '../Home/home.css'
import Sidebar from '../../components/SideBar/sidebar';
import { baseURL } from '../../baseURL/baseURL';
import useFetch from '../../hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import BookCard from '../../components/DoctorBookCard/bookCard';
import Navbar from '../../components/Navbar/navbar';


const Therapy = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});

  const { data } = useFetch(`${baseURL}/user/userInfo/${localStorage.getItem("access_token")}/${JSON.parse(localStorage.getItem("user"))?._id}`);
  useEffect(() => {
    setUserInfo(data);
  }, [data]);


  return (
    <div className='home'>
      <Sidebar Page={"Therapy Session"} />
      <div className='home-page'>

        <Navbar mainHeading={"Therapy Session"} searchBar={true} />
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
    </div>
  )
}

export default Therapy