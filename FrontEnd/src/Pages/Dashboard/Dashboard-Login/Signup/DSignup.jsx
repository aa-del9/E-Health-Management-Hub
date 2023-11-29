import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "./DSignup.css";
import { useDispatch } from "react-redux";
import { PatientSignup } from "../../../../Redux/auth/action";

const notify = (text) => toast(text);

const DSignup = () => {
  const dispatch = useDispatch();
  let confirmationPassword;
  const [Loading, setLoading] = useState(false);
  const [formvalue, setFormvalue] = useState({
    name: "",
    email: "",
    password: "",
  });
  const HandleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(formvalue.password, confirmationPassword);
    if (confirmationPassword === formvalue.password) {
      let data = {
        ...formvalue,
        patientID: formvalue.ID,
      };
      console.log(data);

      dispatch(PatientSignup(data)).then((res) => {});
    }
  };
  const Handlechange = (e) => {
    setFormvalue({ ...formvalue, [e.target.name]: e.target.value });
  };

  const checkPasswordsMatch = (e) => {
    confirmationPassword = e.target.value;
    if (confirmationPassword !== formvalue.password) {
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
                value={formvalue.name}
                onChange={Handlechange}
                required
              />
              <h3>Email</h3>
              <input
                type="text"
                name="email"
                value={formvalue.email}
                onChange={Handlechange}
                required
              />
              <h3>Password</h3>
              <input
                type="password"
                name="password"
                value={formvalue.password}
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
              <button type="submit">{Loading ? "Loading..." : "Submit"}</button>

              {/* ********************************************************* */}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default DSignup;
