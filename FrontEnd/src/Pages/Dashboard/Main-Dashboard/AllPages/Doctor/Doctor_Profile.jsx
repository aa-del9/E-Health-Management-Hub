import React, { useEffect, useState } from "react";
import "../Doctor/CSS/Doctor_Profile.css";
import { BiMoney, BiTime } from "react-icons/bi";
import { GiMeditation } from "react-icons/gi";
import { AiFillCalendar, AiFillClockCircle } from "react-icons/ai";
import { MdBloodtype, MdCastForEducation, MdEmail } from "react-icons/md";
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
  console.log("user state", data);

  console.log("DATA JANAB ", data);
  const { doctors } = useSelector((store) => store.data.doctors);

  console.log("doctors", doctors);
  const doctor = doctors.find((doctor) => data.user.email === doctor.email);
  console.log(doctor);
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

  const dobString = doctor.dob;
  const dobDate = new Date(dobString);

  const formattedDob = dobDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  function filterAvailability(availability) {
    const result = [];
    // Display the first entry
    result.push(availability[0]);

    for (let i = 0; i < availability.length - 1; i++) {
      const time1 = new Date(`1970-01-01T${availability[i]}`);
      const time2 = new Date(`1970-01-01T${availability[i + 1]}`);
      const timeDifference = (time2 - time1) / (1000 * 60); // Difference in minutes

      if (timeDifference > 15) {
        result.push(availability[i], availability[i + 1]);
      }
    }

    // Display the last entry
    result.push(availability[availability.length - 1]);

    return result;
  }

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
                {/* <p>Name :</p> */}
                <p>{doctor.name}</p>
              </div>
              <div className="singleitemdiv">
                <BsFillTelephoneFill className="singledivicons" />
                <p>{doctor.phonenum}</p>
              </div>
              <div className="singleitemdiv">
                <MdEmail className="singledivicons" />
                <p>{doctor.email}</p>
              </div>
              <div className="singleitemdiv">
                <FaBirthdayCake className="singledivicons" />
                <p>{formattedDob}</p>
              </div>
              <div className="singleitemdiv">
                <button onClick={showModal}> Change Password</button>
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
                  <BiMoney className="singledivicons" />
                  <p>{doctor.fees}</p>
                </div>
                <div className="singleitemdiv">
                  <AiFillClockCircle className="singledivicons" />
                  {/* <p>{`${doctor.availability[0]} - ${
                    doctor.availability[doctor.availability.length - 1]
                  }`}</p> */}
                  <div>
                    <p>{filterAvailability(doctor.availability).join(" - ")}</p>
                  </div>
                </div>

                <div className="singleitemdiv">
                  <MdCastForEducation className="singledivicons" />
                  <p>{doctor.department}</p>
                </div>
                {/* <div className="singleitemdiv">
                  <BsHouseFill className="singledivicons" />
                  <p>{doctor.address}</p>
                </div> */}
                <div className="singleitemdiv">
                  <BsHouseFill
                    className="singledivicons"
                    style={{ marginBottom: "30px", color: "orange" }}
                  />
                  <p
                    style={{
                      marginLeft: "10px",
                      fontSize: "1.2rem",
                      color: "#555",
                      marginBottom: "30px",
                    }}
                  >
                    {doctor.address}
                  </p>
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
export default Doctor_Profile;
