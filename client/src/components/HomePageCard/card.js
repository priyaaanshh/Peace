import React from 'react'
import './card.css'
import sliderImage from '../../assets/default-slider-img.png'
import { useNavigate } from 'react-router-dom'

const Card = ({ image, CardHeading, CardSubHeading1, CardSubHeading2, CardSubHeading3, CardSubHeading4, }) => {
    const navigate = useNavigate();
    return (
        <div className='card-container' onClick={() => navigate('/player', { state: { image, CardHeading, CardSubHeading2, CardSubHeading4 } })}>
            <img src={image ? image : sliderImage} alt='' className='card-image' />
            <div className='CardDetails'>
                <p className='CardHeading'>{CardHeading ? CardHeading : "Daily Trip"}</p>
                <div className='CardDetailRow'>
                    <p className='CardTileSubHeading'>{CardSubHeading1 ? CardSubHeading1 : "Meditation"} </p>
                    <div></div>
                    <p className='CardTileSubHeading'>{CardSubHeading2 ? CardSubHeading2 : "Tamara Levitt"}</p>
                </div>
                <div className='CardDetailRow'>
                    <p className='CardTileSubHeading'>{CardSubHeading3 ? CardSubHeading3 : "Aug 18"}</p>
                    <div></div>
                    <p className='CardTileSubHeading'>{CardSubHeading4 ? CardSubHeading4 : "Patience"}</p>
                </div>
            </div>
            <div className='card-time'>11 min</div>
        </div>
    )
}

export default Card