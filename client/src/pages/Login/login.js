import { useContext, useState } from 'react';
import './login.css';
import { AuthContext } from '../../Context/authContext';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { baseURL } from '../../baseURL/baseURL';
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaFacebook } from "react-icons/fa";
import { auth, provider } from '../../components/GoogleAuth/googleAuth';
import { signInWithPopup } from "firebase/auth";
import logo from '../../assets/logo.png'

const Login = () => {
    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
    });

    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const navigate = useNavigate();
    const { loading, error, dispatch } = useContext(AuthContext);

    const handleLogin = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGIN_START" });
        try {
            const res = await axios.post(`${baseURL}/auth/login`, credentials);
            // console.log(res.data);
            if (res.data.success) {
                localStorage.setItem("access_token", res.data.access_token);
                try {
                    const userInfo = await axios.get(`${baseURL}/user/userInfo/${res.data.access_token}/${res.data.userId}`);
                    dispatch({ type: "LOGIN_SUCCESS", payload: userInfo.data });
                    // console.log(userInfo.data);
                    navigate('/');
                } catch (error) {
                    console.log(error);
                }
            }

        } catch (error) {
            dispatch({ type: "LOGIN_FAILURE", payload: error.response.data });
            console.log(error);
        }
    };

    const handleGoogleLogin = async (e) => {
        e.preventDefault();
        try {
            const result = await signInWithPopup(auth, provider);
            if (result.user) {
                dispatch({ type: "LOGIN_START" });
                try {
                    const res = await axios.post(`${baseURL}/auth/login`, {
                        email: result.user.email,
                        password: result.user.uid
                    });
                    if (res.data.success) {
                        localStorage.setItem("access_token", res.data.access_token);
                        try {
                            const userInfo = await axios.get(`${baseURL}/user/userInfo/${res.data.access_token}/${res.data.userId}`);
                            dispatch({ type: "LOGIN_SUCCESS", payload: userInfo.data });
                            console.log(userInfo.data);
                            navigate('/');
                        } catch (error) {
                            console.log(error);
                        }
                    }

                } catch (error) {
                    dispatch({ type: "LOGIN_FAILURE", payload: error.response.data });
                    console.log(error);
                }
            }
        } catch (error) {
            console.log('Error signing in with Google:', error.code, error.message);
        }
    };


    return (
        <div className='signup-container'>
            <div className='navBar-row'>
                <img src={logo} alt='' onClick={() => navigate('/')} />
                <Link to='/signUp' className='auth-link SignUp-btn'>
                    Sign Up
                </Link>
            </div>
            <div className='signup-box'>
                <div className='signup-column'>
                    <p className='signup-title'>Welcome</p>
                    <div style={{ height: "35px" }}></div>
                    <div className='icon-box-row'>
                        <div className='icon-box'><FaApple /></div>
                        <button className='icon-box-button' onClick={handleGoogleLogin}><FcGoogle /></button>
                        <div className='icon-box'><FaFacebook style={{ color: "#1778F2" }} /></div>
                    </div>
                    <div className='seperator-row'>
                        <div className='seperator'></div>
                        <div className='seperator-text'>Or continue with</div>
                        <div className='seperator'></div>
                    </div>
                    <div className='bottom-container'>
                        <input onChange={handleChange} type='text' placeholder='Username' className='signup-input' id='username' />
                        <input onChange={handleChange} type='password' placeholder='Enter Password' className='signup-input' id='password' />
                        {error && <span className='signup-error-message'>{error.message}</span>}
                        <button disabled={loading} onClick={handleLogin} className='signup-btn'>Sign in</button>
                        <p className='tnc-lines'>By continuining, you agree to Peace+ <b><u>Terms & Conditions</u></b></p>
                        <p className='tnc-lines'>and <b><u>Privacy Policy</u></b></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login