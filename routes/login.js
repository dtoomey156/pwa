const express = require("express");
const {loginView, registerView} = require("../controllers/loginController");
const router = express.Router();


router.get("/login", loginView);
router.get("/register", registerView);

module.exports = router;