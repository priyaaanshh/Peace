import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './pages/Login/login'
import SignUp from './pages/SignUp/signUp'
import UserProfile from './pages/User/user'
import OnBoarding from './pages/OnBoarding/onBoarding'
import OnBoardingSurvey from './pages/OnBoarding/onBoardingSurvey'
import Home from './pages/Home/home'
import DoctorProfile from './pages/DoctorProfile/doctorProfile'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />

        <Route path="/onBoarding" element={<OnBoarding />} />
        <Route path="/onBoarding/continue" element={<OnBoardingSurvey />} />

        <Route path="/therapy/appointment" element={<DoctorProfile />} />

        <Route path="/user" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App