import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Matchcard.css";

function Matchcard({ userid, maxAge, minAge, usergender, userReligion, userCaste, userLocation, currentUserId }) {
  const [userProfiles, setUserProfiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessages, setPopupMessages] = useState([]);
  const [requestSentMap, setRequestSentMap] = useState({});
  const [currentPage, setCurrentPage] = useState(1); // Track the current page number
  const profilesPerPage = 7; // Number of profiles to display per page

  useEffect(() => {
    const fetchUserProfiles = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get('http://localhost:5001/getFeed', {
          params: {
            gender: usergender,
            id: userid,
            maxage: maxAge,
            minage: minAge,
            Religion: userReligion, 
            Caste: userCaste,
            Location: userLocation,
          }
        });
        setUserProfiles(response.data);
      } catch (error) {
        console.error('Error fetching user profiles:', error);
        setError('Error fetching user profiles. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfiles();
  }, [userid, userReligion, userCaste, userLocation, usergender, maxAge, minAge]);

  const handleSendRequest = async (receiverId) => {
    try {
      // Here you can perform the request sending logic
      const newMessage = 'Request Sent Successfully!!!!';
      setPopupMessages(prevMessages => [...prevMessages, newMessage]);
      setShowPopup(true);

      // Hide the pop-up after 5 seconds
      setTimeout(() => {
        setPopupMessages(prevMessages => prevMessages.filter(msg => msg !== newMessage));
        if (popupMessages.length === 1) {
          setShowPopup(false);
        }
      }, 900);
    } catch (error) {
      console.error('Error sending request:', error);
    }
  };

  // Calculate indexes of profiles to display on the current page
  const indexOfLastProfile = currentPage * profilesPerPage;
  const indexOfFirstProfile = indexOfLastProfile - profilesPerPage;
  const currentProfiles = userProfiles.slice(indexOfFirstProfile, indexOfLastProfile);

  // Change page to the next page
  const nextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
    window.scrollTo(0, 0); // Scroll to the top of the page
  };

  // Change page to the previous page
  const prevPage = () => {
    setCurrentPage(prevPage => prevPage - 1);
    window.scrollTo(0, 0); // Scroll to the top of the page
  };

  return (
    <div className="match-card-section">
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {showPopup && popupMessages.map((message, index) => (
        <Popup key={index} message={message} />
      ))}
      <div className="match-cards">
        {currentProfiles.map((user) => (
          <div key={user.id} className="match-card">
            {user.image && (
              <div className="profile-picture">
                <img src={require(`../Images/${user.image}`)} alt="Profile" />
              </div>
            )}
            <div className="profile-details">
              <h3>{user.fullName}</h3>
              <p>Age: {user.Age}</p>
              <p>Address: {user.regionalAddress}</p>
              <p>Religion: {user.religion}</p>
              <p>Caste: {user.caste}</p>
              <p>Qualification: {user.qualifications}</p>
            </div>
            <div className="action-buttons">
              {requestSentMap[user.id] ? (
                <span>Request Sent</span>
              ) : (
                <button onClick={() => handleSendRequest(user.id)}>Send Request</button>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
        <button onClick={nextPage} disabled={currentProfiles.length < profilesPerPage}>Next</button>
      </div>
    </div>
  );
}

const Popup = ({ message }) => {
  return (
    <div className="popup-right">
      <div className="popup-inner">
        <div className="token">!</div> {/* Add token */}
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Matchcard;