const ppGlucose = {

    name: "Postprandial Blood Sugar",

    code: "PPBS",

    unit: "mg/dL",

    category: "Diabetes",

    normalRange: {

        min: 70,

        max: 140

    },

    criticalValues: {

        low: 54,

        high: 300

    },

    interpretations: {

        low: {

            status: "Low",

            severity: "High",

            patientExplanation:
                "Your post-meal blood sugar is lower than normal. This may cause symptoms of low blood sugar.",

            doctorExplanation:
                "Postprandial hypoglycemia. Correlate clinically.",

            possibleCauses: [

                "Diabetes medication",

                "Insulin overdose",

                "Reactive hypoglycemia"

            ],

            recommendedTests: [

                "Repeat PPBS",

                "HbA1c"

            ],

            recommendations: [

                "Consume glucose if symptomatic.",

                "Consult your physician."

            ]

        },

        normal: {

            status: "Normal",

            severity: "Normal",

            patientExplanation:
                "Your post-meal blood sugar is within the normal range.",

            doctorExplanation:
                "PPBS is within normal limits.",

            possibleCauses: [],

            recommendedTests: [],

            recommendations: [

                "Maintain a healthy lifestyle."

            ]

        },

        high: {

            status: "High",

            severity: "High",

            patientExplanation:
                "Your post-meal blood sugar is higher than normal and may indicate diabetes.",

            doctorExplanation:
                "Elevated postprandial glucose. Correlate with HbA1c.",

            possibleCauses: [

                "Prediabetes",

                "Type 2 Diabetes"

            ],

            recommendedTests: [

                "HbA1c",

                "Repeat PPBS",

                "Fasting Blood Sugar"

            ],

            recommendations: [

                "Reduce sugar intake.",

                "Exercise regularly.",

                "Consult a diabetologist."

            ]

        }

    }

};

module.exports = ppGlucose;