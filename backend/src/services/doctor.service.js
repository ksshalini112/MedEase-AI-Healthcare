const AIConversation = require("../models/aiConversation.model");
const User = require("../models/user.model");
const Patient = require("../models/patient.model");
const Report = require("../models/report.model");

class DoctorService {

    // =========================================
    // DOCTOR DASHBOARD
    // =========================================

    async getDashboard() {

        // Get all completed AI assessments
const conversations = await AIConversation
    .find({
        clinicalSummary: { $ne: null },
        status: { $ne: "Completed" }
    })
    .sort({ createdAt: -1 });

        const dashboard = {
            statistics: {
                critical: 0,
                high: 0,
                medium: 0,
                low: 0,
                totalWaiting: conversations.length
            },
            critical: [],
            high: [],
            medium: [],
            low: []
        };

        for (const conversation of conversations) {

            const user = await User.findById(conversation.patientId);

            const patient = await Patient.findOne({
                userId: conversation.patientId
            });

            // Waiting Time Calculation
            const diffMs = Date.now() - conversation.createdAt.getTime();

            const diffMinutes = Math.floor(diffMs / (1000 * 60));
            const diffHours = Math.floor(diffMinutes / 60);
            const diffDays = Math.floor(diffHours / 24);

            let waitingTime = "";

            if (diffMinutes < 60) {
                waitingTime = `${diffMinutes} mins`;
            }
            else if (diffHours < 24) {
                waitingTime = `${diffHours} hrs ${diffMinutes % 60} mins`;
            }
            else {
                waitingTime = `${diffDays} day(s)`;
            }

            const patientData = {

                conversationId: conversation._id,

                patientId: conversation.patientId,

                name: user?.name || "Unknown",

                email: user?.email || "",

                age: patient?.age || null,

                gender: patient?.gender || "Unknown",

                pregnant: patient?.pregnant || false,

                pregnancyWeeks: patient?.pregnancyWeeks || null,

                symptoms:
                    conversation.extractedSymptoms?.join(", ") ||
                    "Not Available",

                severity: conversation.severity || "Unknown",

                priority: conversation.priority || "Low",

                emergency: conversation.priority === "Critical",

                clinicalSummary:
                    conversation.clinicalSummary ||
                    "Not Available",

                waitingTime,

                createdAt: conversation.createdAt
            };

            switch (conversation.priority) {

                case "Critical":
                    dashboard.statistics.critical++;
                    dashboard.critical.push(patientData);
                    break;

                case "High":
                    dashboard.statistics.high++;
                    dashboard.high.push(patientData);
                    break;

                case "Medium":
                    dashboard.statistics.medium++;
                    dashboard.medium.push(patientData);
                    break;

                default:
                    dashboard.statistics.low++;
                    dashboard.low.push(patientData);
                    break;
            }
        }

        return dashboard;
    }


    // =========================================
    // PATIENT DETAILS FOR DOCTOR
    // =========================================

    async getPatientDetails(conversationId) {

        // -----------------------------------------
        // 1. Get AI Conversation
        // -----------------------------------------

        const conversation = await AIConversation.findById(
            conversationId
        );

        if (!conversation) {
            const error = new Error("AI conversation not found");
            error.statusCode = 404;
            throw error;
        }


        // -----------------------------------------
        // 2. Get User
        // -----------------------------------------

        const user = await User.findById(
            conversation.patientId
        );

        if (!user) {
            const error = new Error("Patient user not found");
            error.statusCode = 404;
            throw error;
        }


        // -----------------------------------------
        // 3. Get Patient Profile
        // -----------------------------------------

        const patient = await Patient.findOne({
            userId: conversation.patientId
        });


        // -----------------------------------------
        // 4. Get Uploaded Report
        // -----------------------------------------

        let report = null;

        if (conversation.reportId) {

            report = await Report.findById(
                conversation.reportId
            );
        }


        // -----------------------------------------
        // 5. Return Complete Patient Details
        // -----------------------------------------

        return {

            patient: {

                id: user._id,

                name: user.name,

                email: user.email,

                phone: user.phone,

                role: user.role,

                profile: patient || null
            },


            consultation: {

                conversationId: conversation._id,

                originalMessage:
                    conversation.originalMessage,

                extractedSymptoms:
                    conversation.extractedSymptoms || [],

                followUpQuestions:
                    conversation.followUpQuestions || [],

                patientAnswers:
                    conversation.patientAnswers || [],

                clinicalSummary:
                    conversation.clinicalSummary,

                possibleConditions:
                    conversation.possibleConditions || [],

                recommendedTests:
                    conversation.recommendedTests || [],

                severity:
                    conversation.severity,

                priority:
                    conversation.priority,

                reportUploaded:
                    conversation.reportUploaded,

                reportId:
                    conversation.reportId,

                combinedAssessment:
                    conversation.combinedAssessment,

                finalSeverity:
                    conversation.finalSeverity,

                finalPriority:
                    conversation.finalPriority,

                status:
                    conversation.status,

                doctorId:
                    conversation.doctorId,

                consultationStartedAt:
                    conversation.consultationStartedAt,

                consultationCompletedAt:
                    conversation.consultationCompletedAt,

                createdAt:
                    conversation.createdAt,

                updatedAt:
                    conversation.updatedAt
            },


            report: report || null
        };
    }
    // =========================================
// COMPLETE CONSULTATION
// =========================================

async completeConsultation(conversationId) {

    const conversation = await AIConversation.findById(
        conversationId
    );

    if (!conversation) {
        const error = new Error("AI conversation not found");
        error.statusCode = 404;
        throw error;
    }

    conversation.status = "Completed";

    conversation.consultationCompletedAt = new Date();

    await conversation.save();

    return {
        conversationId: conversation._id,
        status: conversation.status,
        consultationCompletedAt:
            conversation.consultationCompletedAt
    };
}
}

module.exports = new DoctorService();