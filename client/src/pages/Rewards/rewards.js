import React from 'react'
import './rewards.css'
import '../Home/home.css'
import Sidebar from '../../components/SideBar/sidebar';

import  Voucher1  from '../../assets/svg/Vouchers/Game Vouchers/1.jpg';
import Voucher2  from '../../assets/svg/Vouchers/Game Vouchers/2.jpg';
import Voucher3  from '../../assets/svg/Vouchers/Game Vouchers/3.jpg';
import Voucher4  from '../../assets/svg/Vouchers/Game Vouchers/4.jpg';


import OtherVoucher1  from '../../assets/svg/Vouchers/Other Vouchers/1.jpg';
import OtherVoucher2  from '../../assets/svg/Vouchers/Other Vouchers/2.jpg';
import OtherVoucher3 from '../../assets/svg/Vouchers/Other Vouchers/3.jpg';
import Navbar from '../../components/Navbar/navbar';


const Rewards = () => {


  return (
    <div className='home'>
      <Sidebar Page={"Rewards"} />
      <div className='home-page'>

        <Navbar mainHeading={"Rewards"} searchBar={true} />

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
    </div>
  )
}

export default Rewards