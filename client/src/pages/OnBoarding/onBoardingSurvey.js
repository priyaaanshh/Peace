import React, { useState } from 'react'
import './onBoarding.css'
import Back from '../../assets/svg/back';
import { useNavigate } from 'react-router-dom';
import girlpeaceful from '../../assets/girlpeaceful.png'
import page4img from '../../assets/page4-img.png'

const OnBoardingSurvey = () => {
    const navigate = useNavigate();
    const [pageNum, setPageNum] = useState(0);
    const [pageOneText, setPageOneText] = useState("");
    const [selectedText, setSelectedText] = useState("Good");
    const goBack = () => {
        if (pageNum <= 0) {
            navigate(-1);
        } else {
            setPageNum(pageNum - 1);
        }
        if (pageNum === 1) {
            setSelectedText("Good");
        }
        if (pageNum === 2) {
            setSelectedText(pageOneText);
        }
        if (pageNum === 3) {
            setSelectedText("None");
        }
    }
    return (
        <div className={`OnBoardingSurvey-page-container ${pageNum < 2 ? "OnBoardingSurvey-page-bg1" : "OnBoardingSurvey-page-bg2"}`}>
            <div className='onboarding-back-btn'>
                <button className='onboarding-back-btn' onClick={() => goBack()}><Back color="black" /></button>
            </div>
            <div className='onboarding-left-container'>
                <div className='onboarding-left-column'>
                    {pageNum <= 1 ? <>
                        <p className='onboarding-question'>How have you been feeling lately?</p>

                        <div></div>

                        <button className={`onboarding-btn ${pageNum === 1 ? "onboarding-btn-selected" : ""}`} onClick={() => { setPageNum(1); }}>
                            <p className={`onboarding-btn-text ${pageNum === 1 ? "onboarding-btn-text-selected" : ""}`}>{selectedText}</p>
                        </button>
                        {pageNum === 0 ? <>
                            <button className="onboarding-btn" onClick={() => { setPageNum(1); setSelectedText("Stressed") }}>
                                <p className="onboarding-btn-text">Stressed</p>
                            </button>

                            <button className="onboarding-btn" onClick={() => { setPageNum(1); setSelectedText("Sad") }}>
                                <p className="onboarding-btn-text">Sad</p>
                            </button>

                            <button className="onboarding-btn" onClick={() => { setPageNum(1); setSelectedText("Indifferent") }}>
                                <p className="onboarding-btn-text">Indifferent</p>
                            </button>
                        </> : <></>
                        }
                        {pageNum === 1 ? <>
                            <p className='onboarding-main-heading'>That's OK</p>
                            <p className='onboarding-sub-heading'>Recognizing how you feel is an important part of mindfulness, so we’ll keep checking in with you.</p>
                            <div className='onboarding-column-img-container'>
                                <img src={girlpeaceful} alt='' /></div>

                            <button onClick={() => { setPageOneText(selectedText); setPageNum(2); setSelectedText("None"); }} className="onboarding-btn-continue continue-btn-selected">
                                Continue
                            </button>
                        </> : <></>}
                    </> :
                        <>
                            <p className='onboarding-question'>What's your experience with meditation ?</p>

                            <div></div>

                            <button className={`onboarding-btn ${pageNum === 3 ? "onboarding-btn-selected" : ""}`} onClick={() => { setPageNum(3); }}>
                                <p className={`onboarding-btn-text ${pageNum === 3 ? "onboarding-btn-text-selected" : ""}`}>{selectedText}</p>
                            </button>
                            {pageNum === 2 ? <>
                                <button className="onboarding-btn" onClick={() => { setPageNum(3); setSelectedText("I’ve tried it a few times") }}>
                                    <p className="onboarding-btn-text">I’ve tried it a few times</p>
                                </button>

                                <button className="onboarding-btn" onClick={() => { setPageNum(3); setSelectedText("I’ve meditated a lot") }}>
                                    <p className="onboarding-btn-text">I’ve meditated a lot</p>
                                </button>
                            </> : <></>
                            }
                            {pageNum === 3 ? <>
                                <p className='onboarding-sub-heading'>Congrats on taking your first step to a happier and healthier you.</p>
                                <p className='onboarding-sub-heading'>We’ll make it easy for you to learn the basics of meditation.</p>
                                <div className='onboarding-column-img-container'>
                                    <img src={page4img} alt='' /></div>

                                <button onClick={() => { navigate('/payment') }} className="onboarding-btn-continue continue-btn-selected">
                                    Continue
                                </button>
                            </> : <></>}
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

export default OnBoardingSurvey