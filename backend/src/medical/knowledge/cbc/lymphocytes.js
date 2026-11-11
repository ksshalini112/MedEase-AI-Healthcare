const lymphocytes = {

    name: "Lymphocytes",

    code: "LYMPH",

    unit: "%",

    category: "CBC",

    normalRange: {

        male: {
            min: 20,
            max: 40
        },

        female: {
            min: 20,
            max: 40
        }

    },

    criticalValues: {

        low: 10,

        high: 60

    },

    interpretations: {

        low: {

            severity: "Medium",

            patientExplanation:
                "Your lymphocyte count is lower than normal. Lymphocytes help protect your body against viral infections and support your immune system.",

            doctorExplanation:
                "Lymphocytopenia may occur in immunodeficiency, steroid therapy, severe infections, autoimmune disorders, or chemotherapy.",

            possibleCauses: [

                "Severe Infection",

                "HIV Infection",

                "Autoimmune Disease",

                "Chemotherapy",

                "Steroid Therapy"

            ],

            recommendedTests: [

                "Repeat CBC",

                "HIV Test",

                "Immune Profile"

            ],

            recommendations: [

                "Consult your doctor",

                "Avoid exposure to infections"

            ]

        },

        normal: {

            severity: "Normal",

            patientExplanation:
                "Your lymphocyte count is within the normal range.",

            doctorExplanation:
                "Lymphocyte percentage is within reference limits.",

            recommendations: [

                "Maintain a healthy lifestyle"

            ]

        },

        high: {

            severity: "Medium",

            patientExplanation:
                "Your lymphocyte count is higher than normal. This commonly occurs during viral infections or some blood disorders.",

            doctorExplanation:
                "Lymphocytosis may indicate viral infection, tuberculosis, chronic infections, or lymphoproliferative disorders.",

            possibleCauses: [

                "Viral Infection",

                "Tuberculosis",

                "Chronic Infection",

                "Chronic Lymphocytic Leukemia"

            ],

            recommendedTests: [

                "Peripheral Blood Smear",

                "Repeat CBC",

                "Viral Tests"

            ],

            recommendations: [

                "Consult your doctor",

                "Further evaluation may be required"

            ]

        }

    }

};

module.exports = lymphocytes;