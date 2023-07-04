import React, { useState, useEffect } from 'react';
import './calendar.css';

const CalendarComponent = ({ selectedNoteDate, setSelectedNoteDate }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [selectedDate, setSelectedDate] = useState(null);
    const [showTime, setShowTime] = useState('');

    useEffect(() => {
        generateCalendar(currentMonth, currentYear);
        const timer = setInterval(() => {
            const currentDate = new Date();
            const formattedTime = currentDate.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
            });
            setShowTime(formattedTime);
        }, 1000);

        return () => clearInterval(timer);
    }, [currentMonth, currentYear]);

    const isLeapYear = (year) =>
        (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

    const getFebDays = (year) => (isLeapYear(year) ? 29 : 28);

    const generateCalendar = (month, year) => {
        const daysOfMonth = [
            31,
            getFebDays(year),
            31,
            30,
            31,
            30,
            31,
            31,
            30,
            31,
            30,
            31,
        ];
        const currentDate = new Date();

        const calendarDays = [];
        const firstDay = new Date(year, month).getDay();

        for (let i = 0; i <= daysOfMonth[month] + firstDay - 1; i++) {
            const day = i - firstDay + 1;

            const isCurrentDate =
                day === currentDate.getDate() &&
                year === currentDate.getFullYear() &&
                month === currentDate.getMonth();

            const isSelectedDate = `${day}/${currentMonth + 1}/${currentYear}` === selectedNoteDate;

            calendarDays.push(
                <div
                    key={i}
                    className={`calendar-day ${isCurrentDate ? 'current-date' : ''
                        } ${isSelectedDate && day > 0 ? 'selected-date' : ''}`}
                    onClick={() => handleDateClick(day)}
                >
                    {day > 0 && day}
                </div>
            );
        }

        return calendarDays;
    };

    const handleDateClick = (day) => {
        if (day > 0) {
            setSelectedDate(day);
            setSelectedNoteDate(`${day}/${currentMonth + 1}/${currentYear}`);
        }
    };

    const handlePrevMonthClick = () => {
        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear((prevYear) => prevYear - 1);
        } else {
            setCurrentMonth((prevMonth) => prevMonth - 1);
        }
    };

    const handleNextMonthClick = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear((prevYear) => prevYear + 1);
        } else {
            setCurrentMonth((prevMonth) => prevMonth + 1);
        }
    };

    const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];

    const todayDate = new Date();
    const options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };
    const todayFormattedDate = todayDate.toLocaleDateString('en-US', options);

    return (
        <div className="calendar-wrapper">
            <div className="calendar">
                <div className="calendar-header">
                    <span className="month-picker" id="month-picker">
                        {monthNames[currentMonth]} {currentYear}
                    </span>
                    <div className="year-picker" id="year-picker">
                        <span className="year-change" id="pre-month" onClick={handlePrevMonthClick}>
                            &lt;
                        </span>
                        <span className="year-change" id="next-month" onClick={handleNextMonthClick}>
                            &gt;
                        </span>
                    </div>
                </div>
                <div className="calendar-body">
                    <div className="calendar-week-days">
                        <div>Su</div>
                        <div>Mo</div>
                        <div>Tu</div>
                        <div>We</div>
                        <div>Th</div>
                        <div>Fr</div>
                        <div>Sa</div>
                    </div>
                    <div className="calendar-days">{generateCalendar(currentMonth, currentYear)}</div>
                </div>
            </div>
            {showTime !== '' ? (
                <>
                    <div className="partition-line" style={{ border: '1px solid #DADADA' }}></div>
                    <div className="calendar-bottom-container">
                        <div className="calendar-bottom">
                            <div className="Today-text">TODAY</div>
                            <div className="current-time">
                                <span className="time">{showTime}</span>
                                <span className="date">{todayFormattedDate}</span>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <></>
            )}
        </div>
    );
};

export default CalendarComponent;
