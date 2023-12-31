const express = require("express");
const {
  findIfExists,
  createTables,
  addAdmin,
  getAdminCredsFromEmail,
  findCred,
  updatePass,
  getAllAdmins,
} = require("../models/Admin.model");
const { getDoctorCredFromEmail } = require("../models/Doctor.model");
const { getPatientCredFromEmail } = require("../models/Patient.model");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    await createTables();
    const admins = await getAllAdmins();
    console.log(admins);
    res.status(200).send(admins);
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
    if (admin.length > 0) {
      return res.send({
        message: "Admin already exists",
      });
    }
    const value = req.body;
    await addAdmin(value);
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
  try {
    const admin = await findCred(adminID);
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
  const password = req.body.password;
  try {
    await updatePass(password, id);
    const admin = await findCred(id);
    if (admin[0].password === password) {
      return res.status(200).send({
        message: "password updated",
        user: { ...admin[0], userType: "admin" },
      });
    } else {
      return res.status(404).send({ message: `password not updated` });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Serror" });
  }
});

router.post("/verification", async (req, res) => {
  console.log(req.body);
  const verificationCode = Math.floor(1000 + Math.random() * 9000);
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_MAIL, // generated gmail user
      pass: process.env.SMTP_PASSWORD, // generated gmail password
    },
  });

  var mailOptions = {
    from: process.env.SMTP_MAIL,
    to: req.body.email,
    subject: "Verification Code",
    text: `Your verification code is: ${verificationCode} .`,
  };

  transporter.sendMail(mailOptions, async (error, info) => {
    if (error) {
      console.log("error sending email", error);
      return res.send({ message: "error" });
    }
    console.log(info.messageId);
    res.status(200).send({ message: "successful", code: verificationCode });
  });
});

router.post("/mailCreds", async (req, res) => {
  try {
    console.log(req.body);
    const user = req.body;
    const creds =
      user.userType === "admin"
        ? await getAdminCredsFromEmail(req.body.email)
        : user.userType === "doctor"
        ? await getDoctorCredFromEmail(req.body.email)
        : await getPatientCredFromEmail(req.body.email);
    console.log("creds", creds);
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_MAIL, // generated user
        pass: process.env.SMTP_PASSWORD, // generated password
      },
    });

    var mailOptions = {
      from: process.env.SMTP_MAIL,
      to: user.email,
      subject: "Account ID and Password",
      text: `Your login id is ${creds[0].id} and password is ${creds[0].password}`,
    };

    transporter.sendMail(mailOptions, async (error, info) => {
      if (error) {
        console.log(error);
        return res.send({ message: "error" });
      }
      console.log(info.messageId);
      return res.status(200).send({ message: "successful" });
    });
  } catch (error) {
    res.send({ message: "error" });
  }
});

router.post("/forgot", async (req, res) => {
  // const { email, type } = req.body;
  // let user;
  // let userId;
  // let password;
  // if (type == "patient") {
  //   user = await patientModel.find({ email });
  //   userId = user[0]?.patientID;
  //   password = user[0]?.password;
  // }
  // if (type == "patient") {
  //   user = await PatientModel.find({ email });
  //   userId = user[0]?.patientID;
  //   password = user[0]?.password;
  // }
  // if (type == "admin") {
  //   user = await AdminModel.find({ email });
  //   userId = user[0]?.adminID;
  //   password = user[0]?.password;
  // }
  // if (type == "doctor") {
  //   user = await DoctorModel.find({ email });
  //   userId = user[0]?.docID;
  //   password = user[0]?.password;
  // }
  // if (!user) {
  //   return res.send({ message: "User not found" });
  // }
  // const transporter = nodemailer.createTransport({
  //   host: process.env.SMTP_HOST,
  //   port: process.env.SMTP_PORT,
  //   secure: false, // true for 465, false for other ports
  //   auth: {
  //     user: process.env.SMTP_MAIL, // generated user
  //     pass: process.env.SMTP_PASSWORD, // generated password
  //   },
  // });
  // const mailOptions = {
  //   from: "agrawaljoy1@gmail.com",
  //   to: email,
  //   subject: "Account ID and Password",
  //   text: `This is your User Id : ${userId} and  Password : ${password} .`,
  // };
  // transporter.sendMail(mailOptions, (error, info) => {
  //   if (error) {
  //     return res.send(error);
  //   }
  //   return res.send("Password reset email sent");
  // });
});

module.exports = router;
