import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { CreatePayment, CreateReport } from "../../../../../Redux/Datas/action";
import Sidebar from "../../GlobalFiles/Sidebar";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
const notify = (text) => toast(text);

const Discharge_and_Create_Slip = () => {
  const { data } = useSelector((store) => store.auth);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const initmed = {
    name: "",
    dosage: "",
    duration: "",
    frequency: "",
  };
  const [med, setMed] = useState(initmed);

  const [medicines, setMedicines] = useState([]);

  const HandleMedChange = (e) => {
    setMed({ ...med, [e.target.name]: e.target.value });
  };
  const InitData = {
    patientid: 1,
    doctorid: 1,
    date: "",
    time: "",
    disease: "",
    temperature: "",
    weight: "",
    BP: "",
    glucose: "",
    info: "",
    medicines: [],
  };

  const [ReportValue, setReportValue] = useState(InitData);

  const HandleReportChange = (e) => {
    setReportValue({ ...ReportValue, [e.target.name]: e.target.value });
  };

  const HandleMedAdd = (e) => {
    e.preventDefault();
    setMedicines([...medicines, med]);
    setMed(initmed);
  };

  console.log(medicines);

  const HandleReportSubmit = (e) => {
    e.preventDefault();
    let data = {
      ...ReportValue,
      medicines,
    };
    try {
      console.log("reports", data);
      setLoading(true);
      dispatch(CreateReport(data)).then((res) => {
        if (res.message === "successful") {
          notify("Report Created Sucessfully");
          setLoading(false);
          setReportValue(InitData);
        } else {
          setLoading(false);
          notify("Something went Wrong");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (data?.isAuthenticated === false) {
    return <Navigate to={"/"} />;
  }

  if (data?.user.userType !== "doctor") {
    return <Navigate to={"/dashboard"} />;
  }
  return (
    <>
      <ToastContainer />
      <div className="container">
        <Sidebar />
        <div className="AfterSideBar">
          <div className="Main_Add_Doctor_div">
            <h1>Create Report</h1>
            <form>
              <div>
                <label>Date</label>
                <div className="inputdiv">
                  <input
                    type="date"
                    placeholder="dd-mm-yyyy"
                    name="date"
                    value={ReportValue.date}
                    onChange={HandleReportChange}
                  />
                </div>
              </div>
              <div>
                <label>Time</label>
                <div className="inputdiv">
                  <input
                    type="time"
                    name="time"
                    value={ReportValue.time}
                    onChange={HandleReportChange}
                  />
                </div>
              </div>

              <div>
                <label>Patient Disease</label>
                <div className="inputdiv">
                  <input
                    type="text"
                    placeholder="Disease"
                    name="disease"
                    value={ReportValue.disease}
                    onChange={HandleReportChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label>Patient Temperature</label>
                <div className="inputdiv">
                  <input
                    type="number"
                    placeholder="99^F"
                    name="temperature"
                    value={ReportValue.temperature}
                    onChange={HandleReportChange}
                  />
                </div>
              </div>

              <div>
                <label>Patient Weight</label>
                <div className="inputdiv">
                  <input
                    type="number"
                    placeholder="75 KG"
                    name="weight"
                    value={ReportValue.weight}
                    onChange={HandleReportChange}
                  />
                </div>
              </div>
              <div>
                <label>Patient BP</label>
                <div className="inputdiv adressdiv">
                  <input
                    type="text"
                    placeholder="140/90 mmHg"
                    name="BP"
                    value={ReportValue.BP}
                    onChange={HandleReportChange}
                  />
                </div>
              </div>
              <div>
                <label>Patient Glucose</label>
                <div className="inputdiv">
                  <input
                    type="number"
                    placeholder="99 mg/dL"
                    name="glucose"
                    value={ReportValue.glucose}
                    onChange={HandleReportChange}
                  />
                </div>
              </div>
              <div>
                <label>Extra Info</label>
                <div className="inputdiv">
                  <input
                    type="text"
                    placeholder="Info"
                    name="info"
                    value={ReportValue.info}
                    onChange={HandleReportChange}
                  />
                </div>
              </div>
              {/* ******************************************** */}
              <div>
                <label>Medicines</label>
                <div className="inputdiv">
                  <input
                    type="text"
                    placeholder="PCM"
                    name="name"
                    value={med.name}
                    onChange={HandleMedChange}
                  />
                  <input
                    type="text"
                    placeholder="frequency"
                    name="frequency"
                    value={med.frequency}
                    onChange={HandleMedChange}
                  />
                  {/* <select name="duration" onChange={HandleMedChange}> */}
                  {/* <option value="Dosage">Duration</option>
                    <option value="After Meal">After Meal</option>
                    <option value="Before Meal">Before Meal</option>
                  </select> */}
                  <input
                    type="number"
                    placeholder="Duration(Days)"
                    name="duration"
                    value={med.duration}
                    onChange={HandleMedChange}
                  />
                  <select name="dosage" onChange={HandleMedChange}>
                    <option value="Dosage">Dosage</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                  {/* <input type="submit" value={"Add"} onClick={HandleMedAdd} /> */}
                  <button className="addbutton" onClick={HandleMedAdd}>
                    {"Add"}
                  </button>
                </div>
              </div>
              {/* *********************************** */}

              <button
                className="formsubmitbutton bookingbutton"
                onClick={HandleReportSubmit}
              >
                {loading ? "Loading..." : "Generate Report"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Discharge_and_Create_Slip;
