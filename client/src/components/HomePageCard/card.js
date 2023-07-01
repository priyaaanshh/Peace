import React from 'react'
import './card.css'
import sliderImage from '../../assets/default-slider-img.png'

const Card = () => {
    return (
        <div className='card-container'>
            <img src={sliderImage} alt='' className='card-image' />
            <div className='CardDetails'>
                <p className='CardHeading'>Daily Trip</p>
                <div className='CardDetailRow'>
                    <p className='CardTileSubHeading'>Meditation </p>
                    <div></div>
                    <p className='CardTileSubHeading'>Tamara Levitt</p>
                </div>
                <div className='CardDetailRow'>
                    <p className='CardTileSubHeading'>Aug 18</p>
                    <div></div>
                    <p className='CardTileSubHeading'>Patience</p>
                </div>
            </div>
            <div className='card-time'>11 min</div>
        </div>
    )
}

export default Card