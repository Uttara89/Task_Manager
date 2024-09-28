const express = require("express");
const taskContoller = require("../controller/controller")


const router = express.Router();
router.route("/").get(taskContoller.getAllTask).post(taskContoller.creatTask);

router.route("/:id").get(taskContoller.getOneTask);
 
module.exports = router;