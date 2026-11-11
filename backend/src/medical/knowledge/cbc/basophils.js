const basophils = {

    name: "Basophils",

    code: "BASO",

    unit: "%",

    category: "CBC",

    normalRange: {

        male: {
            min: 0,
            max: 2
        },

        female: {
            min: 0,
            max: 2
        }

    },

    criticalValues: {

        low: 0,

        high: 5

    },

    interpretations: {

        low: {

            severity: "Low",

            patientExplanation:
                "A low basophil count is usually not medically significant.",

            doctorExplanation:
                "Basopenia is rarely clinically important.",

            possibleCauses: [

                "Stress",

                "Hyperthyroidism"

            ],

            recommendedTests: [

                "Clinical Correlation"

            ],

            recommendations: [

                "Usually no treatment is required."

            ]

        },

        normal: {

            severity: "Normal",

            patientExplanation:
                "Your basophil count is within the normal range.",

            doctorExplanation:
                "Basophil percentage is within normal reference limits.",

            recommendations: [

                "Maintain a healthy lifestyle."

            ]

        },

        high: {

            severity: "Medium",

            patientExplanation:
                "Your basophil count is higher than normal. This may occur with allergies, chronic inflammation, or certain blood disorders.",

            doctorExplanation:
                "Basophilia may indicate chronic inflammation, allergy, hypothyroidism, or myeloproliferative disorders.",

            possibleCauses: [

                "Allergy",

                "Hypothyroidism",

                "Chronic Inflammation",

                "Myeloproliferative Disease"

            ],

            recommendedTests: [

                "Thyroid Profile",

                "Peripheral Blood Smear"

            ],

            recommendations: [

                "Consult your doctor for further evaluation."

            ]

        }

    }

};

module.exports = basophils;