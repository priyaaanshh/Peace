import React, { useState } from 'react'
import './home.css'
import homepglogo from '../../assets/home-page-logo.png'
import HomeLogo from '../../assets/svg/home-logo';
import Right from '../../assets/svg/right';
import Leaf from '../../assets/svg/leaf';
import Happy from '../../assets/svg/happy';
import Presentation from '../../assets/svg/presentation';
import SearchLogo from '../../assets/svg/search';
import Book from '../../assets/svg/book';
import Present from '../../assets/svg/present';
import Dashboard from '../Dashboard/dashboard';
import Meditate from '../Meditate/meditate';
import Therapy from '../Therapy/therapy';
import Assesment from '../Assesment/assesment';
import Chat from '../Chat/chat';
import Journaling from '../Journaling/journaling';
import Rewards from '../Rewards/rewards';


const Home = () => {

  const [selectedPage, setSelectedPage] = useState(1);
  const onSelect = (page) => {
    setSelectedPage(page);
  }
  return (
    <div className='home'>
      <div className='home-sidebar'>
        <img src={homepglogo} alt='' />
        <div className='sidebar-buttons'>
          <button className={`sidebar-btn ${selectedPage === 1 ? "sidebar-btn-selected" : ""}`} onClick={() => onSelect(1)}>
            <HomeLogo color={`${selectedPage === 1 ? "white" : "#C6C8D3"}`} />
            <p className={`sidebar-btn-text ${selectedPage === 1 ? "sidebar-btn-text-selected" : ""}`}>Home</p>
            {selectedPage !== 1 ? <Right color="#C6C8D3" /> : <div></div>}
          </button>

          <button className={`sidebar-btn ${selectedPage === 2 ? "sidebar-btn-selected" : ""}`} onClick={() => onSelect(2)}>
            <Leaf color={`${selectedPage === 2 ? "white" : "#C6C8D3"}`} />
            <p className={`sidebar-btn-text ${selectedPage === 2 ? "sidebar-btn-text-selected" : ""}`}>Medidate</p>
            {selectedPage !== 2 ? <Right color="#C6C8D3" /> : <div></div>}
          </button>

          <button className={`sidebar-btn ${selectedPage === 3 ? "sidebar-btn-selected" : ""}`} onClick={() => onSelect(3)}>
            <Happy color={`${selectedPage === 3 ? "white" : "#C6C8D3"}`} />
            <p className={`sidebar-btn-text ${selectedPage === 3 ? "sidebar-btn-text-selected" : ""}`}>Therapy Session</p>
            {selectedPage !== 3 ? <Right color="#C6C8D3" /> : <div></div>}
          </button>

          <button className={`sidebar-btn ${selectedPage === 4 ? "sidebar-btn-selected" : ""}`} onClick={() => onSelect(4)}>
            <Presentation color={`${selectedPage === 4 ? "white" : "#C6C8D3"}`} />
            <p className={`sidebar-btn-text ${selectedPage === 4 ? "sidebar-btn-text-selected" : ""}`}>Assessment</p>
            {selectedPage !== 4 ? <Right color="#C6C8D3" /> : <div></div>}
          </button>

          <button className={`sidebar-btn ${selectedPage === 5 ? "sidebar-btn-selected" : ""}`} onClick={() => onSelect(5)}>
            <SearchLogo color={`${selectedPage === 5 ? "white" : "#C6C8D3"}`} />
            <p className={`sidebar-btn-text ${selectedPage === 5 ? "sidebar-btn-text-selected" : ""}`}>Social Forum</p>
            {selectedPage !== 5 ? <Right color="#C6C8D3" /> : <div></div>}
          </button>

          <button className={`sidebar-btn ${selectedPage === 6 ? "sidebar-btn-selected" : ""}`} onClick={() => onSelect(6)}>
            <Book color={`${selectedPage === 6 ? "white" : "#C6C8D3"}`} />
            <p className={`sidebar-btn-text ${selectedPage === 6 ? "sidebar-btn-text-selected" : ""}`}>Journaling </p>
            {selectedPage !== 6 ? <Right color="#C6C8D3" /> : <div></div>}
          </button>

          <button className={`sidebar-btn ${selectedPage === 7 ? "sidebar-btn-selected" : ""}`} onClick={() => onSelect(7)}>
            <Present color={`${selectedPage === 7 ? "white" : "#C6C8D3"}`} />
            <p className={`sidebar-btn-text ${selectedPage === 7 ? "sidebar-btn-text-selected" : ""}`}>Rewards </p>
            {selectedPage !== 7 ? <Right color="#C6C8D3" /> : <div></div>}
          </button>
        </div>
        <div ></div>
        <div ></div>
        <div ></div>
        <div className='PrivacyText'>Privacy Policy</div>
      </div>
      <CorrectPage selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
    </div>
  )
}

export default Home



const CorrectPage = ({ selectedPage, setSelectedPage }) => {
  switch (selectedPage) {
    case 1:
      return <Dashboard setSelectedPage={setSelectedPage} />;
    case 2:
      return <Meditate />;
    case 3:
      return <Therapy />;
    case 4:
      return <Assesment setSelectedPage={setSelectedPage} />;
    case 5:
      return <Chat />;
    case 6:
      return <Journaling />;
    case 7:
      return <Rewards />;

    default:
      return <div style={{ width: "100%" }}></div>
  }
}