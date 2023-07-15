import React, { useEffect, useState } from 'react';
import './question.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { baseURL } from '../../baseURL/baseURL';
import useFetch from '../../hooks/useFetch';
import Back from '../../assets/svg/back';

const Question = () => {
    const date = new Date();

    const options = {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    };

    const formatter = new Intl.DateTimeFormat('en-US', options);
    const formattedDate = formatter.format(date);


    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [selectedAnswer, setSelectedAnswer] = useState({});
    const [me, setMe] = useState(null);
    const numberOfQuestionsToShow = 2; // Change this variable to determine the number of questions to show

    const { data } = useFetch(`${baseURL}/user/userInfo/${localStorage.getItem("access_token")}/${JSON.parse(localStorage.getItem("user"))._id}`)

    useEffect(() => {
        setMe(data);
    }, [data]);

    useEffect(() => {
        const getQuestions = async () => {
            const questionsCompleted = me?.moodScores?.length || 0;
            try {
                const questionPromises = [];
                for (let i = 1; i <= numberOfQuestionsToShow; i++) {
                    questionPromises.push(axios.get(`${baseURL}/questions/getAllQuestions`, { params: { questionNumber: questionsCompleted + i } }));
                }
                const responses = await Promise.all(questionPromises);
                const newQuestions = responses.map(response => response.data);
                setQuestions(newQuestions.filter((value) => value !== null));
            } catch (error) {
                console.log(error);
            }
        };

        if (me) {
            getQuestions();
        }
    }, [me, numberOfQuestionsToShow]);

    const handleClickOption = (questionIndex, optionIndex) => {
        setSelectedAnswer(prevSelectedAnswer => {
            const updatedAnswer = { ...prevSelectedAnswer };
            if (updatedAnswer[questionIndex] === optionIndex) {
                // If the selected option is already selected, unselect it
                delete updatedAnswer[questionIndex];
            } else {
                // Otherwise, select the new option
                updatedAnswer[questionIndex] = optionIndex;
            }
            return updatedAnswer;
        });
    };

    const handleSubmitAnswer = async () => {
        if (!questions || !selectedAnswer) {
            console.log("Questions or selectedAnswer is undefined.");
            return;
        }
        if (Object.keys(selectedAnswer).length < questions.length) {
            console.log("Select all the answers");
            return;
        }

        var lastMoodScore = me?.moodScores?.[me.moodScores.length - 1]?.moodScore || 0;
        const updatedMoodScore = [];

        for (let i = 0; i < numberOfQuestionsToShow; i++) {
            const question = questions[i];
            const selectedOptionIndex = selectedAnswer[i];
            const option = question?.options?.[selectedOptionIndex];
            const moodScoreBoost = option?.moodScoreBoost || 0;
            const updatedQuestionScore = moodScoreBoost !== 0 ? moodScoreBoost + lastMoodScore : 0;
            if (updatedQuestionScore !== 0) {
                updatedMoodScore.push({ questionNumber: question?.questionNumber, moodScore: updatedQuestionScore, date: formattedDate });
                lastMoodScore = updatedQuestionScore;
            }
        }

        try {
            await axios.patch(`${baseURL}/user/${localStorage.getItem("access_token")}/${me?._id}`, { moodScores: [...me?.moodScores, ...updatedMoodScore] });
            // consoleconsole.log("Updated");
        } catch (error) {
            console.log(error);
        }

        navigate(-1);
    };

    return (
        <div className='doctorProfilePage user-profile-page-container'>
            <div className='session-book-page-container'>
                <div className='session-book-page'>
                    <div className='navbar'>
                        <div className='back-btn'>
                            <button className='back-btn' onClick={() => navigate(-1)}>
                                <Back color="black" />
                            </button>
                        </div>
                    </div>
                    <div className='session-book-card'>
                        <div className='card-Box'>
                            {(formattedDate !== me?.moodScores?.[me.moodScores.length - 1]?.date || "") && questions?.map((question, index) => {
                                if (!question) {
                                    return null;
                                }
                                return (
                                    <div className='question-options-column' key={index}>
                                        <div className='question-row'>
                                            <div className='question-number'>{question?.questionNumber}.</div>
                                            <div className='question'>{question?.question}</div>
                                        </div>
                                        <div className='question-page-options'>
                                            {question?.options?.map((option, i) => {
                                                const isSelected = selectedAnswer[index] === i;

                                                return (
                                                    <div
                                                        className={`question-page-option ${i === 1 ? "" : ""} ${isSelected ? "option-negative" : ""}`}
                                                        onClick={() => handleClickOption(index, i)}
                                                        key={i}
                                                    >
                                                        {option.option}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            })}
                            {questions.length !== 0 ? <div className='doctorPage-submit-btn' onClick={() => { handleSubmitAnswer() }}>Submit</div> : <div className='question'>You've submitted all the Questions for Today</div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Question;
