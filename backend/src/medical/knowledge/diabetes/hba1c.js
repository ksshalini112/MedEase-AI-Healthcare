const hba1c = {

    name: "HbA1c",

    code: "HBA1C",

    unit: "%",

    category: "Diabetes",

    normalRange: {

        min: 4.0,

        max: 5.6

    },

    criticalValues: {

        low: 3.5,

        high: 10

    },

    interpretations: {

        low: {

            status: "Low",

            severity: "Medium",

            patientExplanation:
                "Your HbA1c is lower than normal. Further evaluation may be needed.",

            doctorExplanation:
                "Low HbA1c. Correlate clinically.",

            possibleCauses: [

                "Frequent hypoglycemia",

                "Hemolytic anemia"

            ],

            recommendedTests: [

                "Repeat HbA1c"

            ],

            recommendations: [

                "Consult your physician."

            ]

        },

        normal: {

            status: "Normal",

            severity: "Normal",

            patientExplanation:
                "Your HbA1c is within the normal range.",

            doctorExplanation:
                "Normal long-term blood glucose control.",

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
                "Your HbA1c is elevated, suggesting poor long-term blood sugar control.",

            doctorExplanation:
                "Elevated HbA1c is suggestive of diabetes mellitus.",

            possibleCauses: [

                "Prediabetes",

                "Type 2 Diabetes",

                "Poor Glycemic Control"

            ],

            recommendedTests: [

                "Fasting Blood Sugar",

                "PPBS",

                "Repeat HbA1c"

            ],

            recommendations: [

                "Consult a diabetologist.",

                "Follow a diabetic diet.",

                "Exercise regularly."

            ]

        }

    }

};

module.exports = hba1c;