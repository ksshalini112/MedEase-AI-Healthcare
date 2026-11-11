const platelets = {

    name: "Platelet Count",

    code: "PLT",

    unit: "/cumm",

    category: "CBC",

    normalRange: {

        male: {
            min: 150000,
            max: 450000
        },

        female: {
            min: 150000,
            max: 450000
        }

    },

    criticalValues: {

        low: 20000,

        high: 1000000

    },

    interpretations: {

        low: {

            severity: "Critical",

            patientExplanation:
                "Your platelet count is lower than normal. Platelets help stop bleeding. Very low platelets increase the risk of bleeding and require urgent medical attention.",

            doctorExplanation:
                "Thrombocytopenia may indicate dengue fever, immune thrombocytopenia (ITP), bone marrow disorders, sepsis, or drug-induced thrombocytopenia.",

            possibleCauses: [

                "Dengue",

                "Immune Thrombocytopenia",

                "Bone Marrow Disorder",

                "Sepsis",

                "Drug-induced Thrombocytopenia"

            ],

            recommendedTests: [

                "Repeat CBC",

                "Peripheral Blood Smear",

                "Dengue NS1",

                "Bone Marrow Examination"

            ],

            recommendations: [

                "Seek immediate medical care if bleeding occurs.",

                "Avoid injury and contact sports.",

                "Consult a physician immediately."

            ]

        },

        normal: {

            severity: "Normal",

            patientExplanation:
                "Your platelet count is within the normal range.",

            doctorExplanation:
                "Platelet count is within normal reference limits.",

            recommendations: [

                "Maintain a healthy lifestyle."

            ]

        },

        high: {

            severity: "Medium",

            patientExplanation:
                "Your platelet count is higher than normal. This may occur due to inflammation, infection, iron deficiency, or certain bone marrow disorders.",

            doctorExplanation:
                "Thrombocytosis may be reactive or primary (essential thrombocythemia).",

            possibleCauses: [

                "Iron Deficiency",

                "Inflammation",

                "Infection",

                "Essential Thrombocythemia"

            ],

            recommendedTests: [

                "Iron Profile",

                "Peripheral Blood Smear",

                "Repeat CBC"

            ],

            recommendations: [

                "Consult your doctor for further evaluation."

            ]

        }

    }

};

module.exports = platelets;