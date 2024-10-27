import React from 'react';
import Header from './Header.js';
import './Homepage.css';
import Matchcard from './Matchcard';
import { Link } from "react-router-dom";
import { AiFillHome, AiOutlineSearch, AiFillFilter } from "react-icons/ai";
import { FaUserFriends , FaFacebookMessenger, FaUsers} from "react-icons/fa";
import { useLocation } from 'react-router-dom';
 import Profile from './Profile.js';
 import  { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
//import SearchFilter from './SearchFilter.js';
function Homepage () {
  const [user1, setuser1]= useState({});
  const location = useLocation();
 //  const [filters, setfilters] = useState({});
 useEffect(() => {
     
     if (location.state.user ) {
     setuser1(location.state.user);
     console.log("this is run")
     }
 },[]);
     const user2string = sessionStorage.getItem("user");
     const user2 = JSON.parse(user2string);
     console.log(user2)
     

 
 
 const param = new URLSearchParams(document.location.search);

 
 const maxAge = param.get('maxage');
 const userReligion = param.get('religion');
 const userCaste = param.get('caste');
 const userLocation =  param.get('location');
//  const userEducation =  param.get('educationlevel');
 const minAge = param.get('minage');


 console.log(user1)
 
 
 // if(location.state.filters){
 //     setfilters(location.state.filter);
 // }



const navigate = useNavigate();

const goToProfile = () => {
  navigate("/Profile", { state: user2 });
};

const goTohome = () => {
  navigate("/homepage", { state: user2 });
};

  return (
    <div className="Homepage">
      {/* <Header /> */}
      <div className="content-container">
        <div className="header-content">
        <div className="first-header">
                    <div className="logo">
                        <img src="/Img/logo.jpg" alt="logo" style={{height: "100px", padding: "1rem;"}}/>

                        </div>
                        {/* <div className="Search">
                            <AiOutlineSearch style ={{height: "4rem"}}/>
                            <input placeholder="Search JodiFinder" type="Search"/>
                        </div> */}
                        <div className="middle-header">
                            <div className="Icon">
                                <AiFillHome fontSize="2rem" color="#cc5555" style ={{height: "4rem", padding: "1rem;"}} onClick={goTohome} />
                            </div>
                            <div className="Icon">
                                <FaUserFriends fontSize="2rem" style ={{height: "4rem", padding: "1rem;"}}  />
                            </div>
                            <div className="Icon">
                                <FaUsers fontSize="2rem" style ={{height: "4rem", padding: "1rem;"}} />
                            </div>
                            <div className="Icon">

                                <Link to={'/MessageBox'}><FaFacebookMessenger fontSize="2rem" style ={{height: "4rem", width: "1rem;"}} /></Link>
                               
                            </div>
                            <div className="Icon">
                                
                    
                                    <Link to= '/SearchFilter'><AiFillFilter fontSize="2rem"style ={{height: "4rem", padding: "1rem;"}} /></Link>
                    
                            </div>
                            <div className="Icon">
                <img src="/Img/download.png" alt="profile" style ={{height: "3rem", width: "5rem", borderRadius: "50%", padding: "1rem"}} 
                  onClick={goToProfile} />
              </div>
                               </div>
                                 </div>
                                </div>
                              <div className="matchcard-content">
          <Matchcard 
          usergender = {user2.gender}
      
          userid={user2.id} // Add a default value to prevent errors
          maxAge={maxAge}
          minAge={minAge}
          userReligion={userReligion}
          userCaste={userCaste}
          userLocation={userLocation}
          // userEducation={userEducation}
                        />
        </div>
      </div>
    </div>
    
  );

  }
export default Homepage;