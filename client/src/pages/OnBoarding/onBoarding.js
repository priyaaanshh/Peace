import React, { useState } from 'react'
import './onBoarding.css'
import logo from '../../assets/logo.png'
import BookOpened from '../../assets/svg/book opened.js'
import DotMenu from '../../assets/svg/dot menu'
import Leaf from '../../assets/svg/leaf'
import Sleep from '../../assets/svg/sleep'
import Drop from '../../assets/svg/water drop'
import { useNavigate } from 'react-router-dom'

const OnBoarding = () => {
    const navigate = useNavigate();
    const [selected, setSelected] = useState(false);
    const [selectedOption, setSelectedOption] = useState(0);
    const onSelect = (option) => {
        setSelected(true);
        if (option === selectedOption) {
            option = 0;
            setSelected(false);
        }
        setSelectedOption(option);
    }
    const handleContinue = () => {
        if (selected) {
            navigate('/onBoarding/continue');
        }
    }
    return (
        <div className='onboarding-page'>
            <div className='onboarding-logo'>
                <img src={logo} alt='' />
            </div>
            <div className='onboarding-left-container'>
                <div className='onboarding-left-column'>
                    <p className='onboarding-main-heading'>Find Your Peace</p>
                    <p className='onboarding-sub-heading'>Our goal is to help you improve your health and happiness</p>
                    <p className='onboarding-question'>What we can help with today?</p>

                    <button className={`onboarding-btn ${selectedOption === 1 ? "onboarding-btn-selected" : ""}`} onClick={() => onSelect(1)}>
                        <Sleep color={`${selectedOption === 1 ? "black" : "white"}`} />
                        <p className={`onboarding-btn-text ${selectedOption === 1 ? "onboarding-btn-text-selected" : ""}`}>Improve Sleep Quality</p>
                    </button>

                    <button className={`onboarding-btn ${selectedOption === 2 ? "onboarding-btn-selected" : ""}`} onClick={() => onSelect(2)}>
                        <Drop color={`${selectedOption === 2 ? "black" : "white"}`} />
                        <p className={`onboarding-btn-text ${selectedOption === 2 ? "onboarding-btn-text-selected" : ""}`}>Reduce stress or anxiety</p>
                    </button>

                    <button className={`onboarding-btn ${selectedOption === 3 ? "onboarding-btn-selected" : ""}`} onClick={() => onSelect(3)}>
                        <BookOpened color={`${selectedOption === 3 ? "black" : "white"}`} />
                        <p className={`onboarding-btn-text ${selectedOption === 3 ? "onboarding-btn-text-selected" : ""}`}>Improve focus</p>
                    </button>

                    <button className={`onboarding-btn ${selectedOption === 4 ? "onboarding-btn-selected" : ""}`} onClick={() => onSelect(4)}>
                        <Leaf color={`${selectedOption === 4 ? "black" : "white"}`} />
                        <p className={`onboarding-btn-text ${selectedOption === 4 ? "onboarding-btn-text-selected" : ""}`}>Self improvement</p>
                    </button>

                    <button className={`onboarding-btn ${selectedOption === 5 ? "onboarding-btn-selected" : ""}`} onClick={() => onSelect(5)}>
                        <DotMenu color={`${selectedOption === 5 ? "black" : "white"}`} />
                        <p className={`onboarding-btn-text ${selectedOption === 5 ? "onboarding-btn-text-selected" : ""}`}>Something Else</p>
                    </button>

                    <button onClick={() => handleContinue()} className={`onboarding-btn-continue ${selected ? "continue-btn-selected" : "continue-btn-unselected"}`}>
                        Continue
                    </button>

                    <button className='onboarding-btn-skip' onClick={() => { navigate('/'); }}>
                        Skip for now
                    </button>
                </div>
            </div>
        </div>
    )
}

export default OnBoarding