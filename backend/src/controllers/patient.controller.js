const patientService = require("../services/patient.service");

const createProfile = async (req, res) => {

    try {

        const patient = await patientService.createProfile(
            req.user.id,
            req.body
        );

        res.status(201).json({
            success: true,
            message: "Patient profile created successfully",
            data: patient
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }

};

const getProfile = async (req, res) => {

    try {

        const patient = await patientService.getProfile(req.user.id);

        res.json({
            success: true,
            data: patient
        });

    } catch (error) {

        res.status(404).json({
            success: false,
            message: error.message
        });

    }

};

const updateProfile = async (req, res) => {

    try {

        const patient = await patientService.updateProfile(
            req.user.id,
            req.body
        );

        res.json({
            success: true,
            message: "Profile updated successfully",
            data: patient
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    createProfile,
    getProfile,
    updateProfile
};