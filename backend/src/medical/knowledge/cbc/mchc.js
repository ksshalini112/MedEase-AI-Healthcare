const mchc = {

    name: "Mean Corpuscular Hemoglobin Concentration",

    code: "MCHC",

    unit: "g/dL",

    category: "CBC",

    normalRange: {

        male: {
            min: 32,
            max: 36
        },

        female: {
            min: 32,
            max: 36
        }

    },

    criticalValues: {

        low: 28,

        high: 38

    },

    interpretations: {

        low: {

            severity: "Medium",

            patientExplanation:
                "Your MCHC is lower than normal. This means your red blood cells contain less hemoglobin than expected. It is commonly seen in iron deficiency anemia.",

            doctorExplanation:
                "Low MCHC (hypochromia) suggests reduced hemoglobin concentration in red blood cells.",

            possibleCauses: [

                "Iron Deficiency Anemia",

                "Thalassemia",

                "Chronic Blood Loss"

            ],

            recommendedTests: [

                "Iron Profile",

                "Ferritin",

                "Peripheral Blood Smear"

            ],

            recommendations: [

                "Consult your doctor",

                "Repeat CBC if advised"

            ]

        },

        normal: {

            severity: "Normal",

            patientExplanation:
                "Your MCHC is within the normal range.",

            doctorExplanation:
                "MCHC is within normal reference limits.",

            recommendations: [

                "Maintain a healthy lifestyle"

            ]

        },

        high: {

            severity: "Medium",

            patientExplanation:
                "Your MCHC is higher than normal. This may be associated with certain blood disorders or dehydration.",

            doctorExplanation:
                "High MCHC may indicate hereditary spherocytosis, autoimmune hemolytic anemia, or dehydration.",

            possibleCauses: [

                "Hereditary Spherocytosis",

                "Autoimmune Hemolytic Anemia",

                "Severe Dehydration"

            ],

            recommendedTests: [

                "Peripheral Blood Smear",

                "Reticulocyte Count",

                "Direct Coombs Test"

            ],

            recommendations: [

                "Consult your doctor",

                "Further evaluation is recommended"

            ]

        }

    }

};

module.exports = mchc;