const mch = {

    name: "Mean Corpuscular Hemoglobin",

    code: "MCH",

    unit: "pg",

    category: "CBC",

    normalRange: {

        male: {
            min: 27,
            max: 33
        },

        female: {
            min: 27,
            max: 33
        }

    },

    criticalValues: {

        low: 20,

        high: 40

    },

    interpretations: {

        low: {

            severity: "Medium",

            patientExplanation:
                "Your MCH is lower than normal. This means each red blood cell contains less hemoglobin than expected. It is commonly seen in iron deficiency anemia.",

            doctorExplanation:
                "Low MCH (hypochromia) suggests reduced hemoglobin content within erythrocytes, commonly associated with iron deficiency anemia or thalassemia.",

            possibleCauses: [

                "Iron Deficiency Anemia",

                "Thalassemia",

                "Chronic Blood Loss",

                "Chronic Disease"

            ],

            recommendedTests: [

                "Iron Profile",

                "Ferritin",

                "Peripheral Blood Smear",

                "Hemoglobin Electrophoresis"

            ],

            recommendations: [

                "Consult your doctor",

                "Follow a balanced diet rich in iron if advised",

                "Repeat CBC if recommended"

            ]

        },

        normal: {

            severity: "Normal",

            patientExplanation:
                "Your MCH is within the normal range. Your red blood cells contain a normal amount of hemoglobin.",

            doctorExplanation:
                "MCH is within normal reference limits.",

            recommendations: [

                "Maintain a healthy lifestyle"

            ]

        },

        high: {

            severity: "Medium",

            patientExplanation:
                "Your MCH is higher than normal. This means each red blood cell contains more hemoglobin than usual. This may occur in certain vitamin deficiencies or liver diseases.",

            doctorExplanation:
                "High MCH is commonly associated with macrocytic anemia, vitamin B12 deficiency, folate deficiency, liver disease, or hypothyroidism.",

            possibleCauses: [

                "Vitamin B12 Deficiency",

                "Folate Deficiency",

                "Liver Disease",

                "Hypothyroidism",

                "Macrocytic Anemia"

            ],

            recommendedTests: [

                "Vitamin B12",

                "Folate",

                "Liver Function Test",

                "Thyroid Profile"

            ],

            recommendations: [

                "Consult your doctor",

                "Further evaluation may be required"

            ]

        }

    }

};

module.exports = mch;