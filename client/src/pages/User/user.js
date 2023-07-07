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

const UserProfile = () => {
  const [userInfo, setUserInfo] = useState({});
  const navigate = useNavigate();

  const { dispatch } = useContext(AuthContext);
  const { data } = useFetch(`${baseURL}/user/userInfo/${localStorage.getItem("access_token")}/${JSON.parse(localStorage.getItem("user"))?._id}`)
  useEffect(() => {
    console.log(data);
    setUserInfo(data);
  }, [data])
  useEffect(() => {
    console.log(userInfo)
  }, [userInfo])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleProfilePictureChange = async (e) => {
    const file = e.target.files[0];
    // console.log(file);
    try {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "HotelBook.com");
      data.append("cloud_name", "dox9ptswj");
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dox9ptswj/image/upload",
        data
      );

      const { url } = await uploadRes.data;
      console.log(url);
      setUserInfo((prevData) => ({
        ...prevData,
        [e.target.name]: url,
      }))
      console.log("updated UserInfo");
      handleProfileUpdate();
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.setItem("access_token", null);
    navigate("/login");
  };

  const handleProfileUpdate = async () => {
    dispatch({ type: "LOGIN_START" });
    try {
      const response = await axios.patch(`${baseURL}/user/${localStorage.getItem("access_token")}/${userInfo?._id}`,
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

        <input className='profilePicture-input' name='profilePicture' id='profilePicture' type="file" onChange={handleProfilePictureChange} />
        
        <div className='username'>{userInfo?.username}</div>
        <div className='profile-options'>
          <div className='profile-option'>
            <ManageSubs color="white" />
            <p className='profile-option-text'>Manage Subscription</p>
          </div>
          <div className='profile-option'>
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
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
