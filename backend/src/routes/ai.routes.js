const express = require("express");

const router = express.Router();

const authenticate = require("../middleware/auth.middleware");
const aiController = require("../controllers/ai.controller");

router.post(
    "/analyze-symptoms",
    authenticate,
    aiController.analyzeSymptoms
);

module.exports = router;