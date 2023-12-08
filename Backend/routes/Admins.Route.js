const express = require("express");
const {
  AdminModel,
  AdminCredModel,
  findIfExists,
  createTables,
  addAdmin,
  getCreds,
  findCred,
} = require("../models/Admin.model");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { NurseModel } = require("../models/Nurse.model");
const { DoctorModel } = require("../models/Doctor.model");
const { PatientModel } = require("../models/Patient.model");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    //const admins = await AdminModel.find();
    await createTables();
    res.status(200).send("admin table exists or created");
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong" });
  }
});

router.post("/register", async (req, res) => {
  try {
    await createTables();
    const admin = await findIfExists(req.body.email);
    console.log(admin);
    // const admin = await AdminModel.findOne({ email });
    if (admin.length > 0) {
      return res.send({
        message: "Admin already exists",
      });
    }
    const value = req.body;
    // console.log(value);
    //let value = new AdminModel(req.body);
    // await value.save();
    await addAdmin(value);
    // const data = await AdminModel.findOne({ email });
    const data = await findIfExists(req.body.email);

    const email = data[0].email;
    console.log(email);
    return res.send({ email, message: "Registered" });
  } catch (error) {
    res.send({ message: "error" });
  }
});

router.post("/login", async (req, res) => {
  const { adminID, password } = req.body;
  //console.log({ adminID, password });
  try {
    const admin = await findCred(adminID);
    //const admin = await AdminModel.findOne({ adminID, password });
    if (
      admin.length > 0 &&
      adminID == admin[0].id &&
      password == admin[0].password
    ) {
      const token = jwt.sign({ foo: "bar" }, process.env.KEY, {
        expiresIn: "24h",
      });
      res.send({
        message: "Successful",
        user: { ...admin[0], userType: "admin" },
        token: token,
      });
    } else {
      res.send({ message: "Wrong credentials" });
    }
  } catch (error) {
    console.log({ message: "Error" });
    console.log(error);
  }
});

router.patch("/:adminId", async (req, res) => {
  const id = req.params.adminId;
  const payload = req.body;
  try {
    const admin = await AdminModel.findByIdAndUpdate({ _id: id }, payload);
    if (!admin) {
      res.status(404).send({ msg: `Admin with id ${id} not found` });
    }
    res.status(200).send(`Admin with id ${id} updated`);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong, unable to Update." });
  }
});

router.delete("/:adminId", async (req, res) => {
  const id = req.params.adminId;
  try {
    const admin = await AdminModel.findByIdAndDelete({ _id: id });
    if (!admin) {
      res.status(404).send({ msg: `Admin with id ${id} not found` });
    }
    res.status(200).send(`Admin with id ${id} deleted`);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong, unable to Delete." });
  }
});

router.post("/password", async (req, res) => {
  //TODO
  //const { email, userId, password } = req.body;
  console.log(req.body);
  const creds = await getCreds(req.body.email);
  console.log(creds);
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "aadel.sheikh34@gmail.com",
      pass: "passingword1395",
    },
  });

  const mailOptions = {
    from: "aadel.sheikh34@gmail.com",
    to: "aadel.sheikh34@gmail.com",
    subject: "Account ID and Password",
    text: "This is your User Id : ${creds[0].id} and  Password : ${creds[0].password} .",
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.send(error);
    }
    console.log(info.messageId);
    return res.send("Password reset email sent", info.messageId);
  });
});

router.post("/forgot", async (req, res) => {
  const { email, type } = req.body;
  let user;
  let userId;
  let password;

  if (type == "nurse") {
    user = await NurseModel.find({ email });
    userId = user[0]?.nurseID;
    password = user[0]?.password;
  }
  if (type == "patient") {
    user = await PatientModel.find({ email });
    userId = user[0]?.nurseID;
    password = user[0]?.password;
  }

  if (type == "admin") {
    user = await AdminModel.find({ email });
    userId = user[0]?.adminID;
    password = user[0]?.password;
  }

  if (type == "doctor") {
    user = await DoctorModel.find({ email });
    userId = user[0]?.docID;
    password = user[0]?.password;
  }

  if (!user) {
    return res.send({ message: "User not found" });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "agrawaljoy1@gmail.com",
      pass: "zxkyjqfuhiizmxrg",
    },
  });

  const mailOptions = {
    from: "agrawaljoy1@gmail.com",
    to: email,
    subject: "Account ID and Password",
    text: `This is your User Id : ${userId} and  Password : ${password} .`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.send(error);
    }
    return res.send("Password reset email sent");
  });
});

module.exports = router;
