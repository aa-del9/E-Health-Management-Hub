import { Table } from "antd";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../GlobalFiles/Sidebar";
import {
  GetAllData,
  GetPatients,
  GetDoctorDetails,
  GetAllReports,
} from "../../../../../Redux/Datas/action";

const AllReport = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetPatients());
    dispatch(GetDoctorDetails());
    dispatch(GetAllData());
    dispatch(GetAllReports(user?.userType, user.id));
  }, []);

  const { patients } = useSelector((store) => store.data.patients);
  const { doctors } = useSelector((store) => store.data.doctors);
  const { reports } = useSelector((store) => store.data.reports);
  const {
    dashboard: { data },
  } = useSelector((store) => store.data);
  const {
    data: { user },
  } = useSelector((state) => state.auth);

  console.log(data);
  console.log("patients", patients);
  console.log("doctors", doctors);
  console.log("reports", reports);

  console.log("report a gai ha", user);
  console.log(user.id);
  console.log(user.name);
  console.log("userType", user?.userType);

  let Name;
  if (user?.userType === "patient") {
    Name = "Doctor Name";
  } else {
    Name = "Patient Name";
  }

  const reportColumns = [
    { title: Name, dataIndex: "name", key: "name" },
    { title: "Date", dataIndex: "date", key: "date" },
    { title: "time", dataIndex: "time", key: "time" },
    { title: "Disease", dataIndex: "disease", key: "disease" },
    { title: "Temperature(F^0)", dataIndex: "temperature", key: "temperature" },
    { title: "Weight(kg)", dataIndex: "weight", key: "weight" },
    { title: "Bloodpressure(mmHg)", dataIndex: "bp", key: "bp" },
    { title: "Glucose", dataIndex: "glucose", key: "glucose" },
  ];

  return (
    <>
      <div className="container">
        <Sidebar />

        {/* ************************************ */}

        <div className="AfterSideBar">
          <h1 style={{ color: "rgb(184 191 234)" }}>Reports</h1>
          <div>
            {user?.userType !== "admin" ? (
              <div className="patientDetails">
                <div className="patientBox">
                  <Table columns={reportColumns} dataSource={reports} />
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default AllReport;
