const eosinophils = {

    name: "Eosinophils",

    code: "EOS",

    unit: "%",

    category: "CBC",

    normalRange: {

        male: {
            min: 1,
            max: 6
        },

        female: {
            min: 1,
            max: 6
        }

    },

    criticalValues: {

        low: 0,

        high: 20

    },

    interpretations: {

        low: {

            severity: "Low",

            patientExplanation:
                "Your eosinophil count is slightly lower than normal. This is usually not a cause for concern.",

            doctorExplanation:
                "Low eosinophil count is generally clinically insignificant.",

            possibleCauses: [

                "Stress",

                "Steroid Therapy"

            ],

            recommendedTests: [

                "Clinical Correlation"

            ],

            recommendations: [

                "No specific treatment is usually required."

            ]

        },

        normal: {

            severity: "Normal",

            patientExplanation:
                "Your eosinophil count is within the normal range.",

            doctorExplanation:
                "Eosinophil percentage is within reference limits.",

            recommendations: [

                "Maintain a healthy lifestyle."

            ]

        },

        high: {

            severity: "Medium",

            patientExplanation:
                "Your eosinophil count is higher than normal. This is commonly seen in allergies, asthma, or parasitic infections.",

            doctorExplanation:
                "Eosinophilia may indicate allergic disorders, parasitic infections, drug reactions, or eosinophilic disorders.",

            possibleCauses: [

                "Allergy",

                "Asthma",

                "Parasitic Infection",

                "Drug Reaction"

            ],

            recommendedTests: [

                "IgE",

                "Stool Examination",

                "Allergy Testing"

            ],

            recommendations: [

                "Consult your doctor if symptoms continue."

            ]

        }

    }

};

module.exports = eosinophils;