import React from 'react'
import './sliderTile.css'
import sliderImage from '../../assets/default-slider-img.png'

const SliderTile = ({ image, CardHeading, CardSubHeading1, CardSubHeading2, CardSubHeading3, CardSubHeading4, }) => {
    return (
        <div className='SliderTile'>
            <img src={image ? image : sliderImage} alt='' className='SliderTileImg' />
            <div className='SliderDetails'>
                <p className='SliderHeading'>{CardHeading ? CardHeading : "Daily Trip"}</p>
                <div className='SliderDetailRow'>
                    <p className='SliderTileSubHeading'>{CardSubHeading1 ? CardSubHeading1 : "Meditation"} </p>
                    <div></div>
                    <p className='SliderTileSubHeading'>{CardSubHeading2 ? CardSubHeading2 : "Tamara Levitt"}</p>
                </div>
                <div className='SliderDetailRow'>
                    <p className='SliderTileSubHeading'>{CardSubHeading3 ? CardSubHeading3 : "Aug 18"}</p>
                    <div></div>
                    <p className='SliderTileSubHeading'>{CardSubHeading4 ? CardSubHeading4 : "Patience"}</p>
                </div>
            </div>
        </div>
    )
}

export default SliderTile