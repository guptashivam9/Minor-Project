import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";
import { USER_API } from "../../src/config/ssss";
import { Link } from "react-router-dom";

const sendEmail = async (email) => {
  try {
    const response = await fetch("http://localhost:5001/sendEmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    const data = await response.json();
    console.log("Email sent successfully:", data);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
const SignUp = (props) => {
  const [FullName, setFullName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Password !== ConfirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(USER_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          FullName,
          Email,
          Password,
        }),
      });

      const data = await response.json();
      if (data.error) {
        setError(data.error);
      } else {
        setError("Signup Successfully");
        await sendEmail({ email: Email });
       navigate("/otp/", { state: data.id });
        // Call sendEmail function after successful signup
        //navigate("/Userprofile/", { state: data.id });
          
      }
    } catch (err) {
      setError(err.message);
      console.error("Error:", err);
    }
  
  
  }



  
  

  return (
    <div className="auth-form-container">
      <h2>Register</h2>
      {error && <p id="err">{error}</p>}
      <form className="signup-form" onSubmit={handleSubmit}>
        <label htmlFor="FullName">Full Name</label>
        <input
          value={FullName}
          name="FullName"
          onChange={(e) => setFullName(e.target.value)}
          id="FullName"
          placeholder="full Name"
        />
        <label htmlFor="email">Email</label>
        <input
          value={Email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="youremail@gmail.com"
          id="email"
          name="email"
        />
        <label htmlFor="password">Password</label>
        <input
          value={Password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="********"
          id="password"
          name="password"
        />
        <label htmlFor="confirmpassword">Confirm Password</label>
        <input
          value={ConfirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          type="password"
          placeholder="********"
          id="confirmpassword"
          name="confirmpassword"
        />
        <button type="submit">Sign Up  </button>
      </form>
      <button className="btn">
        <Link to="/login">Already have an account? Login here.</Link>
      </button>
    </div>
  );
};

export default SignUp;
