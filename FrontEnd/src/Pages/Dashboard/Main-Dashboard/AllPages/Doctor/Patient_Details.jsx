import { Table } from "antd";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { GetPatients } from "../../../../../Redux/Datas/action";
import Sidebar from "../../GlobalFiles/Sidebar";
import Topbar from "../../GlobalFiles/Topbar";

const Patient_Details = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((store) => store.auth);
  const { patients } = useSelector((store) => store.data.patients);
  console.log(patients);
  const columns = [
    { title: "ID", dataIndex: "Id", key: "Id" },
    { title: "Patient Name", dataIndex: "Patient_Name", key: "Patient Name" },
    { title: "Date", dataIndex: "Date", key: "Date" },
    { title: "Checked By", dataIndex: "Checked_By", key: "Checked By" },
    { title: "Report Ref", dataIndex: "Report_Ref", key: "Report Ref" },
  ];

  const Datas = [
    {
      key: 1,
      Id: "ERFCE34",
      Patient_Name: "The Rock",
      Date: "12-09-2022",
      Checked_By: "Dr.Rajendra Patel",
      Report_Ref: "ERODEII334l",
    },
    {
      key: 2,
      Id: "ERFCE34",
      Patient_Name: "The Rock",
      Date: "12-09-2022",
      Checked_By: "Dr.Rajendra Patel",
      Report_Ref: "ERODEII334l",
    },
  ];

  if (data?.isAuthenticated === false) {
    return <Navigate to={"/"} />;
  }

  if (data?.user.userType !== "doctor") {
    return <Navigate to={"/dashboard"} />;
  }

  return (
    <>
      <div className="container">
        <Sidebar />
        <div className="AfterSideBar">
          <Topbar />
          <div className="Payment_Page">
            {/* <h1 style={{ marginBottom: "2rem" }}>Patient Details</h1> */}
            <div className="patientBox">
              <Table columns={columns} dataSource={Datas} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Patient_Details;
