const express = require("express");

const router = express.Router();

const doctorController = require("../controllers/doctor.controller");


// Doctor Dashboard
router.get(
    "/dashboard",
    doctorController.dashboard
);


// Patient Details
router.get(
    "/patient/:conversationId",
    doctorController.patientDetails
);


// Complete Consultation
router.patch(
    "/consultation/:conversationId/complete",
    doctorController.completeConsultation
);


module.exports = router;