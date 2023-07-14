import React, { useEffect, useState } from 'react'
import SearchBar from '../../components/SearchBar/searchBar';
import NavButtons from '../../components/NavButtons/navButtons';
import { Sling as Hamburger } from 'hamburger-react';
import { baseURL } from '../../baseURL/baseURL';
import useFetch from '../../hooks/useFetch';
import Sidebar from '../SideBar/sidebar';

const Navbar = ({ isHomePage, searchBar, mainHeading }) => {
    const [time, setTime] = useState(new Date());
    const [userInfo, setUserInfo] = useState({});
    const [isOpen, setOpen] = useState(false);


    const { data } = useFetch(`${baseURL}/user/userInfo/${localStorage.getItem("access_token")}/${JSON.parse(localStorage.getItem("user"))?._id}`);
    useEffect(() => {
        setUserInfo(data);
    }, [data]);

    useEffect(() => {
        const timerID = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => {
            clearInterval(timerID);
        };
    }, []);

    const getGreeting = () => {
        const currentHour = time.getHours();
        let greeting = '';

        if (currentHour >= 0 && currentHour < 12) {
            greeting = 'Good Morning';
        } else if (currentHour >= 12 && currentHour < 17) {
            greeting = 'Good Afternoon';
        } else {
            greeting = 'Good Evening';
        }

        return greeting;
    };

    const greeting = getGreeting();

    return (

        <div className='navbar'>
            <div className='nav-text'>
                <div className='hamburger-menu-button'>
                    < Hamburger toggled={isOpen} toggle={setOpen} color='white' />
                    {isOpen ? <Sidebar isOpen={isOpen} setOpen={setOpen} Page={!isHomePage ? mainHeading : "Home"} displayTrue={true} /> : <></>}
                </div>
                {mainHeading ? <p className='home-main-heading' style={{ fontWeight: "600" }}>{mainHeading} </p> : <></>}
                {isHomePage ? <div className='greeting-container'>
                    <p className='home-main-heading'>{greeting},  </p>
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