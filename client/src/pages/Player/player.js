import React from 'react';
import './player.css';
import { useLocation, useNavigate } from 'react-router-dom';
import userImage from '../../assets/PlayerImage.png';
import Back from '../../assets/svg/back';
import PlayerController from './playerController';



const defaultSongs = [
    'https://www.chosic.com/wp-content/uploads/2022/01/sugar-coat.mp3',
    'https://www.chosic.com/wp-content/uploads/2021/07/Embrace.mp3',
    'https://www.chosic.com/wp-content/uploads/2021/07/Embrace.mp3'
];

const Player = () => {
    const location = useLocation()?.state;
    const navigate = useNavigate();

    return (
        <div className="playerBG">
            <div className="playerPage">
                <div className="navbar" style={{ width: '95%' }}>
                    <div className="back-btn">
                        <button className="back-btn" onClick={() => navigate(-1)}>
                            <Back color="black" />
                        </button>
                    </div>
                </div>

                <div className="doctorProfile">
                    <div className="user-profile-img">
                        <img src={location?.image ? location?.image : userImage} alt="" />
                    </div>
                    <p className="playerTitle">{location?.CardHeading ? location?.CardHeading : "Daily Calm"}</p>
                    <p className="playerSubTitle">{location?.CardSubHeading4 ? location?.CardSubHeading4 : "Patience"}</p>

                    <div className="playerDetailsRow">
                        <div className="playerDetailBox">
                            <div className="playerSubTitle">Narrator</div>
                            <div>{location?.CardSubHeading2 ? location?.CardSubHeading2 : "Tammara Levitt"}</div>
                        </div>
                        <div className="playerDetailBox">
                            <div className="playerSubTitle">Author</div>
                            <div>{location?.CardSubHeading2 ? location?.CardSubHeading2 : "Tammara Levitt"}</div>
                        </div>
                    </div>


                </div>
                <div style={{ height: "50%" }}></div>
                <PlayerController songs={location?.songs?.length !== 0 ? location?.songs : defaultSongs} />
            </div>
        </div>
    );
};

export default Player;
