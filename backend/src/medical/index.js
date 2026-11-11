const cbcAnalyzer = require("./analyzers/cbcAnalyzer");
const diabetesAnalyzer = require("./analyzers/diabetesAnalyzer");

const diseaseEngine = require("./engine/diseaseEngine");
const diabetesDiseaseEngine = require("./engine/diabetesDiseaseEngine");

const severityEngine = require("./engine/severityEngine");
const priorityEngine = require("./engine/priorityEngine");
const summaryEngine = require("./engine/summaryEngine");
const recommendationEngine = require("./engine/recommendationEngine");

class MedicalEngine {

    analyze(report, reportType, gender = "male") {

        let analysis = {};

        const type = (reportType || "").toLowerCase();

        // =========================
        // CBC
        // =========================
        if (type.includes("cbc")) {

            analysis.cbc = cbcAnalyzer.analyze(report, gender);

            analysis.diseases = diseaseEngine.analyze(
                analysis.cbc
            );

        }

        // =========================
        // Diabetes / Glucose Reports
        // =========================
        else if (

            type.includes("glucose") ||
            type.includes("diabetes") ||
            type.includes("laboratory")

        ) {

            analysis.diabetes = diabetesAnalyzer.analyze(report);

            analysis.diseases = diabetesDiseaseEngine.analyze(
                analysis.diabetes
            );

        }

        // =========================
        // Unsupported
        // =========================
        else {

            return {

                message: "Unsupported report type"

            };

        }

        // =========================
        // Severity
        // =========================
        analysis.severity = severityEngine.calculate(

            analysis.cbc || analysis.diabetes

        );

        // =========================
        // Priority
        // =========================
        analysis.priority = priorityEngine.calculate(

            analysis.severity

        );

        // =========================
        // Summary
        // =========================
        analysis.summary = summaryEngine.generate(

            analysis

        );

        // =========================
        // Recommendations
        // =========================
        analysis.recommendations = recommendationEngine.generate(

            analysis

        );

        return analysis;

    }

}

module.exports = new MedicalEngine();