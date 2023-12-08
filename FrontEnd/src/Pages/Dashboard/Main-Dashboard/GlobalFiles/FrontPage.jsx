import { Table } from "antd";
import React from "react";
import { MdPersonAdd } from "react-icons/md";
import { FaUserNurse } from "react-icons/fa";
import { RiEmpathizeLine } from "react-icons/ri";
import { FaBed } from "react-icons/fa";
import { MdOutlineBedroomParent } from "react-icons/md";
import { FaAmbulance } from "react-icons/fa";
import { BsFillBookmarkCheckFill } from "react-icons/bs";
import { MdPayment } from "react-icons/md";
import { RiAdminLine } from "react-icons/ri";
import Sidebar from "./Sidebar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GetAllData,
  GetPatients,
  GetDoctorDetails,
} from "../../../../Redux/Datas/action";
import { userType } from "../../Dashboard-Login/DLogin";
import { useAuth } from "../../../../Routes/AuthContext";

const FrontPage = () => {
  const { placement } = useAuth();
  const patientColumns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Age", dataIndex: "age", key: "age" },
    { title: "Disease", dataIndex: "disease", key: "disease" },
    { title: "Blood Group", dataIndex: "bloodgroup", key: "bloodgroup" },
    { title: "Gender", dataIndex: "gender", key: "gender" },
    { title: "Email", dataIndex: "email", key: "email" },
  ];

  const doctorColumns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Age", dataIndex: "age", key: "age" },
    { title: "Gender", dataIndex: "gender", key: "gender" },
    { title: "Phone Number", dataIndex: "phonenum", key: "phonenum" },
    { title: "Department", dataIndex: "department", key: "department" },
    { title: "Email", dataIndex: "email", key: "email" },
  ];

  const { patients } = useSelector((store) => store.data.patients);
  const { doctors } = useSelector((store) => store.data.doctors);
  const {
    dashboard: { data },
  } = useSelector((store) => store.data);

  console.log(data);
  console.log(patients);
  console.log("doctors", doctors);
  const dispatch = useDispatch();
  const {
    data: { user },
  } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(GetPatients());
    dispatch(GetDoctorDetails());
    dispatch(GetAllData());
  }, []);

  const userType = placement;
  console.log("userType", userType);

  return (
    <div className="container">
      <Sidebar />
      <div className="AfterSideBar">
        <h1 style={{ color: "rgb(184 191 234)" }}>Overview</h1>
        <div className="maindiv">
          {/* <div className="three commondiv">
            <div>
              <h1>{data?.patient}</h1>
              <p>Patient</p>
            </div>
            <RiEmpathizeLine className="overviewIcon" />
          </div> */}
          {userType !== "Patient" ? (
            <>
              <div className="one commondiv">
                <div>
                  <h1>{data?.doctor}</h1>
                  <p>Doctor</p>
                </div>
                <MdPersonAdd className="overviewIcon" />
              </div>
              <div className="two commondiv">
                {" "}
                <div>
                  <h1>{data?.patient}</h1>
                  <p>Patient</p>
                </div>
                <FaUserNurse className="overviewIcon" />
              </div>
              <div className="six commondiv">
                {" "}
                <div>
                  <h1>{data?.appointment}</h1>
                  <p>Appointment</p>
                </div>
                <BsFillBookmarkCheckFill className="overviewIcon" />
              </div>
              {userType === "Admin" ? (
                <>
                  <div className="six commondiv">
                    {" "}
                    <div>
                      <h1>{data?.admin}</h1>
                      <p>Admin</p>
                    </div>
                    <RiAdminLine className="overviewIcon" />
                  </div>
                  <div className="five commondiv">
                    {" "}
                    <div>
                      <h1>{data?.ambulance}</h1>
                      <p>Ambulance</p>
                    </div>
                    <FaAmbulance className="overviewIcon" />
                  </div>
                  <div className="six commondiv">
                    {" "}
                    <div>
                      <h1>{data?.report}</h1>
                      <p>Reports</p>
                    </div>
                    <MdPayment className="overviewIcon" />
                  </div>
                </>
              ) : null}
            </>
          ) : null}

          {/* <div className="four commondiv">
            {" "}
            <div>
              <h1>{data?.bed}</h1>
              <p>Beds</p>
            </div>
            <FaBed className="overviewIcon" />
          </div> */}
        </div>
        {/* ************************************* */}

        <div>
          {userType === "Admin" ? (
            <div className="patientDetails">
              <h1>Doctor Details</h1>
              <div className="patientBox">
                <Table columns={doctorColumns} dataSource={doctors} />
              </div>
            </div>
          ) : null}
          {userType !== "Patient" ? (
            <div className="patientDetails">
              <h1>Patient Details</h1>
              <div className="patientBox">
                <Table columns={patientColumns} dataSource={patients} />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default FrontPage;
