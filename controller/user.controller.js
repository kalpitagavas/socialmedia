const { userModel } = require("../model/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Register = async (req, res) => {
  const { name, email, password, gender } = req.body;
  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      const user = new userModel({
        email,
        password: hash,
        gender,
        name,
      });
      await user.save();
      res.status(200).send({ msg: "Registration Successfull" });
    });
  } catch (err) {
    res.status(400).send({ msg: err.msg });
  }
};

const Login = async (req, res) => {
  const { email, pass } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          res
            .status(200)
            .send({
              "msg": "Login Successfull",
              "token": jwt.sign({ "userID": user._id }, "socialm"),
            });
        } else {
          res.status(400).send({ msg: "Invalid Credentials" });
        }
      });
    }
  } catch (err) {
    res.status(400).send({ msg: err.msg });
  }
};

module.exports = { Login, Register };
