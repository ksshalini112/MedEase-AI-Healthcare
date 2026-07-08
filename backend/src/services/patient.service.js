const Patient = require("../models/patient.model");

class PatientService {

    async createProfile(userId, profileData) {

        const existingProfile = await Patient.findOne({ userId });

        if (existingProfile) {
            throw new Error("Patient profile already exists");
        }

        const patient = await Patient.create({
            userId,
            ...profileData
        });

        return patient;
    }

    async getProfile(userId) {

        const patient = await Patient.findOne({ userId })
            .populate("userId", "name email phone role");

        if (!patient) {
            throw new Error("Patient profile not found");
        }

        return patient;
    }

    async updateProfile(userId, profileData) {

        const patient = await Patient.findOneAndUpdate(
            { userId },
            profileData,
            {
                new: true,
                runValidators: true
            }
        );

        if (!patient) {
            throw new Error("Patient profile not found");
        }

        return patient;
    }

}

module.exports = new PatientService();