import * as types from "./types";
import axios from "axios";

// CreateReport
export const CreateReport = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.CREATE_REPORT_REQUEST });
    const res = await axios.post("http://127.0.0.1:3001/reports/create", data);
    console.log(res);
    return res.data;
    // dispatch({
    //   type: types.CREATE_REPORT_SUCCESS,
    //   payload: {
    //
    //   },
    // });
  } catch (error) {
    dispatch({
      type: types.CREATE_REPORT_ERROR,
      payload: {
        message: error,
      },
    });
  }
};

// GET DOCTOR DETAILS
export const GetDoctorDetails = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_DOCTOR_REQUEST });
    const res = await axios.get("http://127.0.0.1:3001/doctors");
    console.log("this", res);
    const doctors = { doctors: res.data };
    dispatch({
      type: types.GET_DOCTOR_SUCCESS,
      payload: doctors,
    });
  } catch (error) {
    dispatch({
      type: types.GET_DOCTOR_ERROR,
      payload: {
        message: error,
      },
    });
  }
};

export const GetAdminDetails = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_ADMIN_REQUEST });
    const res = await axios.get("http://127.0.0.1:3001/admin");
    console.log(res.data);
    const admins = { admins: res.data };
    dispatch({
      type: types.GET_ADMIN_SUCCESS,
      payload: admins,
    });
  } catch (error) {
    dispatch({
      type: types.GET_ADMIN_ERROR,
      payload: {
        message: error,
      },
    });
  }
};

export const GetMedicineDetails = (patientid) => async (dispatch) => {
  try {
    dispatch({ type: types.GET_MEDICINE_REQUEST });
    const res = await axios.post(
      `http://127.0.0.1:3001/prescriptions/${patientid}`
    );
    //axios.post
    console.log(res.data);
    const medicines = { medicines: res.data };
    dispatch({
      type: types.GET_MEDICINE_SUCCESS,
      payload: medicines,
    });
  } catch (error) {
    console.log(error);
  }
};

//CREATE BOOKING
export const CreateBooking = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.CREATE_BOOKING_REQUEST });
    const res = await axios.post(
      `http://127.0.0.1:3001/appointments/create`,
      data
    );
    console.log(res);
    return res.data;
    // dispatch({ type: types.CREATE_BOOKING_SUCCESS, payload: res.data.postData });
  } catch (error) {
    console.log(error);
  }
};

// GET ALL PATIENT
export const GetPatients = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_PATIENT_REQUEST });
    const res = await axios.get(`http://127.0.0.1:3001/patients`);
    console.log("pats", res);
    const patients = { patients: res.data };
    dispatch({
      type: types.GET_PATIENT_SUCCESS,
      payload: patients,
    });
  } catch (error) {
    dispatch({
      type: types.GET_PATIENT_ERROR,
      payload: {
        message: error,
      },
    });
  }
};

// GET ALL DATA
export const GetAllData = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_ALLDATA_REQUEST });
    const res = await axios.get(`http://127.0.0.1:3001/hospitals`);
    console.log(res.data);
    dispatch({
      type: types.GET_ALLDATA_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

// GET ALL APPOINTMENT DETAILS
export const GetAppointments = (userType, id) => async (dispatch) => {
  try {
    dispatch({ type: types.GET_APPOINTMENT_DETAILS_REQUEST });
    const res = await axios.get(
      `http://127.0.0.1:3001/appointments/${userType}/${id}`
    );
    console.log("res", res.data);
    // return res.data;
    const appointments = { appointments: res.data.data };
    dispatch({
      type: types.GET_APPOINTMENT_DETAILS_SUCCESS,
      payload: appointments,
    });
  } catch (error) {
    console.log(error);
  }
};

// DELETE APPOINTMENTS
export const DeleteAppointment = (id) => async (dispatch) => {
  try {
    dispatch({ type: types.DELETE_APPOINTMENT_REQUEST });
    const res = await axios.delete(`http://127.0.0.1:3001/appointments/${id}`);
    console.log(res.data);
    // return res.data;
    dispatch({
      type: types.DELETE_APPOINTMENT_SUCCESS,
      payload: id,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const GetAllReports = (userType, id) => async (dispatch) => {
  try {
    console.log("action :", userType, id);
    dispatch({ type: types.GET_REPORTS_REQUEST });
    const res = await axios.get(
      `http://127.0.0.1:3001/reports/${userType}/${id}`
    );
    console.log("res", res.data);
    const reports = { reports: res.data.data };
    dispatch({
      type: types.GET_REPORTS_SUCCESS,
      payload: reports,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
