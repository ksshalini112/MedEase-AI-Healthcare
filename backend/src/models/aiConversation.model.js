const mongoose = require("mongoose");

const aiConversationSchema = new mongoose.Schema(
    {
        // =========================
        // PATIENT
        // =========================

        patientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        // =========================
        // AI CONSULTATION
        // =========================

        originalMessage: {
            type: String,
            required: true
        },

        extractedSymptoms: [
            {
                type: String
            }
        ],

        followUpQuestions: [
            {
                type: String
            }
        ],

        patientAnswers: [
            {
                question: {
                    type: String,
                    required: true
                },

                answer: {
                    type: String,
                    required: true
                },

                answeredAt: {
                    type: Date,
                    default: Date.now
                },

                updatedAt: {
                    type: Date,
                    default: Date.now
                }
            }
        ],

        clinicalSummary: {
            type: String,
            default: null
        },

        possibleConditions: [
            {
                name: String,
                confidence: Number
            }
        ],

        recommendedTests: [
            {
                type: String
            }
        ],

        severity: {
            type: String,
            default: null
        },

        priority: {
            type: String,
            enum: ["Low", "Medium", "High", "Critical"],
            default: null
        },

        // =========================
        // REPORT
        // =========================

        reportUploaded: {
            type: Boolean,
            default: false
        },

       reportIds: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Report"
    }
],

        // =========================
        // COMBINED ASSESSMENT
        // =========================

        combinedAssessment: {
            type: String,
            default: null
        },

        finalSeverity: {
            type: String,
            default: null
        },

        finalPriority: {
            type: String,
            enum: ["Low", "Medium", "High", "Critical"],
            default: null
        },

        // =========================
        // DOCTOR WORKFLOW
        // =========================

        status: {
            type: String,
            enum: ["Pending", "In Progress", "Completed"],
            default: "Pending"
        },

        doctorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null
        },

        consultationStartedAt: {
            type: Date,
            default: null
        },

        consultationCompletedAt: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "AIConversation",
    aiConversationSchema
);