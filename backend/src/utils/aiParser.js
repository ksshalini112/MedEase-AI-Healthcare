class AIParser {

    parse(response) {

        try {

            let cleaned = response.trim();

            // Remove markdown if Gemini returns ```json
            cleaned = cleaned.replace(/```json/g, "");
            cleaned = cleaned.replace(/```/g, "");

            cleaned = cleaned.trim();

            return JSON.parse(cleaned);

        } catch (error) {

            console.error("AI Parser Error:", error);

            throw new Error("Invalid AI JSON Response");

        }

    }

}

module.exports = new AIParser();