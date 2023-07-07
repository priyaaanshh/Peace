import React, { useEffect, useState } from 'react'
import SearchBar from '../../components/SearchBar/searchBar';
import NavButtons from '../../components/NavButtons/navButtons';
import { Sling as Hamburger } from 'hamburger-react';
import { baseURL } from '../../baseURL/baseURL';
import useFetch from '../../hooks/useFetch';
import Sidebar from '../SideBar/sidebar';

const Navbar = ({ isHomePage, searchBar, mainHeading }) => {
    const [userInfo, setUserInfo] = useState({});
    const [isOpen, setOpen] = useState(false);


    const { data } = useFetch(`${baseURL}/user/userInfo/${localStorage.getItem("access_token")}/${JSON.parse(localStorage.getItem("user"))?._id}`);
    useEffect(() => {
        setUserInfo(data);
    }, [data]);

    return (

        <div className='navbar'>
            <div className='nav-text'>
                <div className='hamburger-menu-button'>
                    < Hamburger toggled={isOpen} toggle={setOpen} />
                    {isOpen?<Sidebar isOpen={isOpen} setOpen={setOpen} Page={!isHomePage?mainHeading:"Home"} displayTrue={true}/>:<></>}
                </div>
                {mainHeading ? <p className='home-main-heading' style={{ fontWeight: "600" }}>{mainHeading} </p> : <></>}
                {isHomePage ? <div className='greeting-container'>
                    <p className='home-main-heading'>Good Morning,  </p>
                    <p className='home-main-heading' style={{ fontWeight: "600" }}>{userInfo?.username} </p>
                </div> : <></>}
                {isHomePage ? <p className='home-sub-heading'>"Your mental health is a priority. Take care of yourself, unplug, recharge, and remember that you are worth it."</p> : <></>}
            </div>
            {searchBar ?
                <SearchBar /> : <></>}
            <NavButtons />
        </div>

    )
}

export default Navbar