const dbhelper = require("../configs/dbhelper");
const {
  createMedicineQuery,
  getMedFromPatientId,
} = require("../configs/queries/medicine");

const createMedicine = (array) => {
  console.log("received", array);
  return dbhelper.query(createMedicineQuery, array).then((result) => {
    console.log(result, "in db helper");
    return result[0];
  });
};

const getPatientMedicine = (id) => {
  return dbhelper.query(getMedFromPatientId, [id]).then((result) => {
    // console.log("in db helper", result);
    return result;
  });
};

module.exports = {
  createMedicine,
  getPatientMedicine,
};
