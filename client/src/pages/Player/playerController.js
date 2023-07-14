import React, { useState, useRef, useEffect } from 'react'
import './player.css';
import {
    AiOutlineHeart,
    AiFillBackward,
    AiFillPauseCircle,
    AiFillPlayCircle,
    AiFillForward,
} from 'react-icons/ai';
import { BsShuffle, BsFillStopFill } from 'react-icons/bs';
import { HiVolumeUp } from 'react-icons/hi';

const PlayerController = ({ songs }) => {
    const audioEl = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(1);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [isShuffled, setIsShuffled] = useState(false);


    useEffect(() => {
        setIsPlaying(true);
    }, [])


    useEffect(() => {
        if (isPlaying) {
            audioEl.current.play();
        } else {
            audioEl.current.pause();
        }
    }, [isPlaying, currentSongIndex]);

    useEffect(() => {
        audioEl.current.addEventListener('ended', () => {
            SkipSong(true);
        });
    }, [currentSongIndex]);

    const SkipSong = (forwards = true) => {
        if (isShuffled) {
            setCurrentSongIndex((prevIndex) => {
                let randomIndex;
                do {
                    randomIndex = Math.floor(Math.random() * songs.length);
                } while (randomIndex === prevIndex);
                return randomIndex;
            });
        } else {
            if (forwards) {
                setCurrentSongIndex((prevIndex) =>
                    prevIndex === songs.length - 1 ? 0 : prevIndex + 1
                );
            } else {
                setCurrentSongIndex((prevIndex) =>
                    prevIndex === 0 ? songs.length - 1 : prevIndex - 1
                );
            }
        }
    };

    const stopSong = () => {
        setIsPlaying(false);
        setCurrentSongIndex(0);
    };

    const toggleShuffle = () => {
        setIsShuffled(!isShuffled);
    };

    const handleVolumeChange = (event) => {
        const volumeValue = event.target.value;
        setVolume(volumeValue);
        audioEl.current.volume = volumeValue;
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    };

    const progress = (currentTime / duration) * 100 || 0;

    const handleProgressBarChange = (event) => {
        const progressValue = event.target.value;
        const newCurrentTime = (progressValue / 100) * duration;
        setCurrentTime(newCurrentTime);
        audioEl.current.currentTime = newCurrentTime;
    };

    return (
        <div className="player-controls">
            <audio
                className="player-video"
                src={songs?.length !== 0 && songs[currentSongIndex] }
                ref={audioEl}
                onTimeUpdate={() => {
                    setCurrentTime(audioEl.current.currentTime);
                    setDuration(audioEl.current.duration);
                }}
            ></audio>
            <input
                type="range"
                min="0"
                max="100"
                step="0.000001"
                value={progress}
                onChange={handleProgressBarChange}
                className="media-empty-progress-bar"
            />

            <div className="player-controls-buttons">
                <div className="control-button-groups">
                    <AiOutlineHeart fill="white" />
                    <div></div>
                    <div></div>
                </div>
                <div className="control-button-groups">
                    <BsShuffle fill={isShuffled ? 'green' : 'white'} onClick={toggleShuffle} />
                    <AiFillBackward fill="white" onClick={() => SkipSong(false)} />
                    {isPlaying ? (
                        <AiFillPauseCircle
                            fill="white"
                            onClick={() => setIsPlaying(false)}
                        />
                    ) : (
                        <AiFillPlayCircle
                            fill="white"
                            onClick={() => setIsPlaying(true)}
                        />
                    )}
                    <AiFillForward fill="white" onClick={() => SkipSong()} />
                    <BsFillStopFill fill="white" onClick={stopSong} />
                </div>

                <div className="control-button-groups">
                    <p>
                        {formatTime(currentTime)} / {formatTime(duration)}
                    </p>
                    <HiVolumeUp fill="white" />
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={volume}
                        onChange={handleVolumeChange}
                        className="volume-empty-progress-bar"
                    />
                </div>
            </div>
            <div></div>
        </div>
    )
}

export default PlayerController