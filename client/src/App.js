import { useEffect, useContext, useRef, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Login from './pages/Login/login';
import SignUp from './pages/SignUp/signUp';
import UserProfile from './pages/User/user';
import OnBoarding from './pages/OnBoarding/onBoarding';
import OnBoardingSurvey from './pages/OnBoarding/onBoardingSurvey';
import DoctorProfile from './pages/DoctorProfile/doctorProfile';
import Question from './pages/Questions/question';
import Dashboard from './pages/Dashboard/dashboard';
import Meditate from './pages/Meditate/meditate';
import Therapy from './pages/Therapy/therapy';
import Assesment from './pages/Assesment/assesment';
import Chat from './pages/Chat/chat';
import Journaling from './pages/Journaling/journaling';
import Rewards from './pages/Rewards/rewards';
import Player from './pages/Player/player';
import PaymentPage from './pages/PaymentPage/PaymentPage';
import { VolumeContext } from './Context/volumeContext';

const MainComponent = () => {
  const { volume, setVolume, preVolume, setPreVolume } = useContext(VolumeContext);
  const location = useLocation();
  const backgroundAudio = useRef(null);
  const [userPlayed, setUserPlayed] = useState(false);

  useEffect(() => {
    if (location.pathname === "/login" ||
      location.pathname === "/signUp" ||
      location.pathname === "/payment" ||
      location.pathname === "/onBoarding" ||
      location.pathname === "/onBoarding/continue" ||
      location.pathname === "/player") {
      if (backgroundAudio.current?.volume !== 0) {
        setPreVolume(backgroundAudio.current.volume);
      }
      backgroundAudio.current.volume = 0;
      setVolume(0);
    } else {
      // console.log(location, preVolume);
      setVolume(preVolume);
      backgroundAudio.current.volume = preVolume;
    }
  }, [location]);

  document.addEventListener("click", () => {
    if (backgroundAudio.current && location.pathname !== "/player") {
      backgroundAudio.current.play();
      setUserPlayed(true);
    }
  });
  useEffect(() => {
    if (backgroundAudio?.current) {
      backgroundAudio.current.volume = volume;
    }
    if (backgroundAudio.current && !(location.pathname === "/login" ||
      location.pathname === "/signUp" ||
      location.pathname === "/payment" ||
      location.pathname === "/onBoarding" ||
      location.pathname === "/onBoarding/continue" ||
      location.pathname === "/player")) {
      setPreVolume(volume);
      // console.log("preVolume changed")
    }
  }, [volume])

  useEffect(() => {
    // console.log(preVolume)
  }, [preVolume])

  const backgroundSongs = [
    'https://www.chosic.com/wp-content/uploads/2022/01/Where-The-Waves-Take-Us.mp3',
    'https://www.chosic.com/wp-content/uploads/2021/06/Sweet.mp3',
    'https://www.chosic.com/wp-content/uploads/2021/07/purrple-cat-wish-you-were-here.mp3',
    'https://www.chosic.com/wp-content/uploads/2021/07/purrple-cat-star-bright.mp3',
    'https://www.chosic.com/wp-content/uploads/2021/09/Inspiring-Acoustic-Guitar.mp3',
    'https://www.chosic.com/wp-content/uploads/2021/07/purrple-cat-green-tea.mp3',
  ];
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const SkipSong = (forwards = true) => {
    setCurrentSongIndex((prevIndex) =>
      prevIndex === backgroundSongs.length - 1 ? 0 : prevIndex + 1
    );
  };


  const progress = (currentTime / duration) * 100 || 0;

  useEffect(() => {
    if (progress === 100) {
      SkipSong(true);
      // console.log("skip....")
    }
    // console.log(progress);
    if (userPlayed && progress === 0) {
      // console.log("play....")
      backgroundAudio.current.play();
    }
  }, [progress])

  return (
    <div>
      <div>
        <audio
          src={backgroundSongs[currentSongIndex]}
          ref={backgroundAudio}
          onTimeUpdate={() => {
            setCurrentTime(backgroundAudio.current.currentTime);
            setDuration(backgroundAudio.current.duration);
          }}
        >
        </audio>
      </div>
      <Routes>

        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/onBoarding" element={<OnBoarding />} />
        <Route path="/onBoarding/continue" element={<OnBoardingSurvey />} />
        <Route path="/player" element={<Player />} />

        <Route path="/" element={<Dashboard />} />
        <Route path="/meditate" element={<Meditate />} />
        <Route path="/therapy-session" element={<Therapy />} />
        <Route path="/assessment" element={<Assesment />} />
        <Route path="/social-forum" element={<Chat />} />
        <Route path="/journaling" element={<Journaling />} />
        <Route path="/rewards" element={<Rewards />} />
        <Route path="/user" element={<UserProfile backgroundAudio={backgroundAudio} />} />


        <Route path="/therapy/appointment" element={<DoctorProfile />} />
        <Route path="/assesment/questions" element={<Question />} />

      </Routes>
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <MainComponent />
    </BrowserRouter>
  );
};

export default App;
