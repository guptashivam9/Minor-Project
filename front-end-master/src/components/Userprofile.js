import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { POST_API } from "../../src/config/ssss";
import './UserProfile.css';
import axios from "axios";


function UserProfile() {
   const [file,setfile] = useState();
  const[image, setimage] = useState();
  const location =  useLocation();
  const id = location.state;
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    age: '',
    religion: '',
    caste: '',
    qualifications: '',
    nationality: '',
    regionalAddress: '',
    gender: '',
    //image: ''
  });
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "dateOfBirth") {
      const dob = new Date(value);
      const ageDiffMs = Date.now() - dob.getTime();
      const ageDate = new Date(ageDiffMs);
      const calculatedAge = Math.abs(ageDate.getUTCFullYear() - 1970);
      setFormData({
        ...formData,
        dateOfBirth: value,
        age: calculatedAge.toString() // Set the age in formData
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  // const imageUpload = (event) => {
    
  //   setFormData({
  //     ...formData,
  //     image: event.target.files[0]
  //   });
  // }


  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedUserProfile = {
      id: id,
      fullName: formData.fullName,
      dateOfBirth: formData.dateOfBirth,
      Age: formData.age, // Make sure to send the age in the request
      religion: formData.religion,
      caste: formData.caste,
      qualifications: formData.qualifications,
      nationality: formData.nationality,
      regionalAddress: formData.regionalAddress,
      gender: formData.gender,
      // image: formData.image
    };

    try {
      const response = await fetch(POST_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUserProfile),
      });
      const data = await response.json();

      if (data.error) {
        setError(data.error);
      } else {
        setError("Update profile Successfully");
        // navigate to UserProfile page after 1 second
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    } catch (err) {
      //  display error
      setError(err.message);
      console.error("Error:", err);
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  return (
    <div className="user-profile">
      <nav>
        <button onClick={prevStep} disabled={currentStep === 1}>Prev</button>
        <button onClick={nextStep} disabled={currentStep === 3}>Next</button>
      </nav>
      {currentStep === 1 && (
        <div>
          <h2>Create Your Profile</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="fullName">Full Name:</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="dateOfBirth">Date of Birth:</label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="age">Age:</label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
              />
            </div>
             {/* <div className="form-group">
              <label htmlFor="photos">Upload Photos:</label>
              <input
                type="file" 
                id="photos"
                name="photos"
                // value ={formData.photo}
                onChange={imageUpload}
                multiple
              />

              
            </div>  */}
          </form>
        </div>
      )}
          {currentStep === 2 && (
        <div>
          <h2>Personal Details</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="religion">Religion:</label>
              <select
                id="religion"
                name="religion"
                value={formData.religion}
                onChange={handleChange}
                required
              >
                <option value="">Select Religion</option>
                <option value="Hindu">Hindu</option>
                <option value="Buddhist">Buddhist</option>
                <option value="Muslim">Muslim</option>
                <option value="Christian">Christian</option>
                <option value="Kirat">Kirat</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="caste">Caste:</label>
              <select
                id="caste"
                name="caste"
                value={formData.caste}
                onChange={handleChange}
                required
              >
                <option value="">Select Caste</option>
                <option value="Brahmin">Brahmin</option>
                <option value="chhetri">Chhetri</option>
                <option value="Magar">Magar</option>
                <option value="Newar">Newar</option>
                <option value="Rai">Rai</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="gender">Gender:</label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>

              </select>
            </div>
          </form>
        </div>
      )}
      {currentStep === 3 && (
        <div>
          <h2>Additional Information</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="qualifications">Qualifications:</label>
              <input
                type="text"
                id="qualifications"
                name="qualifications"
                value={formData.qualifications}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="nationality">Nationality:</label>
              <input
                type="text"
                id="nationality"
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="regionalAddress">Regional Address:</label>
              <input
                type="text"
                id="regionalAddress"
                name="regionalAddress"
                value={formData.regionalAddress}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
     </div>
  );
      }
export default UserProfile;