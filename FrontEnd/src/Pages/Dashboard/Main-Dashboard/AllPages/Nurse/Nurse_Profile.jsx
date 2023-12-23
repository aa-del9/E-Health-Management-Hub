import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import "../Doctor/CSS/Doctor_Profile.css";
import { BiTime } from "react-icons/bi";
import { GiMeditation } from "react-icons/gi";
import { AiFillCalendar, AiFillEdit } from "react-icons/ai";
import { MdBloodtype } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";
import { BsHouseFill, BsGenderAmbiguous } from "react-icons/bs";
import { MdOutlineCastForEducation } from "react-icons/md";
import { FaRegHospital, FaMapMarkedAlt, FaBirthdayCake } from "react-icons/fa";
import Sidebar from "../../GlobalFiles/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { message, Modal } from "antd";
import { updatePatient } from "../../../../../Redux/auth/action";
import "./CSS/Profiles.css";
import { GetAllData } from "../../../../../Redux/Datas/action";

const Nurse_Profile = () => {
  const { data } = useSelector((store) => store.auth);

  console.log("PATIENT DATA JANAB ", data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetAllData());
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
                <img src="../../../../../img/profile.png" alt="docimg" />
              </div>
              <hr />
              <div className="singleitemdiv">
                <GiMeditation className="singledivicons" />
                <p>{data?.user.name}</p>
              </div>
              <div className="singleitemdiv">
                <MdBloodtype className="singledivicons" />
                <p>{data?.user.bloodGroup}</p>
              </div>
              <div className="singleitemdiv">
                <FaBirthdayCake className="singledivicons" />
                <p>{data?.user.DOB}</p>
              </div>
              <div className="singleitemdiv">
                <BsFillTelephoneFill className="singledivicons" />
                <p>{data?.user.mobile}</p>
              </div>
              <div className="singleitemdiv">
                <button onClick={showModal}>
                  {" "}
                  <AiFillEdit />
                  Change Password
                </button>
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
                  <BsGenderAmbiguous className="singledivicons" />
                  <p>{data?.user[0]?.gender}</p>
                </div>
                <div className="singleitemdiv">
                  <AiFillCalendar className="singledivicons" />
                  <p>{data?.user[0]?.age}</p>
                </div>

                <div className="singleitemdiv">
                  <MdOutlineCastForEducation className="singledivicons" />
                  <p>{data?.user[0]?.education}</p>
                </div>
                <div className="singleitemdiv">
                  <BsHouseFill className="singledivicons" />
                  <p>{data?.user[0]?.address}</p>
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
                  <p>Apollo hospitals</p>
                </div>
                <div className="singleitemdiv">
                  <FaMapMarkedAlt className="singledivicons" />
                  <p>
                    Sri Aurobindo Marg, Ansari Nagar, Ansari Nagar East, New
                    Delhi.
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
