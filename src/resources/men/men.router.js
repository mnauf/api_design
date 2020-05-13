const express = require("express")
const router = express.Router()
const menController = require("./men.controllers")


router.post("/find",menController.read)
router.post("/",menController.createOne)


module.exports = router;
