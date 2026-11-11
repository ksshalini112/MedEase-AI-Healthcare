const AIConversation = require("../models/aiConversation.model");

class AIConversationService {

    async createSession(userId, message, aiData) {

        // Convert symptom objects to string names
        const extractedSymptoms = (aiData.symptoms || []).map(symptom => {

            if (typeof symptom === "string") {
                return symptom;
            }

            return symptom.name;

        });

        const conversation = await AIConversation.create({

            patientId: userId,

            originalMessage: message,

            extractedSymptoms,

            followUpQuestions: aiData.followUpQuestions

        });

        return conversation;

    }

}

module.exports = new AIConversationService();