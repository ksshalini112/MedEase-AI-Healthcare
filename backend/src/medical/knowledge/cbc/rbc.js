const rbc = {

    name: "Red Blood Cell Count",

    code: "RBC",

    unit: "million/cumm",

    category: "CBC",

    normalRange: {

        male: {
            min: 4.5,
            max: 5.9
        },

        female: {
            min: 4.1,
            max: 5.1
        }

    },

    criticalValues: {

        low: 2.5,

        high: 7.0

    },

    interpretations: {

        low: {

            severity: "High",

            patientExplanation:
                "Your red blood cell count is lower than normal. This may reduce the oxygen supply to your body and cause tiredness, weakness, or dizziness.",

            doctorExplanation:
                "Low RBC count suggests anemia or bone marrow suppression. Clinical correlation advised.",

            possibleCauses: [

                "Iron Deficiency",

                "Vitamin B12 Deficiency",

                "Blood Loss",

                "Bone Marrow Disorders",

                "Kidney Disease"

            ],

            recommendedTests: [

                "Iron Profile",

                "Vitamin B12",

                "Folate",

                "Peripheral Smear"

            ],

            recommendations: [

                "Consult your doctor",

                "Repeat CBC if advised"

            ]

        },

        normal: {

            severity: "Normal",

            patientExplanation:
                "Your red blood cell count is within the normal range.",

            doctorExplanation:
                "RBC count is within reference limits.",

            recommendations: [

                "Maintain a healthy lifestyle"

            ]

        },

        high: {

            severity: "Medium",

            patientExplanation:
                "Your red blood cell count is higher than normal. This can happen due to dehydration, smoking, or certain medical conditions.",

            doctorExplanation:
                "Elevated RBC count may indicate polycythemia or chronic hypoxia.",

            possibleCauses: [

                "Dehydration",

                "Smoking",

                "High Altitude",

                "Polycythemia"

            ],

            recommendedTests: [

                "Repeat CBC",

                "Erythropoietin",

                "Oxygen Saturation"

            ],

            recommendations: [

                "Drink enough water",

                "Consult your doctor"

            ]

        }

    }

};

module.exports = rbc;