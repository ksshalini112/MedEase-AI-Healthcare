const fastingGlucose = {

    name: "Fasting Blood Sugar",

    code: "FBS",

    unit: "mg/dL",

    category: "Diabetes",

    normalRange: {
        min: 70,
        max: 99
    },

    criticalValues: {
        low: 54,
        high: 250
    },

    interpretations: {

        low: {

            status: "Low",

            severity: "High",

            patientExplanation:
                "Your fasting blood sugar is lower than normal. This may cause sweating, shakiness, dizziness, confusion, or fainting.",

            doctorExplanation:
                "Hypoglycemia. Evaluate medication use, insulin dosage, prolonged fasting, or endocrine disorders.",

            possibleCauses: [
                "Excess insulin",
                "Diabetes medication",
                "Prolonged fasting",
                "Liver disease"
            ],

            recommendedTests: [
                "Repeat Fasting Blood Sugar",
                "HbA1c",
                "Insulin Level"
            ],

            recommendations: [
                "Consume glucose immediately if symptomatic.",
                "Consult your physician."
            ]
        },

        normal: {

            status: "Normal",

            severity: "Normal",

            patientExplanation:
                "Your fasting blood sugar is within the normal range.",

            doctorExplanation:
                "Fasting blood sugar is within the normal reference range.",

            possibleCauses: [],

            recommendedTests: [],

            recommendations: [
                "Maintain a healthy diet and regular exercise."
            ]
        },

        high: {

            status: "High",

            severity: "High",

            patientExplanation:
                "Your fasting blood sugar is higher than normal. This may indicate prediabetes or diabetes.",

            doctorExplanation:
                "Elevated fasting glucose. Correlate with HbA1c and clinical findings.",

            possibleCauses: [
                "Prediabetes",
                "Type 2 Diabetes",
                "Stress Hyperglycemia",
                "Endocrine Disorders"
            ],

            recommendedTests: [
                "HbA1c",
                "Postprandial Blood Sugar",
                "Repeat Fasting Blood Sugar"
            ],

            recommendations: [
                "Reduce sugar intake.",
                "Exercise regularly.",
                "Consult a diabetologist."
            ]
        }

    }

};

module.exports = fastingGlucose;