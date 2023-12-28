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
  GetMedicineDetails,
} from "../../../../Redux/Datas/action";

const FrontPage = () => {
  const dispatch = useDispatch();

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

  const patientMedication = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Dosage", dataIndex: "dosage", key: "dosaage" },
    { title: "Frequency", dataIndex: "frequency", key: "frequency" },
    { title: "Duration", dataIndex: "duration", key: "duration" },
  ];

  useEffect(() => {
    dispatch(GetPatients());
    dispatch(GetDoctorDetails());
    dispatch(GetAllData());
    dispatch(GetMedicineDetails(user.id));
  }, []);

  const { patients } = useSelector((store) => store.data.patients);
  const { doctors } = useSelector((store) => store.data.doctors);
  const { medicines } = useSelector((store) => store.data.medicines);
  const {
    dashboard: { data },
  } = useSelector((store) => store.data);

  console.log(data);
  console.log("patients", patients);
  console.log("doctors", doctors);
  console.log("medicies", medicines);

  const {
    data: { user },
  } = useSelector((state) => state.auth);
  console.log(user);
  console.log(user.id);
  console.log("userType", user?.userType);
  //user?.isAuthenticated === false ? <Navigate to={"/"} /> : null;
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

          {user?.userType !== "patient" ? (
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
              {user?.userType === "admin" ? (
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
        {user?.userType == "patient" ? (
          <div>
            <div className="patientDetails">
              <h1>Medication</h1>
              <div className="patientBox">
                <Table columns={patientMedication} dataSource={medicines} />
              </div>
            </div>
          </div>
        ) : null}
        <div>
          {user?.userType === "admin" ? (
            <div className="patientDetails">
              <h1>Doctor Details</h1>
              <div className="patientBox">
                <Table columns={doctorColumns} dataSource={doctors} />
              </div>
            </div>
          ) : null}
          {user?.userType !== "patient" ? (
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
