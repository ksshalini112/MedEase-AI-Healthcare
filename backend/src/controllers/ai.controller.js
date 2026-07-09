const geminiService = require("../ai/gemini.service");
const aiParser = require("../utils/aiParser");
const analyzeSymptoms = async (req, res) => {
    try {

        const { message } = req.body;

       const response = await geminiService.analyzeSymptoms(message);

const parsedResponse = aiParser.parse(response);

res.json({
    success: true,
    data: parsedResponse
});
    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

module.exports = {
    analyzeSymptoms
};