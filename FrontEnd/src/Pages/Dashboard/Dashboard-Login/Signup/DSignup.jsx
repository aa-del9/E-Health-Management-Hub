import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "./DSignup.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { CheckPatientExists } from "../../../../Redux/auth/action";

const notify = (text) => toast(text);

const DSignup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let confirmationPassword;
  const [loading, setLoading] = useState(false);
  const [formValue, setFormValue] = useState({
    name: "",
    email: "",
    password: "",
  });

  const HandleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(formValue.password, confirmationPassword);
    if (confirmationPassword === formValue.password) {
      console.log(formValue);
      dispatch(CheckPatientExists(formValue)).then((res) => {
        console.log(res);
        if (res.message === "Patient already exists") {
          setLoading(false);
          notify("Patient Already Exists. Redirecting to Login Page");
          setTimeout(() => {
            return navigate("/");
          }, 3000);
        } else {
          console.log(formValue.email);
          return navigate("/adddetails", { state: formValue });
        }
      });
    }
  };
  const Handlechange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const checkPasswordsMatch = (e) => {
    confirmationPassword = e.target.value;
    if (confirmationPassword !== formValue.password) {
      notify("Passwords do not match");
      return false;
    } else return true;
  };

  return (
    <>
      <ToastContainer />

      <div className="mainSignupPage">
        <div className="outerBox">
          <h1>Signup As Patient</h1>
          <div>
            <form onSubmit={HandleSubmit}>
              <h3>Name</h3>
              <input
                type="text"
                name="name"
                value={formValue.name}
                onChange={Handlechange}
                required
              />
              <h3>Email</h3>
              <input
                type="text"
                name="email"
                value={formValue.email}
                onChange={Handlechange}
                required
              />
              <h3>Password</h3>
              <input
                type="password"
                name="password"
                value={formValue.password}
                onChange={Handlechange}
                required
              />
              <h3>Confirm Password</h3>
              <input
                type="password"
                name="confirmpassword"
                value={confirmationPassword}
                onBlur={checkPasswordsMatch}
                required
              />
              <button type="submit">{loading ? "Loading..." : "Submit"}</button>

              {/* ********************************************************* */}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default DSignup;
