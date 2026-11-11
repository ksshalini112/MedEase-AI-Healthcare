const monocytes = {

    name: "Monocytes",

    code: "MONO",

    unit: "%",

    category: "CBC",

    normalRange: {

        male: {
            min: 2,
            max: 10
        },

        female: {
            min: 2,
            max: 10
        }

    },

    criticalValues: {

        low: 1,

        high: 20

    },

    interpretations: {

        low: {

            severity: "Low",

            patientExplanation:
                "Your monocyte count is slightly lower than normal. This is usually not a major concern unless associated with other abnormal blood counts.",

            doctorExplanation:
                "Monocytopenia is usually clinically insignificant but may occur with bone marrow suppression or corticosteroid therapy.",

            possibleCauses: [

                "Bone Marrow Suppression",

                "Steroid Therapy",

                "Severe Infection"

            ],

            recommendedTests: [

                "Repeat CBC"

            ],

            recommendations: [

                "Consult your doctor if symptoms persist"

            ]

        },

        normal: {

            severity: "Normal",

            patientExplanation:
                "Your monocyte count is within the normal range.",

            doctorExplanation:
                "Monocyte percentage is within normal reference limits.",

            recommendations: [

                "Maintain a healthy lifestyle"

            ]

        },

        high: {

            severity: "Medium",

            patientExplanation:
                "Your monocyte count is higher than normal. This may occur during recovery from infections or in certain chronic inflammatory conditions.",

            doctorExplanation:
                "Monocytosis may be associated with chronic infections, autoimmune disorders, inflammatory diseases, or hematological malignancies.",

            possibleCauses: [

                "Tuberculosis",

                "Autoimmune Disease",

                "Chronic Infection",

                "Leukemia"

            ],

            recommendedTests: [

                "Repeat CBC",

                "Peripheral Blood Smear",

                "Inflammatory Markers"

            ],

            recommendations: [

                "Consult your doctor",

                "Further investigations may be required"

            ]

        }

    }

};

module.exports = monocytes;