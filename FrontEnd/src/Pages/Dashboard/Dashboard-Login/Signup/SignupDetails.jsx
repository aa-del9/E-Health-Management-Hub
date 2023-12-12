import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
//import "./DSignup.css";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./DSignup.css";
import { PatientSignup, sendPassword } from "../../../../Redux/auth/action";
const notify = (text) => toast(text);
const SignupDetails = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const creds = location.state;
  console.log("location", creds);
  const [loading, setLoading] = useState(false);
  const [formValue, setFormValue] = useState({
    name: creds.name,
    phoneNum: "",
    email: creds.email,
    password: creds.password,
    age: "",
    gender: "",
    bloodGroup: "",
    DOB: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const HandleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(formValue);
    dispatch(PatientSignup(formValue)).then((res) => {
      console.log(res);
      if (res.message === "error") {
        setLoading(false);
        return notify("Something went wrong, Please try Again");
      }
      notify("Your signup is complete. Sending login Credentials...");
      //todo: send email
      let data = {
        email: res.email,
        // password: res.data.password,
        // userId: res.data.adminID,
      };
      dispatch(sendPassword(data)).then((res) =>
        notify("Account Detais Sent. Login to continue.")
      );
      setLoading(false);
    });
  };
  return (
    <>
      <ToastContainer />

      <div className="mainSignupPage">
        <div className="outerBox">
          <h1>Add Your Details</h1>
          <div>
            <form onSubmit={HandleSubmit}>
              <h3>Phone Number</h3>
              <input
                type="number"
                name="phoneNum"
                value={formValue.phoneNum}
                onChange={handleChange}
                required
              />
              <h3>Date of Birth</h3>
              <div className="inputdiv">
                <input
                  type="date"
                  placeholder="dd-mm-yy"
                  name="DOB"
                  value={formValue.DOB}
                  onChange={handleChange}
                  required
                />
              </div>
              <h3>Age</h3>
              <input
                type="number"
                name="age"
                value={formValue.age}
                onChange={handleChange}
                required
              />
              <h3>Gender</h3>
              <div className="inputdiv">
                <select
                  name="gender"
                  value={formValue.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="Choose Gender">Choose Gender</option>
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                </select>
              </div>
              <h3>Blood Group</h3>
              <div className="inputdiv">
                <select
                  name="bloodGroup"
                  value={formValue.bloodGroup}
                  onChange={handleChange}
                  required
                >
                  <option value="Choose Blood Group">Select</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
              <h3>Address</h3>
              <input
                type="text"
                name="address"
                value={formValue.address}
                onChange={handleChange}
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
export default SignupDetails;
