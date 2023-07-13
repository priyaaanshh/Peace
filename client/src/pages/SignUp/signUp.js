import { useContext, useState } from 'react';
import './signUp.css';
import axios from 'axios';
import { baseURL } from '../../baseURL/baseURL';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../Context/authContext';
import { BsGlobe } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaFacebook } from "react-icons/fa";
import { auth, provider } from '../../components/GoogleAuth/googleAuth';
import { signInWithPopup } from "firebase/auth";
import logo from '../../assets/logo.png'

const SignUp = () => {
    const [signupData, setSignupData] = useState({
        username: '',
        email: '',
        password: '',
        profilePicture: 'https://yt3.ggpht.com/a/AATXAJwFy0FRrVodxUiLPk3ldEEYFjjzpUDV2FeGAw=s900-c-k-c0xffffffff-no-rj-mo',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignupData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        console.log(signupData);
    };

    const navigate = useNavigate();
    const { error, dispatch } = useContext(AuthContext);

    const handleGoogleSignUp = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            // Handle successful sign-in here
            // console.log('Successful sign-in:', result.user.displayName, result.user.email, result.user.uid);

            // creating a unique username 
            const formattedName = result.user.displayName.trim().toLowerCase();
            const username = formattedName.replace(/\s+/g, '_');
            const uniqueUsername = `${username}_${Math.floor(Math.random() * 38454)}`;

            // console.log(uniqueUsername);


            if (result.user) {
                console.log(result)
                dispatch({ type: 'LOGIN_START' });
                try {
                    const res = await axios.post(`${baseURL}/auth/register`, {
                        username: uniqueUsername,
                        email: result.user.email,
                        password: result.user.uid,
                        profilePicture: result.user.photoURL,
                        name: result.user.displayName
                    });

                    if (res.data !== undefined && res.data?.success) {
                        localStorage.setItem('access_token', res.data?.access_token);
                        try {
                            const userInfo = await axios.get(`${baseURL}/user/userInfo/${res.data?.access_token}/${res.data?.userId}`);
                            dispatch({ type: 'LOGIN_SUCCESS', payload: userInfo?.data });
                            navigate('/');
                        } catch (error) {
                            console.log(error);
                        }
                    }
                    navigate('/onBoarding');
                } catch (error) {
                    dispatch({ type: 'LOGIN_FAILURE', payload: error.response.data });
                    console.log(error);
                }
            }
        } catch (error) {
            // Handle error here
            console.log('Error signing in with Google:', error.code, error.message);
        }
    }


    const handleSignup = async () => {
        dispatch({ type: 'LOGIN_START' });
        try {

            const res = await axios.post(`${baseURL}/auth/register`, signupData);

            if (res.data !== undefined && res.data?.success) {
                localStorage.setItem('access_token', res.data?.access_token);
                try {
                    const userInfo = await axios.get(`${baseURL}/user/userInfo/${res.data?.access_token}/${res.data?.userId}`);
                    dispatch({ type: 'LOGIN_SUCCESS', payload: userInfo?.data });
                    navigate('/onBoarding');
                } catch (error) {
                    console.log(error);
                }
            }
        } catch (error) {
            dispatch({ type: 'LOGIN_FAILURE', payload: error.response.data });
            console.log(error);
        }
    };

    return (
        <div className='signup-container'>
            <div className='navBar-row'>
                <img src={logo} alt='' onClick={() => navigate('/')} />
                <Link to='/login' className='auth-link'>
                    <BsGlobe />
                    Sign In
                </Link>
            </div>
            <div className='signup-box'>
                <div className='signup-column'>
                    <p className='signup-title'>Inspiring Mood,</p>
                    <p className='signup-title'>Elevating Minds</p>
                    <div className='signup-subtitle'>
                        <p>Get</p>
                        <p id='blue-line'>30 free days</p>
                        <p>of Peace+</p>
                    </div>
                    <div className='icon-box-row'>
                        <div className='icon-box'><FaApple /></div>
                        <button className='icon-box-button' onClick={handleGoogleSignUp}><FcGoogle /></button>
                        <div className='icon-box'><FaFacebook style={{ color: "#1778F2" }} /></div>
                    </div>
                    <div className='seperator-row'>
                        <div className='seperator'></div>
                        <div className='seperator-text'>Or continue with</div>
                        <div className='seperator'></div>
                    </div>
                    <div className='bottom-container'>
                        <input onChange={handleChange} type='text' placeholder='Username' className='signup-input' name='username' id='username' />
                        <input onChange={handleChange} type='email' placeholder='Email Address' className='signup-input' name='email' id='email' />
                        <input onChange={handleChange} type='password' placeholder='Enter Password' className='signup-input' name='password' id='password' />
                        {error && <span className='signup-error-message'>{error.message}</span>}
                        <button onClick={handleSignup} className='signup-btn'>Get Inspired Today</button>
                        <p className='tnc-lines'>By continuining, you agree to Peace+ <b><u>Terms & Conditions</u></b></p>
                        <p className='tnc-lines'>and <b><u>Privacy Policy</u></b></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
