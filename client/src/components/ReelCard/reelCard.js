import React from 'react'
import './reelCard.css'
import defaultImage from '../../assets/onboard-survey-bg2.png'

const ReelCard = ({ image }) => {
    return (
        <div className='reel-card-container'>
            <img src={image ? image : defaultImage} alt='' className='reel-card-image' />
           <div className='reel-card-buttons'>
                <div className='reel-card-time'>11 min</div>
                <div className='reel-card-new'>New</div>
            </div>
        </div>
    )
}

export default ReelCard