const AIConversation = require("../models/aiConversation.model");
const Patient = require("../models/patient.model");

class AIFollowupService {

    async saveAnswers(conversationId, newAnswers) {

        const conversation = await AIConversation.findById(conversationId);

        if (!conversation) {
            throw new Error("Conversation not found");
        }

        newAnswers.forEach((newAnswer) => {

            const existingAnswer = conversation.patientAnswers.find(
                answer => answer.question === newAnswer.question
            );

            if (existingAnswer) {

                existingAnswer.answer = newAnswer.answer;
                existingAnswer.updatedAt = new Date();

            } else {

                conversation.patientAnswers.push({
                    question: newAnswer.question,
                    answer: newAnswer.answer,
                    answeredAt: new Date(),
                    updatedAt: new Date()
                });

            }

        });

        await conversation.save();

        return conversation;
    }

    async getConversation(conversationId) {

        const conversation = await AIConversation.findById(conversationId);

        if (!conversation) {
            throw new Error("Conversation not found");
        }

        return conversation;
    }

    async updateClinicalSummary(conversationId, summary) {

        // Get conversation
        const conversation = await AIConversation.findById(conversationId);

        if (!conversation) {
            throw new Error("Conversation not found");
        }

        // Get patient profile
        const patient = await Patient.findOne({
            userId: conversation.userId
        });

        // Normalize AI priority
        const rawPriority = (summary.priority || "")
            .trim()
            .toLowerCase();

        const validPriorities = {
            low: "Low",
            medium: "Medium",
            high: "High",
            critical: "Critical",
            standard: "Medium",
            normal: "Low",
            urgent: "High",
            emergency: "Critical"
        };

        let priority = validPriorities[rawPriority] || "Medium";

        console.log("Gemini Priority:", summary.priority);
        console.log("Normalized Priority:", priority);

        // ==========================
        // Pregnancy Rules
        // ==========================

        if (patient?.pregnant) {

            if (priority === "Low") {
                priority = "Medium";
            }

            if (priority === "Medium") {
                priority = "High";
            }

            const clinicalText =
                (summary.clinicalSummary || "").toLowerCase();

            if (
                clinicalText.includes("bleeding") ||
                clinicalText.includes("abdominal pain")
            ) {
                priority = "Critical";
            }
        }

        // ==========================
        // Elderly Rule
        // ==========================

        if (patient?.age >= 65) {

            if (priority === "Low") {
                priority = "Medium";
            }

        }

        // ==========================
        // Chronic Disease Rule
        // ==========================

        if (
            patient?.chronicDiseases?.includes("Diabetes") ||
            patient?.chronicDiseases?.includes("Heart Disease") ||
            patient?.chronicDiseases?.includes("Hypertension")
        ) {

            if (priority === "Low") {
                priority = "Medium";
            }

        }

        // ==========================
        // Save Updated Summary
        // ==========================

        return await AIConversation.findByIdAndUpdate(
            conversationId,
            {
                clinicalSummary: summary.clinicalSummary,
                possibleConditions: summary.possibleConditions,
                severity: summary.severity,
                priority: priority,
                recommendedTests: summary.recommendedTests
            },
            {
                returnDocument: "after",
                runValidators: true
            }
        );

    }

}

module.exports = new AIFollowupService();