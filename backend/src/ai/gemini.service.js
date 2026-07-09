const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

class GeminiService {

    async analyzeSymptoms(message) {

        const prompt = `
You are an AI clinical assistant.

Your task is ONLY to extract structured information from the patient's message.

Rules:
- Return ONLY valid JSON.
- No markdown.
- No explanations.
- No diagnosis.
- If information is missing, use null.
- Generate 3 to 5 useful follow-up questions.

Return this exact JSON format:

{
  "symptoms": [],
  "duration": "",
  "severity": "",
  "followUpQuestions": []
}

Patient Message:
${message}
`;

        try {

            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: prompt
            });

            return response.text;

        } catch (error) {

            console.error(error);

            throw error;
        }

    }

}

module.exports = new GeminiService();