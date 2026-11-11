const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

class GeminiService {

    async analyzeSymptoms(message, patientProfile) {

        const prompt = `
You are an AI clinical assistant.

Patient Profile:

Age: ${patientProfile?.age || "Unknown"}

Gender: ${patientProfile?.gender || "Unknown"}

Pregnant: ${patientProfile?.pregnant ? "Yes" : "No"}

Pregnancy Weeks: ${patientProfile?.pregnancyWeeks || "N/A"}

Chronic Diseases: ${patientProfile?.chronicDiseases?.join(", ") || "None"}

Current Medicines: ${patientProfile?.currentMedicines?.join(", ") || "None"}

Patient Symptoms:

${message}

Return ONLY valid JSON.

{
  "symptoms": [],
  "duration": null,
  "severity": null,
  "followUpQuestions": []
}
`;

        try {

            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: prompt,
            });

            return response.text;

        } catch (error) {

            console.error("Gemini Analyze Symptoms Error:", error);

            throw error;

        }

    }

   async generateClinicalSummary(conversation) {

    const prompt = `
You are an experienced AI Clinical Assistant.

Analyze the patient's consultation.

Symptoms:
${conversation.extractedSymptoms.join(", ")}

Patient Answers:
${JSON.stringify(conversation.patientAnswers)}

IMPORTANT RULES:

- Return ONLY valid JSON.
- Do NOT use markdown.
- Do NOT explain anything.
- Do NOT write before or after the JSON.
- Never leave fields empty.
- Confidence must be a number between 0 and 100.
- Priority MUST be exactly one of:
  Low
  Medium
  High
  Critical

Return EXACTLY this structure:

{
  "clinicalSummary": "string",
  "possibleConditions": [
    {
      "name": "string",
      "confidence": 0
    }
  ],
  "severity": "Mild",
  "priority": "Medium",
  "recommendedTests": [
    "CBC"
  ]
}
`;

    try {

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });

        console.log("===== GEMINI RAW RESPONSE =====");
        console.log(response.text);
        console.log("===============================");

        return response.text;

    } catch (error) {

        console.error(error);

        throw error;

    }

}
}

module.exports = new GeminiService();