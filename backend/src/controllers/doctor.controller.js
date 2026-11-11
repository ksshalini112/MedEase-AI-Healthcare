const asyncHandler = require("../utils/asyncHandler");
const doctorService = require("../services/doctor.service");

// =========================================
// Doctor Dashboard
// =========================================

const dashboard = asyncHandler(async (req, res) => {

    const data = await doctorService.getDashboard();

    res.status(200).json({

        success: true,

        message: "Doctor dashboard loaded successfully",

        data

    });

});


// =========================================
// Patient Details
// =========================================

const patientDetails = asyncHandler(async (req, res) => {

    const { conversationId } = req.params;

    const data =
        await doctorService.getPatientDetails(conversationId);

    res.status(200).json({

        success: true,

        message: "Patient details loaded successfully",

        data

    });

});


// =========================================
// Complete Consultation
// =========================================

const completeConsultation = asyncHandler(async (req, res) => {

    const { conversationId } = req.params;

    const data =
        await doctorService.completeConsultation(conversationId);

    res.status(200).json({

        success: true,

        message: "Consultation completed successfully",

        data

    });

});


module.exports = {

    dashboard,
    patientDetails,
    completeConsultation

};