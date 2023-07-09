import React from 'react'
import './bookCard.css'
import sliderImage from '../../assets/dr_image.png'
import { useNavigate } from 'react-router-dom'

const BookCard = ({ image, Name, Profession }) => {
  const navigate = useNavigate();
  return (
    <div className='book-card-container'
      onClick={() => {
        navigate("/therapy/appointment", { state: { image, Name, Profession } });
      }}>
      <img src={image ? image : sliderImage} alt='' className='book-card-image' />
      <div className='BookCardDetails'>
        <p className='BookCardHeading'>{Name ? Name : "Dr.  Ignacio Hettinger"}</p>
        <p className='BookSubCardHeading'>{Profession ? Profession : "Adult Psychiatrist"}</p>
        <button className='BookButton'>Book now</button>
      </div>
    </div>
  )
}

export default BookCard