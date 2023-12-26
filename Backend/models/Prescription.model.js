const mongoose = require("mongoose");
const dbhelper = require("../configs/dbhelper");
const { createMedicineQuery } = require("../configs/queries/medicine");
const prescriptionSchema = mongoose.Schema({
  docName: {
    type: String,
    required: true,
  },

  nurseName: {
    type: String,
    required: true,
  },

  hospital: {
    name: {
      type: String,
      required: true,
    },
    address: {
      street: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      pincode: {
        type: Number,
        required: true,
      },
    },
    phone: {
      type: Number,
      required: true,
      minlength: 11,
    },
  },

  medicines: {
    diagnosis: {
      type: String,
    },
    medicineName: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    dosage: {
      quantity: {
        type: Number,
        required: true,
      },
      duration: {
        type: Number,
        required: true,
      },
    },
  },

  advice: {
    type: String,
  },

  total: {
    type: Number,
    required: true,
  },
});

const PrescriptionModel = mongoose.model("prescription", prescriptionSchema);

const createMedicine = (array) => {
  console.log("received", array);
  return dbhelper.query(createMedicineQuery, array).then((result) => {
    console.log(result, "in db helper");
    return result[0];
  });
};

module.exports = { createMedicine, PrescriptionModel, prescriptionSchema };
