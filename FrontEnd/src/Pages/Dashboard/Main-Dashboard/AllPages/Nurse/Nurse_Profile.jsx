import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import "../Doctor/CSS/Doctor_Profile.css";
import { BiDetail, BiTime } from "react-icons/bi";
import { GiAges, GiMeditation } from "react-icons/gi";
import { AiFillCalendar, AiFillEdit } from "react-icons/ai";
import { MdBloodtype, MdEmail } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";
import { BsHouseFill, BsGenderAmbiguous } from "react-icons/bs";
import { MdOutlineCastForEducation } from "react-icons/md";
import {
  FaRegHospital,
  FaMapMarkedAlt,
  FaBirthdayCake,
  FaClinicMedical,
} from "react-icons/fa";
import Sidebar from "../../GlobalFiles/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { message, Modal } from "antd";
import { updatePatient } from "../../../../../Redux/auth/action";
import "./CSS/Profiles.css";
import {
  GetPatientDetails,
  GetPatients,
} from "../../../../../Redux/Datas/action";
import { TbGenderBigender } from "react-icons/tb";

const Nurse_Profile = () => {
  const { data } = useSelector((store) => store.auth);

  console.log("PATIENT DATA JANAB ", data);
  const dispatch = useDispatch();

  const { patients } = useSelector((store) => store.data.patients);

  console.log("PATIENTS", patients);
  const patient = patients.find((patient) => data.user.email === patient.email);
  console.log(patient);

  useEffect(() => {
    dispatch(GetPatients());
  }, []);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setFormData({
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    });
    setOpen(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const [messageApi, contextHolder] = message.useMessage();

  const success = (text) => {
    messageApi.success(text);
  };

  const error = (text) => {
    messageApi.error(text);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const [formData, setFormData] = useState({
    newPassword: "",
  });

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  console.log("patient new pass ", formData.newPassword);
  const handleFormSubmit = () => {
    data.user.password === formData.oldPassword
      ? data.user.password !== formData.newPassword
        ? formData.confirmNewPassword === formData.newPassword
          ? (() => {
              dispatch(
                updatePatient(
                  data.user.id,
                  { password: formData.newPassword },
                  data.token
                )
              ).then((res) => {
                if (res.message === "password updated") {
                  success("User updated");
                  handleOk();
                } else {
                  error("Something went wrong.");
                }
              });
            })()
          : error("Passwords do not match")
        : error("New password same as old")
      : error("Incorrect Old Password");
  };

  const dobString = patient.dob;
  const dobDate = new Date(dobString);

  const formattedDob = dobDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  if (data?.isAuthenticated === false) {
    return <Navigate to={"/"} />;
  }

  // if (data?.user.userType !== "patient") {
  //   return <Navigate to={"/dashboard"} />;
  // }

  return (
    <>
      {contextHolder}
      <div className="container">
        <Sidebar />
        <div className="AfterSideBar">
          <div className="maindoctorProfile">
            <div className="firstBox doctorfirstdiv">
              <div>
                <img src="../../../../../img/profile.png" alt="patientimg" />
              </div>
              <hr />
              <div className="singleitemdiv">
                <GiMeditation className="singledivicons" />
                <p>{patient.name}</p>
              </div>
              <div className="singleitemdiv">
                <BsFillTelephoneFill className="singledivicons" />

                <p>{patient.phonenum}</p>
              </div>
              <div className="singleitemdiv">
                <MdEmail className="singledivicons" />
                <p>{patient.email}</p>
              </div>
              <div className="singleitemdiv">
                <FaBirthdayCake className="singledivicons" />

                <p>{formattedDob}</p>
              </div>
              <div className="singleitemdiv">
                <button onClick={showModal}> Change Password</button>
              </div>

              <Modal
                title="CHANGE PASSWORD"
                open={open}
                onOk={handleFormSubmit}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
              >
                <form className="inputForm">
                  <input
                    name="oldPassword"
                    value={formData.oldPassword}
                    onChange={handleFormChange}
                    type="password"
                    placeholder="Old Password"
                  />
                  <input
                    name="newPassword"
                    type="password"
                    value={formData.newPassword}
                    onChange={handleFormChange}
                    placeholder="New Password"
                  />
                  <input
                    name="confirmNewPassword"
                    type="password"
                    value={formData.confirmNewPassword}
                    onChange={handleFormChange}
                    placeholder="Confirm New Password"
                  />
                </form>
              </Modal>
            </div>
            {/* ***********  Second Div ******************** */}
            <div className="SecondBox">
              <div className="subfirstbox">
                <h2 style={{ textAlign: "center", marginTop: "10px" }}>
                  Other Info
                </h2>
                <div className="singleitemdiv">
                  <TbGenderBigender className="singledivicons" />
                  <p>{patient.gender}</p>
                </div>
                <div className="singleitemdiv">
                  <GiAges className="singledivicons" />
                  <p>{patient.age}</p>
                </div>

                <div className="singleitemdiv">
                  <MdBloodtype className="singledivicons" />
                  <p>{patient.bloodgroup}</p>
                </div>
                <div className="singleitemdiv">
                  <BsHouseFill className="singledivicons" />
                  <p>{patient.address}</p>
                </div>
              </div>
              {/* ***********  Third Div ******************** */}
              <div className="subSecondBox">
                <h2 style={{ textAlign: "center", marginTop: "10px" }}>
                  Hospital Details
                </h2>
                <div className="singleitemdiv">
                  <BiTime className="singledivicons" />
                  <p>09:00 AM - 20:00 PM (TIMING)</p>
                </div>
                <div className="singleitemdiv">
                  <FaRegHospital className="singledivicons" />
                  <p>AZIZ FATIMA HOSPITAL</p>
                </div>
                <div className="singleitemdiv">
                  <FaMapMarkedAlt className="singledivicons" />
                  <p>
                    Faisalabad - Sheikhupura Road, Gulistan Colony Faisalabad,
                    Punjab
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Nurse_Profile;
