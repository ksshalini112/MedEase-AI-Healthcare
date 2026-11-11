const diabetes = {

    id: "DIABETES",

    name: "Diabetes Mellitus",

    description:
        "Diabetes is a metabolic disorder characterized by persistently elevated blood glucose levels due to insufficient insulin production or insulin resistance.",

    rules: [

        {
            parameter: "fastingGlucose",
            operator: ">",
            value: 126,
            score: 40
        },

        {
            parameter: "ppGlucose",
            operator: ">",
            value: 200,
            score: 30
        },

        {
            parameter: "hba1c",
            operator: ">=",
            value: 6.5,
            score: 30
        }

    ],

    patientExplanation:
        "Your blood sugar values are higher than normal and may indicate diabetes. Please consult your doctor for confirmation and treatment.",

    doctorExplanation:
        "Findings are suggestive of Diabetes Mellitus based on elevated FBS, PPBS and/or HbA1c. Clinical correlation is advised.",

    severity: {

        low: "Prediabetes",

        medium: "Early Diabetes",

        high: "Uncontrolled Diabetes",

        critical: "Severely Uncontrolled Diabetes"

    },

    recommendations: {

        diet: [

            "Reduce sugar intake",

            "Choose whole grains",

            "Increase vegetables",

            "Avoid sugary drinks"

        ],

        lifestyle: [

            "Exercise at least 30 minutes daily",

            "Maintain healthy body weight",

            "Quit smoking"

        ],

        medications: [

            "Take medicines only as prescribed by your physician"

        ],

        followUp: [

            "Repeat HbA1c after 3 months",

            "Monitor fasting blood sugar regularly"

        ]

    }

};

module.exports = diabetes;