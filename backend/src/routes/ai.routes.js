const express = require("express");

const router = express.Router();

const authenticate = require("../middleware/auth.middleware");
const aiController = require("../controllers/ai.controller");
router.get(
    "/conversation/:conversationId",
    authenticate,
    aiController.getConversation
);

router.post(
    "/analyze-symptoms",
    authenticate,
    aiController.analyzeSymptoms
);
router.post(
    "/submit-followup",
    authenticate,
    aiController.submitFollowup
);
module.exports = router;