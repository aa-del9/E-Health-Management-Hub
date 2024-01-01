import React, { useEffect, useState } from "react";
import "../Doctor/CSS/Doctor_Profile.css";
import { BiTime } from "react-icons/bi";
import { GiAges, GiMeditation } from "react-icons/gi";
import { MdEmail } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";
import { BsHouseFill, BsGenderAmbiguous } from "react-icons/bs";
import { FaRegHospital, FaMapMarkedAlt, FaBirthdayCake } from "react-icons/fa";
import Sidebar from "../../GlobalFiles/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { message, Modal } from "antd";
import { UpdateAdmin } from "../../../../../Redux/auth/action";
import { GetAdminDetails } from "../../../../../Redux/Datas/action";
import { Navigate } from "react-router-dom";
import "./CSS/Admin_Profile.css";

// *********************************************************
const Admin_Profile = () => {
  const { data } = useSelector((store) => store.auth);
  console.log("heree", data);
  console.log(data?.user?.id);

  const dispatch = useDispatch();
  const { admins } = useSelector((store) => store.data.admins);
  console.log("admins", admins);
  const admin = admins.find((admin) => data.user.email === admin.email);
  console.log(admin);

  console.log("User ID:", data.user.id);
  console.log("Admin ID:", admin ? admin.id : "Admin not found");

  useEffect(() => {
    dispatch(GetAdminDetails());
  }, [dispatch]);

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

  console.log("admin new pass ", formData.newPassword);
  const handleFormSubmit = () => {
    data.user.password === formData.oldPassword
      ? data.user.password !== formData.newPassword
        ? formData.confirmNewPassword === formData.newPassword
          ? (() => {
              dispatch(
                UpdateAdmin(
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

  const dobString = admin.dob;
  const dobDate = new Date(dobString);

  const formattedDob = dobDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  if (data?.isAuthenticated === false) {
    return <Navigate to={"/"} />;
  }

  if (data?.user.userType !== "admin") {
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
                <img src="../../../../../img/profile.png" alt="admin" />
              </div>
              <hr />
              <div className="singleitemdiv">
                <GiMeditation className="singledivicons" />
                <p>{admin.name}</p>
              </div>
              <div className="singleitemdiv">
                <BsFillTelephoneFill className="singledivicons" />
                <p>{admin.phonenum}</p>
              </div>
              <div className="singleitemdiv">
                <MdEmail className="singledivicons" />

                <p>{admin.email}</p>
              </div>
              <div className="singleitemdiv">
                <FaBirthdayCake className="singledivicons" />
                {<p>{formattedDob}</p>}
              </div>
              <div className="singleitemdiv">
                <button onClick={showModal}>
                  {" "}
                  {/* <AiFillEdit /> */}
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
                  <p>{admin.gender}</p>
                </div>
                <div className="singleitemdiv">
                  <GiAges className="singledivicons" />
                  <p>{admin.age}</p>
                </div>

                {/* <div className="singleitemdiv">
                  <MdOutlineCastForEducation className="singledivicons" />
                  <p>{data?.user?.education}</p>
                </div> */}
                <div className="singleitemdiv">
                  <BsHouseFill className="singledivicons" />
                  <p>{admin.address}</p>
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
                  <p>Aziz Fatima Hospital</p>
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

export default Admin_Profile;
