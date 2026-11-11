const aiParser = require("../utils/aiParser");

const aiConversationService = require("../services/aiConversation.service");
const geminiService = require("../ai/gemini.service");
const asyncHandler = require("../utils/asyncHandler");
const aiFollowupService = require("../services/aiFollowup.service");


// =====================================================
// GET CONVERSATION
// =====================================================

const getConversation = asyncHandler(async (req, res) => {

    const { conversationId } = req.params;

    const conversation =
        await aiFollowupService.getConversation(
            conversationId
        );

    res.status(200).json({

        success: true,

        data: conversation

    });

});


// =====================================================
// ANALYZE SYMPTOMS
// =====================================================

const analyzeSymptoms = asyncHandler(async (req, res) => {

    const {
        message,
        medicalInfo
    } = req.body;


    // Validate message
    if (!message) {

        return res.status(400).json({

            success: false,

            message: "Message is required"

        });

    }


    // -----------------------------------------
    // Get Patient Profile
    // -----------------------------------------

    const Patient =
        require("../models/patient.model");

    const patientProfile =
        await Patient.findOne({

            userId: req.user.id

        });


    // -----------------------------------------
    // Combine Patient Information
    // -----------------------------------------

    const existingProfile =
        patientProfile
            ? patientProfile.toObject()
            : {};

    const completePatientProfile = {

        ...existingProfile,

        ...(medicalInfo || {})

    };


    console.log(
        "========== AI ANALYSIS =========="
    );

    console.log(
        "User ID:",
        req.user.id
    );

    console.log(
        "Message:",
        message
    );

    console.log(
        "Medical Info:",
        medicalInfo
    );

    console.log(
        "Patient Profile:",
        completePatientProfile
    );

    console.log(
        "================================="
    );


    // -----------------------------------------
    // Gemini Analysis
    // -----------------------------------------

    const aiResponse =
        await geminiService.analyzeSymptoms(

            message,

            completePatientProfile

        );


    console.log(
        "Gemini Response:",
        aiResponse
    );


    // -----------------------------------------
    // Parse Gemini Response
    // -----------------------------------------

    const parsedResponse =
        aiParser.parse(aiResponse);


    console.log(
        "Parsed AI Response:",
        parsedResponse
    );


    // -----------------------------------------
    // Create AI Conversation
    // -----------------------------------------

    const conversation =
        await aiConversationService.createSession(

            req.user.id,

            message,

            parsedResponse

        );


    // -----------------------------------------
    // Send Response
    // -----------------------------------------

    return res.status(200).json({

        success: true,

        message:
            "Symptoms analyzed successfully",

        conversationId:
            conversation._id,

        data:
            parsedResponse

    });

});


// =====================================================
// SUBMIT FOLLOW-UP
// =====================================================

const submitFollowup = asyncHandler(async (req, res) => {

    const {
        conversationId,
        answers
    } = req.body;


    // -----------------------------------------
    // Validate Conversation ID
    // -----------------------------------------

    if (!conversationId) {

        return res.status(400).json({

            success: false,

            message:
                "Conversation ID is required"

        });

    }


    // -----------------------------------------
    // Validate Answers
    // -----------------------------------------

    if (
        !answers ||
        !Array.isArray(answers) ||
        answers.length === 0
    ) {

        return res.status(400).json({

            success: false,

            message:
                "Answers are required"

        });

    }


    // -----------------------------------------
    // Save Answers
    // -----------------------------------------

    await aiFollowupService.saveAnswers(

        conversationId,

        answers

    );


    // -----------------------------------------
    // Get Updated Conversation
    // -----------------------------------------

    const conversation =
        await aiFollowupService.getConversation(

            conversationId

        );


    // -----------------------------------------
    // Generate Clinical Summary
    // -----------------------------------------

    const aiResponse =
        await geminiService.generateClinicalSummary(

            conversation

        );


    console.log(
        "Clinical Summary AI Response:",
        aiResponse
    );


    // -----------------------------------------
    // Parse Gemini Response
    // -----------------------------------------

    const parsedSummary =
        aiParser.parse(aiResponse);


    console.log(
        "========== Parsed Summary =========="
    );

    console.log(parsedSummary);

    console.log(
        "===================================="
    );


    // -----------------------------------------
    // Save Clinical Summary
    // -----------------------------------------

    const updatedConversation =
        await aiFollowupService.updateClinicalSummary(

            conversationId,

            parsedSummary

        );


    // -----------------------------------------
    // Send Response
    // -----------------------------------------

    res.status(200).json({

        success: true,

        message:
            "Follow-up submitted successfully",

        data:
            updatedConversation

    });

});


// =====================================================
// EXPORT
// =====================================================

module.exports = {

    analyzeSymptoms,

    getConversation,

    submitFollowup

};