import * as types from "./types";

const initialState = {
  loading: false,
  error: false,
  reports: [],
  doctors: [],
  patients: [],
  medicines: [],
  dashboard: [],
  appointments: [],
};

export default function dataReducer(state = initialState, { type, payload }) {
  switch (type) {
    case types.GET_PATIENT_SUCCESS:
      return {
        ...state,
        loading: false,
        patients: payload,
      };
    case types.GET_DOCTOR_SUCCESS:
      return {
        ...state,
        loading: false,
        doctors: payload,
      };

    case types.GET_ADMIN_SUCCESS:
      console.log(payload);
      return {
        ...state,
        loading: false,
        admins: payload,
      };

    case types.GET_MEDICINE_SUCCESS:
      return {
        ...state,
        loading: false,
        medicines: payload,
      };

    case types.GET_ALLDATA_SUCCESS:
      return {
        ...state,
        loading: false,
        dashboard: payload,
      };
    case types.DELETE_APPOINTMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        appointments: state.appointments.filter((ele) => ele._id !== payload),
      };
    case types.GET_APPOINTMENT_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        appointments: payload,
      };
    case types.GET_REPORTS_SUCCESS:
      return {
        ...state,
        loading: false,
        reports: payload,
      };

    default:
      return state;
  }
}
