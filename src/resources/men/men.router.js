const express = require("express")
const router = express.Router()
const menController = require("./men.controllers")

router.get("/",menController.apiGET)
router.post("/",menController.apiPOST)
router.put("/",menController.apiPUT)
router.delete("/",menController.apiDELETE)


module.exports = router;
