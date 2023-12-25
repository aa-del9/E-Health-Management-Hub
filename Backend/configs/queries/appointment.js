const countAppoinmentQuery = `SELECT COUNT(*) FROM appointments; `;
const createAppointmentQuery = `
INSERT INTO appointments (patientid, date, time, problem, doctorid)
VALUES (
    $1,
    $2,
    $3,
    $4,
    $5
  );`;
const getAppointmentFromPatientQuery = `SELECT * FROM appointments WHERE patientid = $1;`;
const getAppointmentFromDoctorQuery = `SELECT * FROM appointments WHERE doctorid = $1;`;
const findByIDQuery = `SELECT * FROM appointments WHERE id = $1;`;
const deleteAppointmentQuery = `DELETE FROM appointments WHERE id = $1;`;
module.exports = {
  deleteAppointmentQuery,
  countAppoinmentQuery,
  createAppointmentQuery,
  getAppointmentFromPatientQuery,
  getAppointmentFromDoctorQuery,
  findByIDQuery,
};
