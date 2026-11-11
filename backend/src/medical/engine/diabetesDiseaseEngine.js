const diabetes = require("../diseases/diabetes");

class DiabetesDiseaseEngine {

    analyze(report) {

        const diseases = [];

        const matchedRules = [];

        let confidence = 0;

        // Fasting Blood Sugar
        if (
            report.fastingGlucose &&
            report.fastingGlucose.status !== "Normal"
        ) {

            matchedRules.push("fastingGlucose");
            confidence += 50;

        }

        // Post Prandial Blood Sugar
        if (
            report.ppGlucose &&
            report.ppGlucose.status !== "Normal"
        ) {

            matchedRules.push("ppGlucose");
            confidence += 30;

        }

        // HbA1c
        if (
            report.hba1c &&
            report.hba1c.status !== "Normal"
        ) {

            matchedRules.push("hba1c");
            confidence += 20;

        }

        if (confidence > 0) {

            diseases.push({

                id: diabetes.id,

                name: diabetes.name,

                confidence,

                matchedRules,

                patientExplanation: diabetes.patientExplanation,

                doctorExplanation: diabetes.doctorExplanation,

                severity: diabetes.severity,

                recommendations: diabetes.recommendations

            });

        }

        return diseases;

    }

}

module.exports = new DiabetesDiseaseEngine();