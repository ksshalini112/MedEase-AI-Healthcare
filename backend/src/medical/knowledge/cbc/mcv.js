const mcv = {

    name: "Mean Corpuscular Volume",

    code: "MCV",

    unit: "fL",

    category: "CBC",

    normalRange: {

        male: {
            min: 80,
            max: 100
        },

        female: {
            min: 80,
            max: 100
        }

    },

    criticalValues: {

        low: 60,

        high: 120

    },

    interpretations: {

        low: {

            severity: "Medium",

            patientExplanation:
                "Your MCV is lower than normal. This means your red blood cells are smaller than usual. It is commonly seen in iron deficiency anemia or certain inherited blood disorders.",

            doctorExplanation:
                "Low MCV (microcytosis) is commonly associated with iron deficiency anemia, thalassemia, anemia of chronic disease, or sideroblastic anemia.",

            possibleCauses: [

                "Iron Deficiency Anemia",

                "Thalassemia",

                "Anemia of Chronic Disease",

                "Sideroblastic Anemia"

            ],

            recommendedTests: [

                "Iron Profile",

                "Ferritin",

                "Peripheral Blood Smear",

                "Hemoglobin Electrophoresis"

            ],

            recommendations: [

                "Consult your doctor",

                "Eat iron-rich foods if advised",

                "Repeat CBC if recommended"

            ]

        },

        normal: {

            severity: "Normal",

            patientExplanation:
                "Your MCV is within the normal range. This means your red blood cells are of normal size.",

            doctorExplanation:
                "MCV is within normal reference limits.",

            recommendations: [

                "Maintain a healthy diet and lifestyle"

            ]

        },

        high: {

            severity: "Medium",

            patientExplanation:
                "Your MCV is higher than normal. This means your red blood cells are larger than usual. It may be caused by vitamin deficiencies or certain medical conditions.",

            doctorExplanation:
                "High MCV (macrocytosis) may indicate Vitamin B12 deficiency, folate deficiency, liver disease, hypothyroidism, alcoholism, or myelodysplastic syndrome.",

            possibleCauses: [

                "Vitamin B12 Deficiency",

                "Folate Deficiency",

                "Liver Disease",

                "Hypothyroidism",

                "Alcohol Use",

                "Myelodysplastic Syndrome"

            ],

            recommendedTests: [

                "Vitamin B12",

                "Folate",

                "Liver Function Test (LFT)",

                "Thyroid Profile",

                "Peripheral Blood Smear"

            ],

            recommendations: [

                "Consult your doctor",

                "Maintain a balanced diet",

                "Further evaluation may be required"

            ]

        }

    }

};

module.exports = mcv;