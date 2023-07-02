import React, { useEffect, useState } from 'react'
import './rewards.css'
import { baseURL } from '../../baseURL/baseURL';
import useFetch from '../../hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import NavButtons from '../../components/NavButtons/navButtons';
import SearchBar from '../../components/SearchBar/searchBar';

import  Voucher1  from '../../assets/svg/Vouchers/Game Vouchers/1.jpg';
import Voucher2  from '../../assets/svg/Vouchers/Game Vouchers/2.jpg';
import Voucher3  from '../../assets/svg/Vouchers/Game Vouchers/3.jpg';
import Voucher4  from '../../assets/svg/Vouchers/Game Vouchers/4.jpg';


import OtherVoucher1  from '../../assets/svg/Vouchers/Other Vouchers/1.jpg';
import OtherVoucher2  from '../../assets/svg/Vouchers/Other Vouchers/2.jpg';
import OtherVoucher3 from '../../assets/svg/Vouchers/Other Vouchers/3.jpg';


const Rewards = () => {
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
          <p className='home-main-heading' style={{ fontWeight: "600" }}>Rewards </p>
        </div>
        <SearchBar />
        <NavButtons />
      </div>

      <div className='quote-row'>
        <div className='assesment-page-quote'>Great Week! Earn Your Rewards: A Week of Health and Happiness!</div>
        <div className='redeem-button'>Redeemable points: 50</div>
      </div>

      <div className='home-page-heading'>Game Vouchers</div>
      <div className='reward-vouchers'>
        <img src={Voucher1} alt='' />
        <img src={Voucher2} alt='' />
        <img src={Voucher3} alt='' />
        <img src={Voucher4} alt='' />
      </div>
      <div className='home-page-heading'>Other Vouchers</div>
      <div className='reward-vouchers'>
        <img src={OtherVoucher1} alt='' />
        <img src={OtherVoucher2} alt='' />
        <img src={OtherVoucher3} alt='' />
      </div>
    </div>
  )
}

export default Rewards