import React from 'react'
import './bookCard.css'
import sliderImage from '../../assets/dr_image.png'
import { useNavigate } from 'react-router-dom'

const BookCard = () => {
  const navigate = useNavigate();
  return (
    <div className='book-card-container' onClick={() => { navigate("/therapy/appointment") }}>
          <img src={sliderImage} alt='' className='book-card-image' />
          <div className='BookCardDetails'>
              <p className='BookCardHeading'>Dr.  Ignacio Hettinger</p>
              <p className='BookSubCardHeading'>Adult Psychiatrist</p>
        <button className='BookButton'>Book now</button>
          </div>
      </div>
  )
}

export default BookCard