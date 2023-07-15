import React, { useState } from 'react'
import './doctorProfile.css';
import { Component } from "react";
import Slider from "react-slick";
import Back from '../../assets/svg/back';
import { useLocation, useNavigate } from 'react-router-dom';
import userImage from '../../assets/dr_image.png'
import { ReactComponent as StartRating } from '../../assets/svg/star rating.svg';

const todayDate = new Date();
const options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };
const todayFormattedDate = todayDate.toLocaleDateString('en-US', options);
let selectedDate = todayFormattedDate;
const username = JSON.parse(localStorage.getItem("user"))?.username;
const slots = [
    "",
    "07:00 AM",
    "07:30 AM",
    "08:00 AM",
    "08:30 AM",
    "09:00 AM",
    "09:30 AM",
    "10:00 AM",
    "10:30 AM",
    "06:00 PM",
    "06:30 PM",
    "07:00 PM",
    "07:30 PM",
    "08:00 PM",
    "08:30 PM",
    "09:00 PM",
    "09:30 PM",
    "10:00 PM",
    "10:30 PM",
];

const DoctorProfile = () => {
    const location = useLocation().state;
    const [popUpPages, setPopUpPages] = useState(0);
    const [selectedSlot, setSelectedSlot] = useState(0);
    const [doctorName, setDoctorName] = useState("Dr. Ignacio Hettinger");

    const selectSlot = (slotNum) => {
        setSelectedSlot(prevSlot => (prevSlot === slotNum ? 0 : slotNum));
    };

    const handleSubmitSlot = () => {
        if (selectedSlot !== 0) {
            setPopUpPages(2);
            setTimeout(() => {
                navigate('/');
                setSelectedSlot(0);
            }, 5000);
        }
    };

    const navigate = useNavigate();
    const getDateOnConsole = () => {
        setPopUpPages(1);
    };

    return (
        <div className='doctorProfilePage user-profile-page-container'>
            {popUpPages === 0 && (
                <div className='user-profile-page doctorProfileBG'>
                    <div className='navbar'>
                        <div className='back-btn'>
                            <button className='back-btn' onClick={() => navigate(-1)}>
                                <Back color="black" />
                            </button>
                        </div>
                    </div>
                    <div className='doctorProfile'>
                        <div className='user-profile-img'>
                            <img src={location?.image ? location?.image : userImage} alt='' />
                        </div>
                        <p className='doctorName'>{location?.Name ? location?.Name : doctorName}</p>
                        <p className='doctorProffesion'>Clinical psychologist</p>

                        <div className='doctorDetailsRow'>
                            <div className='row-box'>
                                <div className='detail-sub-heading'>Paitent</div>
                                <div className='detail-heading'>100+</div>
                            </div>
                            <div className='row-box'>
                                <div className='detail-sub-heading'>Experiences</div>
                                <div className='detail-heading'>10 years</div>
                            </div>
                            <div className='row-box'>
                                <div className='detail-sub-heading'>Rating</div>
                                <div className='detail-heading'>4.0</div>
                            </div>
                        </div>

                        <div className='doctor-detail-text-box'>
                            <p>
                                <b>{location?.Name ? location?.Name : doctorName}</b> is a leading {location?.Profession ? location?.Profession : "psychiatrist"} based at The London Medical Specialist Clinic, who specializes in psychosis, depression, self-harm, psychotherapy, suicidal thoughts, bipolar illness, and personality disorders. <b>{location?.Name ? location?.Name : doctorName} received her medical training and doctorate in psychiatry from the University of Rome in Italy. She has extensive clinical and research experience from both the USA and Europe. She has worked as a clinical lecturer at King's College's Institute of Psychiatry Maudsley Hospital since 2008. There, she conducts research on individuals who have experienced their first psychotic episode with a particular interest in metabolic anomalies, childhood maltreatment, and sexual function. She also has experience from her time spent caring for individuals with severe mental illness who were experiencing psychosis at the National Psychosis Unit. After serving as a consultant psychiatrist for an inpatient facility housing females who were at a high risk of self-harm and suicide, Dr Ignacio has extensive expertise working with patients who suffer from personality disorders.</b> She also deals with patients affected by anxiety and depression. <b>{location?.Name ? location?.Name : doctorName}</b> has collaborated with the Italian health services to repatriate numerous citizens with mental health-related difficulties.
                            </p>
                        </div>

                        <div className='reviewHeading'>Review (126)</div>

                        <div className='doctor-detail-text-box customerReview-box'>
                            <div className='customerReview'>
                                <img src='https://i.pinimg.com/originals/7e/50/c1/7e50c1e9a5af3f7777b96569f05b6958.jpg' alt='' className='customerImg' />
                                <div className='cutromerNameColumn'>
                                    <p>Elizabeth Feil</p>
                                    <StartRating />
                                </div>
                            </div>
                            <p>
                                <b>{location?.Name ? location?.Name : doctorName}</b> is an excellent {location?.Profession ? location?.Profession : "psychiatrist"}. <b>{location?.Name ? location?.Name : doctorName}</b> was very supportive. Creating a comfortable and safe environment during the consultations was so helpful in coming to terms with things. Her explanations were excellent, encouraging you to think and consider wider aspects of your life. <b>Would definitely recommend her.</b>
                            </p>
                        </div>
                        <button className='doctorProfile-btn' onClick={getDateOnConsole}>Next</button>
                    </div>
                </div>
            )}

            {popUpPages === 1 && (
                <div className='session-book-page-container'>
                    <div className='session-book-page'>
                        <div className='navbar'>
                            <div className='back-btn'>
                                <button className='back-btn' onClick={() => setPopUpPages(0)}>
                                    <Back color="black" />
                                </button>
                            </div>
                        </div>
                        <div className='session-book-card '>
                            <div className='card-Box'>
                                <div className='date-picker'>
                                    <DatePicker handleSliderChange={(index) => { selectedDate = datesArray[index]; }} />
                                </div>
                                <div className='partition-line'></div>
                                <p className='session-card-slot'>Morning</p>
                                <div className='slot-container'>
                                    {slots.slice(1, 9).map((slot, index) => (
                                        <div
                                            key={index + 1}
                                            onClick={() => selectSlot(index + 1)}
                                            className={`slot ${selectedSlot === index + 1 ? "selected-slot" : ""}`}
                                        >
                                            {slot}
                                        </div>
                                    ))}
                                </div>
                                <p className='session-card-slot'>Evening</p>
                                <div className='slot-container'>
                                    {slots.slice(9, 17).map((slot, index) => (
                                        <div
                                            key={index + 9}
                                            onClick={() => selectSlot(index + 9)}
                                            className={`slot ${selectedSlot === index + 9 ? "selected-slot" : ""}`}
                                        >
                                            {slot}
                                        </div>
                                    ))}
                                </div>
                                <div className='doctorPage-submit-btn' onClick={handleSubmitSlot}>Submit</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {popUpPages === 2 && (
                <div className='session-book-page-container'>
                    <div className='session-book-page'>
                        <div className='navbar'>
                            <div className='back-btn'>
                                <button className='back-btn' onClick={() => setPopUpPages(1)}>
                                    <Back color="black" />
                                </button>
                            </div>
                        </div>
                        <div className='session-book-card '>
                            <div className='card-Box-booked-slot-details'>
                                <p>Dear {username ? username : ""},</p>
                                <p>We've booked you a visit at XYZ Clinic</p>
                                <div>
                                    <p>Here are the details: Doctor/Staff:</p>
                                    <b>{location?.Name ? location?.Name : doctorName}</b>
                                </div>
                                <div>
                                    <p>Purpose: Consultation</p>
                                    <p>Date: {selectedDate}</p>
                                </div>
                                <div>
                                    <p>Serial no: 28</p>
                                    <p>Reporting time: {slots[selectedSlot]}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DoctorProfile;

const datesArray = [];
class DatePicker extends Component {
    handleSliderChange = (index) => {
        selectedDate = datesArray[index];
        // console.log(selectedDate);
        // Perform any additional actions based on the selected page index
    };
    render() {
        const settings = {
            className: "center",
            centerMode: true,
            infinite: false,
            centerPadding: "60px",
            slidesToShow: 3,
            speed: 150,
            afterChange: this.handleSliderChange,
        };
        const numberOfDays = 380;
        for (let i = 0; i <= numberOfDays; i++) {
            const currentDate = new Date();
            currentDate.setDate(currentDate.getDate() + i);
            const formattedDate = currentDate.toLocaleDateString('en-US', options);
            datesArray.push(formattedDate);
        }

        return (
            <div className="container">
                <link
                    rel="stylesheet"
                    type="text/css"
                    char-set="UTF-8"
                    href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
                />
                <link
                    rel="stylesheet"
                    type="text/css"
                    href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
                />
                <style>{cssstyle}</style>
                <Slider {...settings}>
                    {datesArray.map((date, index) => {

                        const day = date.split(', ')[0].charAt(0);
                        const dateValue = date.split(', ')[1];
                        const extractedDate = [day, dateValue.slice(-2)];

                        return (
                            <div key={index}>{
                                todayFormattedDate === date ?
                                    <h3>
                                        <div style={{
                                            fontSize: "26px",
                                        }}>{extractedDate[0]}</div>
                                        <div>{extractedDate[1]}</div>
                                    </h3>
                                    : <h3>
                                        <div style={{
                                            fontSize: "26px",
                                        }} >{extractedDate[0]}</div>
                                        <div>{extractedDate[1]}</div>
                                    </h3>
                            }
                            </div>
                        );
                    })}
                </Slider>
            </div>
        );
    }
}

const cssstyle = `
.container {
    margin:0 auto;
  max-width: 500px;
}

h3  {
    border-radius: 14.636px;
    background: #FFFFFF;
    box-shadow: 0px 0px 17.56268310546875px 0px rgba(0, 0, 0, 0.12);
    color: #000000;
    font-size: 36px;
    line-height: 50px;
    margin: 10px;
    padding: 2%;
    position: relative;
    text-align: center;
}
.slick-next:before, .slick-prev:before {
    color: #000;
}
.center .slick-center h3 {
    color: #ffffff;
    background: #000;
    opacity: 1;
    -ms-transform: scale(1.08);
    transform: scale(1.08);
}
.center h3 {
    transition: all .10s ease;
}


@media screen and (max-width: 768px){
.container {
  width: 280px;
}
h3{
    
    font-size: 26px;
}
}
`;
