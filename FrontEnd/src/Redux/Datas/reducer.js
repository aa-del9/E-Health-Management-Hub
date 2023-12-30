import * as types from "./types";

const initialState = {
  loading: false,
  error: false,
  reports: [],
  beds: [],
  doctors: [],
  patients: [],
  medicines: [],
  nurses: [],
  dashboard: [],
  Appointments: [],
};

export default function dataReducer(state = initialState, { type, payload }) {
  switch (type) {
    case types.GET_BED_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.GET_BED_SUCCESS:
      return {
        ...state,
        loading: false,
        beds: payload,
      };
    case types.GET_PATIENT_SUCCESS:
      //console.log("in he", payload);
      return {
        ...state,
        loading: false,
        patients: payload,
      };
    case types.GET_DOCTOR_SUCCESS:
      // console.log("in she data", payload);
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
    case types.DISCHARGE_PATIENT_SUCCESS:
      let data = state.beds.map((ele) => {
        if (ele._id === payload.bed._id) {
          return payload.bed;
        }
        return ele;
      });
    case types.DELETE_APPOINTMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        Appointments: state.Appointments.filter((ele) => ele._id !== payload),
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
