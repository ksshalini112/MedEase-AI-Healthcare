const Tesseract = require("tesseract.js");

class OCR {

    async extractText(filePath) {

        try {

            console.log("Starting OCR...");

            const { data } = await Tesseract.recognize(
                filePath,
                "eng"
            );

            console.log("OCR Completed");

            return data.text;

        } catch (error) {

            console.error("OCR Error:", error);

            throw new Error("Failed to extract text");

        }

    }

}

module.exports = new OCR();