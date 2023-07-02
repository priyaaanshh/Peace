import React from 'react'
import './bookCard.css'
import sliderImage from '../../assets/dr_image.png'

const BookCard = () => {
  return (
    <div className='book-card-container'>
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