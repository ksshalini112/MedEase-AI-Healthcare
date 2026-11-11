const express = require("express");

const router = express.Router();

const authenticate = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware");

const reportController = require("../controllers/report.controller");

router.post(

    "/upload/:conversationId",

    authenticate,

    upload.single("report"),

    reportController.uploadReport

);

module.exports = router;