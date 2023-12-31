import React, { useState, useEffect } from "react";
import "./CSS/Book_appointment.css";
import { useDispatch, useSelector } from "react-redux";
import {
  CreateBooking,
  GetDoctorDetails,
} from "../../../../../Redux/Datas/action";
import Sidebar from "../../GlobalFiles/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const notify = (text) => toast(text);

const Book_Appointment = () => {
  const dispatch = useDispatch();
  const [Loading, setLoading] = useState(false);
  const {
    data: { user },
  } = useSelector((state) => state.auth);
  const [chosenDoctor, setChosenDoctor] = useState(null);
  const InitValue = {
    patientId: user.id,
    docemail: "",
    date: "",
    time: "",
  };

  const handleDoctor = (e) => {
    console.log(e.target.value);
    const doctor =
      e.target.value !== ""
        ? doctors.find((doctor) => doctor.name === e.target.value)
        : null;
    setChosenDoctor(doctor);
    setBookAppoint({ ...BookAppoint, docemail: doctor.email });
    console.log("chosen", chosenDoctor);
  };
  console.log("chosen", chosenDoctor);
  const { doctors } = useSelector((store) => store.data.doctors);
  console.log(doctors);
  const [BookAppoint, setBookAppoint] = useState(InitValue);
  useEffect(() => {
    dispatch(GetDoctorDetails());
  }, []);
  const HandleAppointment = (e) => {
    console.log(e.target.name, e.target.value);
    setBookAppoint({ ...BookAppoint, [e.target.name]: e.target.value });
  };

  const HandleDepartment = (e) => {
    setBookAppoint({ ...BookAppoint, department: e.target.value });
    setChosenDoctor(null);
  };
  const HandleOnSubmitAppointment = (e) => {
    console.log(BookAppoint);
    e.preventDefault();
    setLoading(true);
    delete BookAppoint.department;
    console.log(BookAppoint);
    dispatch(CreateBooking(BookAppoint)).then((res) => {
      console.log(res);
      if (res.message === "Successful") {
        setLoading(false);
        notify("Appointment Booked");
      } else {
        setLoading(false);
        notify("Something went wrong. Please try again");
      }
      setBookAppoint(InitValue);
    });
    setLoading(false);
    setBookAppoint(InitValue);
  };

  return (
    <>
      <ToastContainer />
      <div className="container">
        <Sidebar />
        <div className="AfterSideBar">
          <div className="Main_Add_Doctor_div">
            <h1>Book Appointment</h1>
            <h2>Choose a Doctor</h2>
            <form onSubmit={HandleOnSubmitAppointment}>
              {/* DEPARTMENT SECTION */}

              <div>
                <label>Department</label>
                <div className="inputdiv">
                  <select
                    name="department"
                    value={BookAppoint.department}
                    onChange={HandleDepartment}
                    required
                  >
                    <option value="">Select</option>
                    <option value="Cardiology">Cardiology</option>
                    <option value="Neurology">Neurology</option>
                    <option value="ENT">ENT</option>
                    <option value="Ophthalmologist">Ophthalmologist</option>
                    <option value="Anesthesiologist">Anesthesiologist</option>
                    <option value="Dermatologist">Dermatologist</option>
                    <option value="Oncologist">Oncologist</option>
                    <option value="Psychiatrist">Psychiatrist</option>
                  </select>
                </div>
              </div>
              <div>
                <label>Doctor</label>
                <div className="inputdiv">
                  <select
                    name="doctor"
                    value={BookAppoint.docname}
                    onChange={handleDoctor}
                    required
                  >
                    <option value="">Select</option>
                    {doctors.map((doctor) =>
                      doctor.department === BookAppoint.department ? (
                        <option key={doctor.name} value={doctor.name}>
                          {doctor.name}
                        </option>
                      ) : null
                    )}
                  </select>
                </div>
              </div>
              {/* Fees PlaceHolder */}
              <div>
                <label>Fees</label>
                <div className="inputdiv">
                  <input
                    type="number"
                    placeholder="Fees"
                    name="fees"
                    value={chosenDoctor?.fees || ""}
                    readOnly
                  />
                </div>
              </div>

              {/* Problem PlaceHolder */}
              <div>
                <label>Problem</label>
                <div className="inputdiv">
                  <input
                    type="text"
                    placeholder="Problem"
                    name="problem"
                    onChange={HandleAppointment}
                    value={BookAppoint.docname}
                  />
                </div>
              </div>
              {/* APPOINTMENT DATE  */}
              <div className="dateofAppointment">
                <p>Date and Time </p>
                <div className="inputdiv">
                  <input
                    type={"date"}
                    placeholder="Choose Date"
                    name="date"
                    value={BookAppoint.date}
                    onChange={HandleAppointment}
                    required
                  />

                  <select
                    name="time"
                    value={BookAppoint.time}
                    onChange={HandleAppointment}
                    required
                  >
                    <option value="">Select Time</option>
                    {chosenDoctor !== null
                      ? chosenDoctor?.availability.map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))
                      : null}
                  </select>
                </div>
              </div>

              <button type="submit" className="book_formsubmitbutton">
                {Loading ? "Loading..." : "Book Appointment"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Book_Appointment;
