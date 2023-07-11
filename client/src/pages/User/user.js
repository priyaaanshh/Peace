import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Back from '../../assets/svg/back';
import './user.css';
import { AuthContext } from '../../Context/authContext';
import { useNavigate } from 'react-router-dom';
import { baseURL } from '../../baseURL/baseURL';
import useFetch from '../../hooks/useFetch';
import ManageSubs from '../../assets/svg/credit card';
import UserIcon from '../../assets/svg/user';
import Logout from '../../assets/svg/exit';
import LockIcon from '../../assets/svg/lock';
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";

const UserProfile = ({ backgroundAudio }) => {
  const [userPage, setUserPage] = useState(1);
  const [userInfo, setUserInfo] = useState({});
  const id = userInfo?._id;
  const navigate = useNavigate();

  const { dispatch } = useContext(AuthContext);
  const { data } = useFetch(`${baseURL}/user/userInfo/${localStorage.getItem("access_token")}/${JSON.parse(localStorage.getItem("user"))?._id}`);

  useEffect(() => {
    // console.log(data);
    setUserInfo(data);
  }, [data]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.setItem("access_token", null);
    navigate("/login");
  };

  const handleProfileUpdate = async () => {
    dispatch({ type: "LOGIN_START" });
    try {
      const response = await axios.patch(`${baseURL}/user/${localStorage.getItem("access_token")}/${id}`,
        userInfo
      );
      console.log(response.data);
      dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
      console.log("Updated successfully");
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };



  return (
    <div className='user-profile-page-container'>
      <div className='user-profile-page'>
        <div className='navbar'>
          <div className='back-btn'>
            <button className='back-btn' onClick={() => { navigate(-1) }}><Back color="black" /></button>
          </div>
        </div>
        
        <div className="profile-picture">
          {userInfo.profilePicture ? (
            <label className='profilePicture-label' htmlFor='profilePicture'>
              <img src={userInfo.profilePicture} alt="Profile" />
            </label>

          ) : (
            <div className="default-profile-picture">
              <label className='profilePicture-label' htmlFor='profilePicture'>Add Profile Picture</label>
            </div>
          )}
        </div>


        <div className='username'>{userInfo?.username}</div>
        {userPage === 1 && <div className='profile-options'>
          <div className='profile-option'>
            <ManageSubs color="white" />
            <p className='profile-option-text'>Manage Subscription</p>
          </div>
          <div className='profile-option' onClick={() => setUserPage(2)}>
            <UserIcon color="white" />
            <p className='profile-option-text'>Account Details</p>
          </div>
          <div className='profile-option'>
            <LockIcon color="white" />
            <p className='profile-option-text'>Change Password</p>
          </div>
          <div className='profile-option' onClick={() => handleLogout()}>
            <Logout color="white" />
            <p className='profile-option-text'>Log Out</p>
          </div>
        </div>}

        {userPage === 2 && <div className='profile-options'>
          <div className='profile-option'>
            <UserIcon color="white" />
            <p className='profile-option-text'>{userInfo?.username}</p>
          </div>
          <div className='profile-option' onClick={() => { }}>
            <AiOutlineMail size="24px" color="white" />
            <p className='profile-option-text'>{userInfo?.email}</p>
          </div>
          <div className='profile-option'>
            <AiOutlinePhone size='24px' color="white" />
            <p className='profile-option-text'>{userInfo?.phone || "1234567890"}</p>
          </div>
          <div className='profile-option' onClick={() => setUserPage(3)}>
            <BiEdit size='24px' color="white" />
            <p className='profile-option-text'>Edit</p>
          </div>
        </div>}

        {userPage === 3 && <div className='profile-options'>
          <div className='profile-option'>
            <UserIcon color="white" />
            <input value={userInfo.username} name='username' placeholder='username' onChange={(e) => handleChange(e)} />
          </div>
          <div className='profile-option' onClick={() => { }}>
            <AiOutlineMail size="24px" color="white" />
            <input value={userInfo.email} name='email' placeholder='email' onChange={(e) => handleChange(e)} />
          </div>
          <div className='profile-option'>
            <AiOutlinePhone size='24px' color="white" />
            <input value={userInfo.phone} name='phone' placeholder='phone' onChange={(e) => handleChange(e)} />
          </div>
          <div className='profile-option' onClick={() => handleProfileUpdate()}>
            <BiEdit size='24px' color="white" />
            <p className='profile-option-text'>Save</p>
          </div>
        </div>}
      </div>
    </div>
  );
};

export default UserProfile;
