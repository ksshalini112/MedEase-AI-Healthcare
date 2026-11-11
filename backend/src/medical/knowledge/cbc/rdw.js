const rdw = {

    name: "Red Cell Distribution Width",

    code: "RDW",

    unit: "%",

    category: "CBC",

    normalRange: {

        male: {
            min: 11.5,
            max: 14.5
        },

        female: {
            min: 11.5,
            max: 14.5
        }

    },

    criticalValues: {

        low: 10,

        high: 18

    },

    interpretations: {

        low: {

            severity: "Low",

            patientExplanation:
                "Your RDW is slightly lower than normal. This usually has little clinical significance when other blood parameters are normal.",

            doctorExplanation:
                "Low RDW is generally not clinically significant.",

            possibleCauses: [

                "Usually Normal Variation"

            ],

            recommendedTests: [

                "Clinical Correlation"

            ],

            recommendations: [

                "No specific treatment required"

            ]

        },

        normal: {

            severity: "Normal",

            patientExplanation:
                "Your RDW is within the normal range. Your red blood cells are fairly uniform in size.",

            doctorExplanation:
                "RDW is within normal reference limits.",

            recommendations: [

                "Maintain a healthy lifestyle"

            ]

        },

        high: {

            severity: "Medium",

            patientExplanation:
                "Your RDW is higher than normal. This means there is more variation in the size of your red blood cells. It may be associated with anemia or vitamin deficiencies.",

            doctorExplanation:
                "High RDW (anisocytosis) may indicate iron deficiency anemia, vitamin B12 deficiency, folate deficiency, or mixed anemia.",

            possibleCauses: [

                "Iron Deficiency Anemia",

                "Vitamin B12 Deficiency",

                "Folate Deficiency",

                "Mixed Anemia"

            ],

            recommendedTests: [

                "Iron Profile",

                "Vitamin B12",

                "Folate",

                "Peripheral Blood Smear"

            ],

            recommendations: [

                "Consult your doctor",

                "Further blood investigations may be required"

            ]

        }

    }

};

module.exports = rdw;