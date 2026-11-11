const hemoglobin = require("../knowledge/cbc/hemoglobin");
const rbc = require("../knowledge/cbc/rbc");
const wbc = require("../knowledge/cbc/wbc");
const platelet = require("../knowledge/cbc/platelets");
const mcv = require("../knowledge/cbc/mcv");
const mch = require("../knowledge/cbc/mch");
const mchc = require("../knowledge/cbc/mchc");
const rdw = require("../knowledge/cbc/rdw");
const neutrophils = require("../knowledge/cbc/neutrophils");
const lymphocytes = require("../knowledge/cbc/lymphocytes");
const eosinophils = require("../knowledge/cbc/eosinophils");
const monocytes = require("../knowledge/cbc/monocytes");
const basophils = require("../knowledge/cbc/basophils");

class CBCAnalyzer {

    analyzeParameter(parameter, value, gender = "male") {

        if (value === undefined || value === null || value === "") {
            return null;
        }

        value = Number(value);

        const range = parameter.normalRange?.[gender] || parameter.normalRange;

        if (!range) {
            return null;
        }

        let interpretation;
        let status = "Normal";

        // Critical Low
        if (
            parameter.criticalValues &&
            parameter.criticalValues.low !== undefined &&
            value <= parameter.criticalValues.low
        ) {

            interpretation = parameter.interpretations.low;
            status = "Low";

        }

        // Critical High
        else if (
            parameter.criticalValues &&
            parameter.criticalValues.high !== undefined &&
            value >= parameter.criticalValues.high
        ) {

            interpretation = parameter.interpretations.high;
            status = "High";

        }

        // Low
        else if (value < range.min) {

            interpretation = parameter.interpretations.low;
            status = "Low";

        }

        // High
        else if (value > range.max) {

            interpretation = parameter.interpretations.high;
            status = "High";

        }

        // Normal
        else {

            interpretation = parameter.interpretations.normal;
            status = "Normal";

        }

        return {

            parameter: parameter.name,

            code: parameter.code,

            value,

            unit: parameter.unit,

            normalRange: range,

            status,

            severity: interpretation.severity,

            patientExplanation: interpretation.patientExplanation,

            doctorExplanation: interpretation.doctorExplanation,

            possibleCauses: interpretation.possibleCauses || [],

            recommendedTests: interpretation.recommendedTests || [],

            recommendations: interpretation.recommendations || []

        };

    }

    analyze(report, gender = "male") {

        return {

            hemoglobin: this.analyzeParameter(hemoglobin, report.hemoglobin, gender),

            rbc: this.analyzeParameter(rbc, report.rbc, gender),

            wbc: this.analyzeParameter(wbc, report.wbc, gender),

            platelet: this.analyzeParameter(platelet, report.platelet, gender),

            mcv: this.analyzeParameter(mcv, report.mcv, gender),

            mch: this.analyzeParameter(mch, report.mch, gender),

            mchc: this.analyzeParameter(mchc, report.mchc, gender),

            rdw: this.analyzeParameter(rdw, report.rdw, gender),

            neutrophils: this.analyzeParameter(neutrophils, report.neutrophils, gender),

            lymphocytes: this.analyzeParameter(lymphocytes, report.lymphocytes, gender),

            eosinophils: this.analyzeParameter(eosinophils, report.eosinophils, gender),

            monocytes: this.analyzeParameter(monocytes, report.monocytes, gender),

            basophils: this.analyzeParameter(basophils, report.basophils, gender)

        };

    }

}

module.exports = new CBCAnalyzer();