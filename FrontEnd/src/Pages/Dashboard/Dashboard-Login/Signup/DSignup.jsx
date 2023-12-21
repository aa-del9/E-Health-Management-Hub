import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "./DSignup.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  CheckPatientExists,
  sendVerification,
} from "../../../../Redux/auth/action";

const notify = (text) => toast(text);

const DSignup = () => {
  const [code, setCode] = useState(0);
  const [verification, setVerification] = useState(0);
  const [isVisible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let confirmationPassword;
  const [loading, setLoading] = useState(false);
  const [formValue, setFormValue] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    Handlechange(e);
  };
  const handleCode = (e) => {
    setCode(parseInt(e.target.value));
  };
  const [email, setEmail] = useState("");

  const HandleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("visible", isVisible);
    if (!isVisible) {
      console.log(formValue.password, confirmationPassword);
      if (confirmationPassword === formValue.password) {
        console.log(formValue);
        dispatch(CheckPatientExists({ email: email })).then((res) => {
          console.log(res);
          if (res.message === "Patient already exists") {
            setLoading(false);
            notify("Patient Already Exists. Redirecting to Login Page");
            setTimeout(() => {
              return navigate("/");
            }, 3000);
          } else {
            notify("Verifying Email...");
            console.log(formValue.email);
            dispatch(sendVerification({ email: email })).then((res) => {
              console.log("Res", res);
              if (res.message === "successful") {
                notify(
                  "Verification code sent on email. Please check your email"
                );
                setVerification(res.code);
                console.log(verification);
                setVisible(true);
                setLoading(false);
              } else if (res.message === "error") {
                setLoading(false);
                return notify("Something went wrong, Please try Again");
              }
            });
          }
        });
      } else {
        setLoading(false);
        return notify("Passwords do not match");
      }
    } else {
      if (verification === code) {
        setLoading(false);
        return navigate("/adddetails", { state: formValue });
      } else {
        setLoading(false);
        return notify("Wrong Verification Code");
      }
    }
  };
  const Handlechange = (e) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
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
                onChange={handleEmailChange}
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
              {isVisible ? (
                <>
                  <h3>Verification Code</h3>
                  <input
                    type="number"
                    name="verification"
                    value={code}
                    onChange={handleCode}
                    required
                  />
                </>
              ) : null}

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
