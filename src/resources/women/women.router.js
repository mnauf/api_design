const express = require("express")
const router = express.Router()
const womenController = require("./women.controllers")

router.post("/find",womenController.read)
router.post("/",womenController.createOne)


module.exports = router;
