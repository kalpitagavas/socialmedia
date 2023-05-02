const express = require("express");
const {Login,Register}=require("../controller/user.controller")
const userRouter = express.Router();

userRouter.post("/register", Register);

userRouter.post("/login", Login);

module.exports = { userRouter };
