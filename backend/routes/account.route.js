const express = require("express");
const router = express.Router();
const memberController = require("../controller/member.controller");

router.route("/login").post(memberController.login);

router.route("/register").post(memberController.register);

router.route("/editdata").post(memberController.editdata);

router.route("/getdata/:id").get(memberController.getdata);

router.route("/delete/:id").delete(memberController.delete);

module.exports = router;
