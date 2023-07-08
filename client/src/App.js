import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './pages/Login/login'
import SignUp from './pages/SignUp/signUp'
import UserProfile from './pages/User/user'
import OnBoarding from './pages/OnBoarding/onBoarding'
import OnBoardingSurvey from './pages/OnBoarding/onBoardingSurvey'
import DoctorProfile from './pages/DoctorProfile/doctorProfile'
import Question from './pages/Questions/question'
import Dashboard from './pages/Dashboard/dashboard'
import Meditate from './pages/Meditate/meditate'
import Therapy from './pages/Therapy/therapy'
import Assesment from './pages/Assesment/assesment'
import Chat from './pages/Chat/chat'
import Journaling from './pages/Journaling/journaling'
import Rewards from './pages/Rewards/rewards'
import Player from './pages/Player/player'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />


        <Route path="/" element={<Dashboard />} />
        <Route path="/meditate" element={<Meditate />} />
        <Route path="/therapy-session" element={<Therapy />} />
        <Route path="/assessment" element={<Assesment />} />
        <Route path="/social-forum" element={<Chat />} />
        <Route path="/journaling" element={<Journaling />} />
        <Route path="/rewards" element={<Rewards />} />

        <Route path="/onBoarding" element={<OnBoarding />} />
        <Route path="/onBoarding/continue" element={<OnBoardingSurvey />} />

        <Route path="/therapy/appointment" element={<DoctorProfile />} />

        <Route path="/assesment/questions" element={<Question />} />

        <Route path="/user" element={<UserProfile />} />

        <Route path="/player" element={<Player />} />
        
      </Routes>
    </BrowserRouter>
  )
}

export default App