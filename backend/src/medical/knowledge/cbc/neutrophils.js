const neutrophils = {

    name: "Neutrophils",

    code: "NEUT",

    unit: "%",

    category: "CBC",

    normalRange: {

        male: {
            min: 40,
            max: 70
        },

        female: {
            min: 40,
            max: 70
        }

    },

    criticalValues: {

        low: 20,

        high: 90

    },

    interpretations: {

        low: {

            severity: "High",

            patientExplanation:
                "Your neutrophil count is lower than normal. Neutrophils are important in fighting bacterial infections. Low levels increase the risk of serious infections.",

            doctorExplanation:
                "Neutropenia may result from viral infections, chemotherapy, bone marrow disorders, autoimmune disease, or severe bacterial infection.",

            possibleCauses: [

                "Viral Infection",

                "Chemotherapy",

                "Bone Marrow Disorder",

                "Autoimmune Disease",

                "Sepsis"

            ],

            recommendedTests: [

                "Repeat CBC",

                "Peripheral Blood Smear",

                "Bone Marrow Examination"

            ],

            recommendations: [

                "Consult your doctor immediately",

                "Avoid crowded places",

                "Monitor for fever"

            ]

        },

        normal: {

            severity: "Normal",

            patientExplanation:
                "Your neutrophil count is within the normal range.",

            doctorExplanation:
                "Neutrophil percentage is within reference limits.",

            recommendations: [

                "Maintain a healthy lifestyle"

            ]

        },

        high: {

            severity: "Medium",

            patientExplanation:
                "Your neutrophil count is higher than normal. This commonly occurs during bacterial infections, inflammation, or physical stress.",

            doctorExplanation:
                "Neutrophilia is commonly associated with bacterial infection, inflammation, corticosteroid use, or physiological stress.",

            possibleCauses: [

                "Bacterial Infection",

                "Inflammation",

                "Stress",

                "Steroid Therapy"

            ],

            recommendedTests: [

                "CRP",

                "Blood Culture",

                "Repeat CBC"

            ],

            recommendations: [

                "Consult your doctor",

                "Treat the underlying cause"

            ]

        }

    }

};

module.exports = neutrophils;