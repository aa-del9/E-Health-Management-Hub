import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAllReports } from "../../../../../Redux/Datas/action";
import Sidebar from "../../GlobalFiles/Sidebar";
import { useAuth } from "../../../../../Routes/AuthContext";

const AllReport = () => {
  const dispatch = useDispatch();
  const [Report, setReport] = useState();
  const { user } = useSelector((state) => state.auth);
  const { placement } = useAuth();
  const userType = placement;

  // useEffect(() => {

  //   dispatch(GetAllReports()).then((res) => {
  //     setReport(res);
  //   });
  // }, []);

  useEffect(() => {
    const fetchReports = () => {
      let fetchedReports;

      try {
        if (userType === "Doctor") {
          dispatch(GetAllReports()).then((res) => {
            fetchedReports = res;
            setReport(fetchedReports);
          });
        } else if (userType === "Patient" && user && user.email) {
          dispatch(GetAllReports({ patientEmail: user.email })).then((res) => {
            fetchedReports = res;
            setReport(fetchedReports);
          });
        }
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    };

    fetchReports();
  }, [dispatch, user?.email, userType]);

  return (
    <>
      <div className="container">
        <Sidebar />

        {/* ************************************ */}

        <div className="AfterSideBar">
          <div className="Payment_Page">
            <h1 style={{ marginBottom: "2rem" }}>All Reports</h1>
            <div className="patientBox">
              <table>
                <thead>
                  <tr>
                    <th>Patient Name</th>
                    <th>Department</th>
                    <th>Doctor Name</th>
                    <th>Patient Mobile</th>
                    <th>Patient Age</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {Report?.map((ele) => {
                    return (
                      <tr>
                        <td>{ele.patientName}</td>
                        <td>{ele.docDepartment}</td>
                        <td>{ele.docName}</td>
                        <td>{ele.patientMobile}</td>
                        <td>{ele.patientAge}</td>
                        <td>{ele.date}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllReport;
