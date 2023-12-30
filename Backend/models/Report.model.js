const dbhelper = require("../configs/dbhelper");
const {
  countReportQuery,
  createReportQuery,
  getLastReportIdQuery,
  getDoctorReportQuery,
  getPatientReportQuery,
} = require("../configs/queries/report");

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
  countReport,
  createReport,
  getLastReportId,
  getDoctorReports,
  getPatientReports,
};
