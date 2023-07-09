import React, { useState } from 'react'
import './PaymentPage.css'
import PaymentBG from '../../assets/PaymentBG.jpg'
import { FaCheckCircle, FaChevronDown } from 'react-icons/fa';
import { BsCreditCard2Back } from 'react-icons/bs';
import { ReactComponent as Icon1 } from '../../assets/svg/Card Svg/1.svg'
import { ReactComponent as Icon2 } from '../../assets/svg/Card Svg/2.svg'
import { ReactComponent as Icon3 } from '../../assets/svg/Card Svg/3.svg'
import { ReactComponent as Icon4 } from '../../assets/svg/Card Svg/4.svg'
import { useNavigate } from 'react-router-dom';


const PaymentPage = () => {
    const navigate = useNavigate();
    const [contentNum, setContentNum] = useState(1);
    return (
        <div className='PaymentPage-container'>
            <div className='Payment-page'>
                <div className='content-1'>
                    <div className='top-badge'>Limited Time Offer</div>
                    <div className='top-heading'>Try Peace+ premium for 30 days</div>
                    <div style={{ height: "45px" }}></div>
                    <div className='payment-page-seperator-line'></div>
                    <div className='content'>
                        <div className='top-subHeading'>Included in your basic membership</div>
                        <div className='top-content-line'>
                            <FaCheckCircle color='#113F67' size='20px' />
                            <div className='top-content-text'>Included in your basic membership</div>
                        </div>
                    </div>
                    <div className='payment-page-seperator-line'></div>
                    <div className='content'>
                        <div className='top-subHeading'>Your premium membership includes</div>
                        <div className='top-content-line'>
                            <FaCheckCircle color='#113F67' size='20px' />
                            <div className='top-content-text'>Unlimited access to content</div>
                        </div>
                        <div className='top-content-line'>
                            <FaCheckCircle color='#113F67' size='20px' />
                            <div className='top-content-text'>100+ guided meditations</div>
                        </div>
                        <div className='top-content-line'>
                            <FaCheckCircle color='#113F67' size='20px' />
                            <div className='top-content-text'>Schedule Therapy Sessions</div>
                        </div>
                        <div className='top-content-line'>
                            <FaCheckCircle color='#113F67' size='20px' />
                            <div className='top-content-text'>Self Assessment Mood/ Health Tracker</div>
                        </div>
                        <div className='top-content-line'>
                            <FaCheckCircle color='#113F67' size='20px' />
                            <div className='top-content-text'>Social Forum</div>
                        </div>
                        <div className='top-content-line'>
                            <FaCheckCircle color='#113F67' size='20px' />
                            <div className='top-content-text'>Journalling</div>
                        </div>
                        <div className='top-content-line'>
                            <FaCheckCircle color='#113F67' size='20px' />
                            <div className='top-content-text'>Cancel anytime</div>
                        </div>
                        {contentNum === 1 ? <div style={{ height: "100px" }}></div> : <></>}
                        {contentNum === 1 ? <div className='doctorPage-submit-btn' onClick={() => setContentNum(2)}>Continue</div> : <></>}
                    </div>
                    {contentNum >= 2 ? <div className='other-bottom-content '>
                        <div className='top-heading'>Start your free 30-day trail</div>
                        <div>No commitment. Cancel anytime.</div>
                        <div style={{ height: "30px" }}></div>
                        <div className='payment-page-seperator-line'></div>
                        <div className='cost-table'>
                            <div className='table-rows'>
                                <div><b>Total due today*</b></div>
                                <div><b>GBP 0.00</b></div>
                            </div>
                            <div className='table-rows'>
                                <div>Cost per month</div>
                                <div>GBP 0.00</div>
                            </div>
                        </div>
                        <div className='payment-page-seperator-line'></div>


                        <div className='left-heading'>Payment details</div>
                        {contentNum === 2 ? <div className='left-subheading'>Choose a payment method</div> : <></>}
                        {contentNum === 2 ? <div className='openCardBtn'
                            onClick={() => setContentNum(3)}
                        >
                            <BsCreditCard2Back color='black' />
                            <div>Credit or Debit Card</div>
                        </div> : <></>}
                    </div> : <></>}

                    {contentNum >= 3 ? <div className='other-bottom-content '>
                        <div className='card-details'>
                            <div className='card-inout-container'>
                                <div className='card-input-label'>Card number</div>
                                <div className='card-input-'>
                                    <input placeholder='1234 1234 1234 1234' />
                                    <div className='input-icons'>
                                        <Icon1 />
                                        <Icon2 />
                                        <Icon3 />
                                        <Icon4 />
                                    </div>
                                </div>
                            </div>
                            <div className='card-input-row'>
                                <div className='card-inout-container'>
                                    <div className='card-input-label'>Expiry</div>
                                    <div className='card-input-'>
                                        <input placeholder='MM / YY' />
                                        <div className='input-icons'></div>
                                    </div>
                                </div>
                                <div className='card-inout-container'>
                                    <div className='card-input-label'>CVC</div>
                                    <div className='card-input-'>
                                        <input placeholder='CVC' />
                                        <div className='input-icons'></div>
                                    </div>
                                </div>
                            </div>
                            <div className='card-input-row'>
                                <div className='card-inout-container'>
                                    <div className='card-input-label'>Country</div>
                                    <div className='card-input-'>
                                        <input placeholder='United Kingdom' id='card-location' readOnly />
                                        <div className='input-icons'><FaChevronDown /></div>
                                    </div>
                                </div>
                                <div className='card-inout-container'>
                                    <div className='card-input-label'>Postal code</div>
                                    <div className='card-input-'>
                                        <input placeholder='90210' />
                                        <div className='input-icons'></div>
                                    </div>
                                </div>
                            </div>

                            {contentNum === 3 ? <div style={{ height: "20px" }}></div> : <></>}
                            {contentNum === 3 ? <div className='doctorPage-submit-btn' onClick={() => navigate('/')}>Start Free Trial</div> : <></>}
                        </div>
                    </div> : <></>}
                </div>
            </div>
            <img src={PaymentBG} alt='' className='PaymentBG' />
        </div>
    )
}

export default PaymentPage