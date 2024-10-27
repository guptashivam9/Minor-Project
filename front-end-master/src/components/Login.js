import React from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { LOGIN_API } from "../../src/config/ssss";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
// import { GoogleOAuthProvider } from "@react-oauth/google";
// import { GoogleLogin } from "@react-oauth/google";

export const Login = (props) => {
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await fetch(LOGIN_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Email: values.email,
          Password: values.password,
        }),
      });
      const data = await response.json();
      
      if (data.user) {
        // Store user data in local storage
        sessionStorage.setItem("user", JSON.stringify(data.user));
        setTimeout(() => {
          navigate("/Homepage", { state: { user: data.user } });
        }, 1000);
      } else {
        alert(data.error);
      }

      resetForm();
      setSubmitting(false);
    } catch (error) {
      // Display error message
      alert(error.message);
      console.error(error);
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-form-container">
      <h2>Login</h2>

      <div className="title">
        Welcome To Jodi Finder <br /><i>"Find Your Pair"</i>
      </div>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="login-form">
            <label htmlFor="email">Email</label>
            <Field name="email" type="email" placeholder="youremail@gmail.com" id="email" />
            <ErrorMessage name="email" component="div" />

            <label htmlFor="password">Password</label>
            <Field name="password" type="password" placeholder="********" id="password" />
            <ErrorMessage name="password" component="div" />

            <button type="submit" className="btn" disabled={isSubmitting}>
              Login
            </button>
          </Form>
        )}
      </Formik>
      <button className="link-btn">
        <Link to="/signup">Don't have an account? Sign up here.</Link>
      </button>
      
    </div>
  );
};

export default Login;