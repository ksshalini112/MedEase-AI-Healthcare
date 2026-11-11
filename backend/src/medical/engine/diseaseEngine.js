const anemia = require("../diseases/anemia");
const dengue = require("../diseases/dengue");
const malaria = require("../diseases/malaria");
const typhoid = require("../diseases/typhoid");
const diabetes = require("../diseases/diabetes");
const kidneyDisease = require("../diseases/kidneyDisease");
const liverDisease = require("../diseases/liverDisease");
const thyroidDisease = require("../diseases/thyroidDisease");
const hypertension = require("../diseases/hypertension");
const heartDisease = require("../diseases/heartDisease");
const pneumonia = require("../diseases/pneumonia");


class DiseaseEngine {

    constructor() {

        this.diseases = [

            anemia,
            dengue,
            malaria,
            typhoid,
            diabetes,
            kidneyDisease,
            liverDisease,
            thyroidDisease,
            hypertension,
            heartDisease,
            pneumonia

        ];

    }

    analyze(cbc) {

        const detected = [];

        for (const disease of this.diseases) {

            let matched = [];

            for (const rule in disease.rules) {

                if (!cbc[rule]) continue;

                if (cbc[rule].status.toLowerCase() === disease.rules[rule]) {

                    matched.push(rule);

                }

            }

            if (matched.length > 0) {

                detected.push({

                    id: disease.id,

                    name: disease.name,

                    confidence: matched.length * 10,

                    matchedRules: matched,

                    patientExplanation: disease.patientExplanation,

                    doctorExplanation: disease.doctorExplanation,

                    severity: disease.severity,

                    recommendations: disease.recommendations

                });

            }

        }

        detected.sort((a, b) => b.confidence - a.confidence);

        return detected;

    }
    

}

module.exports = new DiseaseEngine();