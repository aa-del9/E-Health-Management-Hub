const mongoose = require("mongoose");
const dbhelper = require("../configs/dbhelper");
const {
  countReportQuery,
  createReportQuery,
  getLastReportIdQuery,
  getDoctorReportQuery,
  getPatientReportQuery,
} = require("../configs/queries/report");

const reportSchema = mongoose.Schema({
  docName: {
    type: String,
    required: true,
  },

  docDepartment: {
    type: String,
    required: true,
  },

  docMobile: {
    type: Number,
    required: true,
  },

  medicines: [
    {
      medName: {
        type: String,
      },
      dosage: {
        type: Number,
      },
      duration: {
        type: String,
      },
    },
  ],

  extrainfo: {
    type: String,
  },

  patientName: {
    type: String,
    required: true,
  },

  patientAge: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  patientGender: {
    type: String,
    required: true,
  },

  patientMobile: {
    type: Number,
    required: true,
  },

  patientBloodGroup: {
    type: String,
    required: true,
  },

  patientDisease: {
    type: String,
  },

  patientTemperature: {
    type: Number,
  },

  patientWeight: {
    type: Number,
  },

  patientBP: {
    type: Number,
  },

  patientGlucose: {
    type: Number,
  },

  date: {
    type: String,
  },

  time: {
    type: String,
  },
});

const ReportModel = mongoose.model("report", reportSchema);

const countReport = () => {
  console.log(countReportQuery);
  return dbhelper.query(countReportQuery, []).then((result) => {
    console.log(result, "in db helper");
    return result[0];
  });
};

const createReport = (data) => {
  const array = Object.values(data);
  return dbhelper.query(createReportQuery, array).then((result) => {
    console.log(result, "in db helper");
    return result[0];
  });
};

const getLastReportId = () => {
  return dbhelper.query(getLastReportIdQuery, []).then((result) => {
    console.log(result, "in db helper");
    return result[0];
  });
};

const getDoctorReports = (id) => {
  return dbhelper.query(getDoctorReportQuery, [id]).then((result) => {
    // console.log(result, "in db helper");
    return result;
  });
};

const getPatientReports = (id) => {
  return dbhelper.query(getPatientReportQuery, [id]).then((result) => {
    //console.log(result, "in db helper");
    return result;
  });
};

module.exports = {
  ReportModel,
  countReport,
  createReport,
  getLastReportId,
  getDoctorReports,
  getPatientReports,
};
