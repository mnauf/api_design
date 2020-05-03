const express = require("express")
const router = express.Router()
const womenController = require("./women.controllers")

router.get("/",womenController.apiGET)
router.post("/",womenController.apiPOST)
router.put("/",womenController.apiPUT)
router.delete("/",womenController.apiDELETE)


module.exports = router;
