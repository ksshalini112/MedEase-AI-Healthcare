const express = require("express");

const router = express.Router();

const authenticate = require("../middleware/auth.middleware");
const patientController = require("../controllers/patient.controller");

router.post(
    "/profile",
    authenticate,
    patientController.createProfile
);

router.get(
    "/profile",
    authenticate,
    patientController.getProfile
);

router.put(
    "/profile",
    authenticate,
    patientController.updateProfile
);

module.exports = router;