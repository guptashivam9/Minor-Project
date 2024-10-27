import React , { useState }  from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css";
import Navbar from "./components/Navbar";
import Homepage from "./components/Homepage";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import UserProfile from "./components/Userprofile";
import SearchFilter from "./components/SearchFilter";
import MessageBox from "./components/ChatBox/MessageBox";
import Profile from "./components/Profile";
import OTPVerification from "./components/otp";
import Matchcard from "./components/Matchcard";
import Image from "./components/image";





function App() {
  const [isInboxOpen, setIsInboxOpen] = useState(false);
  

  const toggleInbox = () => {
    setIsInboxOpen(!isInboxOpen);
  };

  return (
    <Router>
      <div className="App">
      
        <Routes>
          <Route exact path="/navbar" element={<Navbar />} />
          <Route exact path="/homepage" element={<Homepage />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/userprofile" element={<UserProfile />} />
          <Route exact path="/searchfilter" element={<SearchFilter />} />
          <Route exact path="/messagebox" element={< MessageBox/>} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/Matchcard" element={<Matchcard />} />
          
              <Route exact path="/otp" element={<OTPVerification />} />
              { <Route exact path="/image" element={<Image />} />}

        </Routes>
      </div>
      
    </Router>

  );
}

export default App;
