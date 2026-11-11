const hemoglobin = {

    name: "Hemoglobin",

    code: "HB",

    unit: "g/dL",

    category: "CBC",

    normalRange: {

        male: {
            min: 13,
            max: 17
        },

        female: {
            min: 12,
            max: 15
        }

    },

    interpretations: {

        low: {

            severity: "High",

            patientExplanation:
                "Your hemoglobin level is lower than normal. Hemoglobin carries oxygen to all parts of your body. Low levels can make you feel tired, weak, dizzy, or short of breath.",

            doctorExplanation:
                "Low hemoglobin suggests anemia. Clinical correlation and further evaluation are recommended.",

            possibleCauses: [

                "Iron Deficiency",

                "Vitamin B12 Deficiency",

                "Folate Deficiency",

                "Blood Loss",

                "Chronic Kidney Disease",

                "Chronic Illness"

            ],

            recommendedTests: [

                "Iron Profile",

                "Vitamin B12",

                "Folate",

                "Peripheral Smear",

                "Reticulocyte Count"

            ],

            recommendations: [

                "Consult your doctor",

                "Eat iron-rich foods",

                "Repeat CBC if advised"

            ]

        },

        normal: {

            severity: "Normal",

            patientExplanation:
                "Your hemoglobin level is within the normal range. This means your blood is carrying oxygen normally.",

            doctorExplanation:
                "Hemoglobin is within normal reference limits.",

            recommendations: [

                "Maintain a healthy diet"

            ]

        },

        high: {

            severity: "Medium",

            patientExplanation:
                "Your hemoglobin level is higher than normal. This can happen because of dehydration, smoking, or certain medical conditions.",

            doctorExplanation:
                "Elevated hemoglobin may indicate dehydration, chronic hypoxia, smoking, or polycythemia.",

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

module.exports = hemoglobin;