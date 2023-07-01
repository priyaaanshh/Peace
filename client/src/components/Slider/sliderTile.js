import React from 'react'
import './sliderTile.css'
import sliderImage from '../../assets/default-slider-img.png'

const SliderTile = () => {
    return (
        <div className='SliderTile'>
            <img src={sliderImage} alt='' className='SliderTileImg' />
            <div className='SliderDetails'>
                <p className='SliderHeading'>Daily Trip</p>
                <div className='SliderDetailRow'>
                    <p className='SliderTileSubHeading'>Meditation </p>
                    <div></div>
                    <p className='SliderTileSubHeading'>Tamara Levitt</p>
                </div>
                <div className='SliderDetailRow'>
                    <p className='SliderTileSubHeading'>Aug 18</p>
                    <div></div>
                    <p className='SliderTileSubHeading'>Patience</p>
                </div>
            </div>
        </div>
    )
}

export default SliderTile