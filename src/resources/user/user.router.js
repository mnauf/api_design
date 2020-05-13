const express = require("express")
const router = express.Router()
const authController = require("./user.controllers")

router.post("/signup",authController.signUp)
router.post("/login",authController.signIn)


module.exports = router;
