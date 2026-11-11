const fastingGlucose = require("../knowledge/diabetes/fastingGlucose");
const ppGlucose = require("../knowledge/diabetes/ppGlucose");
const hba1c = require("../knowledge/diabetes/hba1c");

class DiabetesAnalyzer {

    analyzeParameter(parameter, value) {

        if (value === undefined || value === null || value === "") {

            return null;

        }

        value = Number(value);

        const range = parameter.normalRange;

        let interpretation;

        if (
            parameter.criticalValues &&
            parameter.criticalValues.low !== undefined &&
            value <= parameter.criticalValues.low
        ) {

            interpretation = parameter.interpretations.low;

        }

        else if (
            parameter.criticalValues &&
            parameter.criticalValues.high !== undefined &&
            value >= parameter.criticalValues.high
        ) {

            interpretation = parameter.interpretations.high;

        }

        else if (value < range.min) {

            interpretation = parameter.interpretations.low;

        }

        else if (value > range.max) {

            interpretation = parameter.interpretations.high;

        }

        else {

            interpretation = parameter.interpretations.normal;

        }

        return {

            parameter: parameter.name,

            code: parameter.code,

            value,

            unit: parameter.unit,

            normalRange: range,

            status: interpretation.status,

            severity: interpretation.severity,

            patientExplanation: interpretation.patientExplanation,

            doctorExplanation: interpretation.doctorExplanation,

            possibleCauses: interpretation.possibleCauses || [],

            recommendedTests: interpretation.recommendedTests || [],

            recommendations: interpretation.recommendations || []

        };

    }

    analyze(report) {

        return {

            fastingGlucose: this.analyzeParameter(
                fastingGlucose,
                report.fastingGlucose
            ),

            ppGlucose: this.analyzeParameter(
                ppGlucose,
                report.ppGlucose
            ),

            hba1c: this.analyzeParameter(
                hba1c,
                report.hba1c
            )

        };

    }

}

module.exports = new DiabetesAnalyzer();