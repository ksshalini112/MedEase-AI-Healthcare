const fs = require("fs");
const {
    GoogleGenerativeAI
} = require("@google/generative-ai");

const aiParser = require("../utils/aiParser");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

class ReportAIService {

    async analyzeReport(file) {

        try {

           const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash"
});
   

            const image = {
                inlineData: {
                    data: fs.readFileSync(file.path).toString("base64"),
                    mimeType: file.mimetype
                }
            };

            const prompt = `
You are an expert medical laboratory AI.

Analyze this laboratory report image.

STRICT RULES:

1. Read ONLY what is visible.
2. Never guess values.
3. Never modify numbers.
4. If unreadable return null.
5. Do NOT diagnose diseases.
6. Return ONLY valid JSON.

Return exactly this format:

{
  "reportType": "",
  "summary": "",
  "parameters": [
    {
      "name": "",
      "value": "",
      "unit": "",
      "referenceRange": "",
      "status": "Normal"
    }
  ]
}
`;

            const result = await model.generateContent([
                prompt,
                image
            ]);

            const response = await result.response;

            const text = response.text();

            return aiParser.parse(text);

        } catch (error) {

    console.log("========== GEMINI ERROR ==========");
    console.log(error);
    console.log("Message:", error.message);

    if (error.response) {
        console.log("Response:");
        console.log(error.response);
    }

    if (error.stack) {
        console.log(error.stack);
    }

    console.log("==================================");

    throw error;

}
    }

}

module.exports = new ReportAIService();