import React from 'react'

const Leaf = ({ color }) => {
    return (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="leaf">
            <path id="Icon" d="M4 19.9999C4.2963 18.074 6.31111 13.7777 12 11.9999M9 18.3743C10.4425 19.101 12.9582 19.5329 15.474 17.7067C19.9028 14.4916 20.3861 8.34084 19.7976 4.72059C19.741 4.37251 19.3452 4.21686 19.055 4.41727C17.8519 5.24815 16.5291 6.07022 14 5.99993C11.7604 5.93769 9.39681 5.6368 7.5 6.99993C5.26335 8.60728 4.86429 10.3665 5.0599 11.9999C5.18458 12.5665 5.63189 13.7591 6.5 14.5954" stroke={color} strokeWidth="2" strokeLinecap="round" />
        </g>
    </svg>

    )
}

export default Leaf