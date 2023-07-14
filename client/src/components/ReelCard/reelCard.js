import React from 'react'
import { useNavigate } from 'react-router-dom';
import './reelCard.css'
import defaultImage from '../../assets/onboard-survey-bg2.png'

const ReelCard = ({ image ,songs}) => {
    const navigate = useNavigate();
    return (
        <div className='reel-card-container' onClick={() => navigate('/player', { state: { image, CardHeading: "Quick & Easy",songs } })}>
            <img src={image ? image : defaultImage} alt='' className='reel-card-image' />
            <div className='reel-card-buttons'>
                <div className='reel-card-time'>11 min</div>
                <div className='reel-card-new'>New</div>
            </div>
        </div>
    )
}

export default ReelCard