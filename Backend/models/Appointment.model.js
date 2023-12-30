const dbhelper = require("../configs/dbhelper");
const {
  countAppoinmentQuery,
  createAppointmentQuery,
  getAppointmentFromPatientQuery,
  getAppointmentFromDoctorQuery,
  deleteAppointmentQuery,
  findByIDQuery,
} = require("../configs/queries/appointment");

const countAppointment = () => {
  return dbhelper.query(countAppoinmentQuery, []).then((result) => {
    console.log(result, "in db helper");
    return result[0];
  });
};

const findById = (id) => {
  return dbhelper.query(findByIDQuery, [id]).then((result) => {
    console.log(result, "in db helper");
    return result;
  });
};

const deleteAppointment = (id) => {
  return dbhelper.query(deleteAppointmentQuery, [id]).then((result) => {
    console.log(result, "in db helper");
    return result;
  });
};

const getAppointmentFromPatient = (id) => {
  return dbhelper.query(getAppointmentFromPatientQuery, [id]).then((result) => {
    //console.log(result, "in db helper");
    return result;
  });
};

const getAppointmentFromDoctor = (id) => {
  return dbhelper.query(getAppointmentFromDoctorQuery, [id]).then((result) => {
    // console.log(result, "in db helper");
    return result;
  });
};
const createAppointment = (data) => {
  const array = Object.values(data);
  console.log(array);
  return dbhelper.query(createAppointmentQuery, array).then((result) => {
    console.log(result, "in db helper");
    return result;
  });
};
module.exports = {
  getAppointmentFromPatient,
  createAppointment,
  countAppointment,
  getAppointmentFromDoctor,
  deleteAppointment,
  findById,
};
