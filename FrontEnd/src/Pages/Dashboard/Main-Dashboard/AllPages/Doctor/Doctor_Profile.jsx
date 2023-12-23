import React, { useEffect, useState } from "react";
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
import { UpdateDoctor } from "../../../../../Redux/auth/action";
import { GetDoctorDetails } from "../../../../../Redux/Datas/action";
import { Navigate } from "react-router-dom";
import "./CSS/Doctor_Profile.css";
import { availabilityRegister } from "../../../../../Redux/auth/action";

// *********************************************************
const Doctor_Profile = () => {
  const { data } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  console.log("DATA JANAB ", data);

  useEffect(() => {
    dispatch(GetDoctorDetails());
  }, []);

  const [detailsOpen, setDetailsOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [availabilityModalOpen, setAvailabilityModalOpen] = useState(false);

  const showModal = () => {
    setFormData({
      oldPass: "",
      newPass: "",
      confirmNewPass: "",
    });
    setDetailsOpen(true);
  };

  const showAvailabilityModal = () => {
    setAvailabilityModalOpen(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setDetailsOpen(false);
      setAvailabilityModalOpen(false);
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
    setDetailsOpen(false);
    setAvailabilityModalOpen(false);
  };

  const [formData, setFormData] = useState({
    newPass: "",
  });

  const [formAvailability, setFormAvailability] = useState({
    id: data.user.id,
    MAS: "",
    MAE: "",
    EAS: "",
    EAE: "",
  });

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormAvailability({
      ...formAvailability,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = () => {
    data.user.password === formData.oldPass
      ? data.user.password !== formData.newPass
        ? formData.confirmNewPass === formData.newPass
          ? (() => {
              dispatch(
                UpdateDoctor(
                  data.user.id,
                  { password: formData.newPass },
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

  const handleAvailabilityFormSubmit = (e) => {
    e.preventDefault();
    setConfirmLoading(true);
    dispatch(availabilityRegister(formAvailability)).then((res) => {
      console.log("availbility res", res);
      if (res.message === "Successful") {
        success("Availability updated");
        handleOk();
      } else {
        error("something went wrong");
      }
    });
  };

  console.log("newPass", formData.newPass);

  if (data?.isAuthticated === false) {
    return <Navigate to={"/"} />;
  }

  if (data?.user.userType !== "doctor") {
    return <Navigate to={"/dashboard"} />;
  }

  return (
    <>
      {contextHolder}
      <div className="container">
        <Sidebar />
        <div className="AfterSideBar">
          <div className="maindoctorProfile">
            <div className="firstBox">
              <div>
                <img src={data?.user?.image} alt="docimg" />
              </div>
              <hr />
              <div className="singleitemdiv">
                <GiMeditation className="singledivicons" />
                <p>{data?.user?.docName}</p>
              </div>
              <div className="singleitemdiv">
                <MdBloodtype className="singledivicons" />
                <p>{data?.user?.bloodGroup}</p>
              </div>
              <div className="singleitemdiv">
                <FaBirthdayCake className="singledivicons" />
                <p>{data?.user?.DOB}</p>
              </div>
              <div className="singleitemdiv">
                <BsFillTelephoneFill className="singledivicons" />
                <p>{data?.user?.mobile}</p>
              </div>
              <div className="singleitemdiv">
                <button onClick={showModal}>
                  {" "}
                  <AiFillEdit />
                  Change Password
                </button>
                <button onClick={showAvailabilityModal}>
                  {""}
                  Set Availabilitys
                </button>
              </div>

              <Modal
                title="CHANGE PASSWORD"
                open={detailsOpen}
                onOk={handleFormSubmit}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
              >
                <form className="inputForm">
                  <input
                    name="oldPass"
                    value={formData.oldPass}
                    onChange={handleFormChange}
                    type="password"
                    placeholder="Old Password"
                  />
                  <input
                    name="newPass"
                    type="password"
                    value={formData.newPass}
                    onChange={handleFormChange}
                    placeholder="New Password"
                  />
                  <input
                    name="confirmNewPass"
                    type="password"
                    value={formData.confirmNewPass}
                    onChange={handleFormChange}
                    placeholder="Confirm New Password"
                  />
                </form>
              </Modal>
              <Modal
                title="Set Availabilitys"
                open={availabilityModalOpen}
                onOk={handleAvailabilityFormSubmit}
                onCancel={handleCancel}
              >
                <form className="inputForm">
                  <p>Morning Availabilitys</p>
                  <input
                    name="MAS"
                    value={formAvailability.MAS}
                    onChange={handleFormChange}
                    type="time"
                    placeholder="8:00 am -- 2:00 pm:"
                  />
                  <input
                    name="MAE"
                    value={formAvailability.MAE}
                    onChange={handleFormChange}
                    type="time"
                    placeholder="8:00 am -- 2:00 pm:"
                  />
                  <p>Evening Availabilitys</p>
                  <input
                    name="EAS"
                    value={formAvailability.EAS}
                    onChange={handleFormChange}
                    type="time"
                    placeholder="8:00 am -- 2:00 pm:"
                  />
                  <input
                    name="EAE"
                    value={formAvailability.EAE}
                    onChange={handleFormChange}
                    type="time"
                    inputMode="numeric"
                    placeholder="8:00 am -- 2:00 pm:"
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
                  <p>{data?.user?.gender}</p>
                </div>
                <div className="singleitemdiv">
                  <AiFillCalendar className="singledivicons" />
                  <p>{data?.user?.age}</p>
                </div>

                <div className="singleitemdiv">
                  <MdOutlineCastForEducation className="singledivicons" />
                  <p>{data?.user?.education}</p>
                </div>
                <div className="singleitemdiv">
                  <BsHouseFill className="singledivicons" />
                  <p>{data?.user?.address}</p>
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
export default Doctor_Profile;
