const wbc = {

    name: "White Blood Cell Count",

    code: "WBC",

    unit: "/cumm",

    category: "CBC",

    normalRange: {

        male: {
            min: 4000,
            max: 11000
        },

        female: {
            min: 4000,
            max: 11000
        }

    },

    criticalValues: {

        low: 2000,

        high: 30000

    },

    interpretations: {

        low: {

            severity: "High",

            patientExplanation:
                "Your white blood cell count is lower than normal. White blood cells help your body fight infections. A low count can increase your risk of infections.",

            doctorExplanation:
                "Leukopenia may result from viral infections, bone marrow suppression, autoimmune disorders, medications, or chemotherapy.",

            possibleCauses: [

                "Viral Infection",

                "Bone Marrow Disorder",

                "Chemotherapy",

                "Autoimmune Disease",

                "Vitamin B12 Deficiency"

            ],

            recommendedTests: [

                "Peripheral Blood Smear",

                "Bone Marrow Evaluation",

                "Vitamin B12",

                "Repeat CBC"

            ],

            recommendations: [

                "Consult your doctor",

                "Avoid exposure to infections",

                "Seek medical care if fever develops"

            ]

        },

        normal: {

            severity: "Normal",

            patientExplanation:
                "Your white blood cell count is within the normal range. Your immune system appears to be functioning normally.",

            doctorExplanation:
                "WBC count is within normal reference limits.",

            recommendations: [

                "Maintain a healthy lifestyle"

            ]

        },

        high: {

            severity: "High",

            patientExplanation:
                "Your white blood cell count is higher than normal. This usually indicates that your body is responding to an infection, inflammation, or another medical condition.",

            doctorExplanation:
                "Leukocytosis may indicate bacterial infection, inflammation, stress response, leukemia, or corticosteroid therapy.",

            possibleCauses: [

                "Bacterial Infection",

                "Inflammation",

                "Stress",

                "Leukemia",

                "Steroid Medication"

            ],

            recommendedTests: [

                "Peripheral Blood Smear",

                "CRP",

                "Blood Culture",

                "Repeat CBC"

            ],

            recommendations: [

                "Consult your doctor",

                "Further evaluation may be necessary"

            ]

        }

    }

};

module.exports = wbc;