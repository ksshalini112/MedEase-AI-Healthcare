module.exports = {

    id: "HYPERTENSION",

    name: "Hypertension",

    category: "Cardiology",

    description:
        "Hypertension is a condition where blood pressure remains consistently higher than normal, increasing the risk of heart, kidney and brain diseases.",

    patientExplanation:
        "Your blood pressure appears to be higher than the normal range. High blood pressure often has no symptoms but can damage important organs if left untreated.",

    doctorExplanation:
        "Persistent systolic and/or diastolic blood pressure elevation is suggestive of hypertension. Assess cardiovascular risk factors and target organ damage.",

    symptoms: [

        "Headache",

        "Dizziness",

        "Blurred Vision",

        "Chest Pain",

        "Shortness of Breath",

        "Nose Bleeding",

        "Palpitations"

    ],

    reportRules: {

        vitals: {

            systolicBP: "high",

            diastolicBP: "high"

        }

    },

    severity: {

        low: "Elevated Blood Pressure",

        medium: "Stage 1 Hypertension",

        high: "Stage 2 Hypertension",

        critical: "Hypertensive Crisis"

    },

    possibleCauses: [

        "Obesity",

        "High Salt Intake",

        "Stress",

        "Kidney Disease",

        "Genetics",

        "Smoking"

    ],

    recommendedTests: [

        "Blood Pressure Monitoring",

        "ECG",

        "Kidney Function Test",

        "Lipid Profile"

    ],

    emergencySigns: [

        "Severe Chest Pain",

        "Vision Loss",

        "Stroke Symptoms",

        "BP Above 180/120"

    ],

    recommendations: {

        diet: [

            "Reduce salt intake",

            "Eat fruits and vegetables",

            "Avoid processed foods"

        ],

        lifestyle: [

            "Exercise regularly",

            "Reduce stress",

            "Stop smoking",

            "Limit alcohol"

        ],

        medications: [

            "Take blood pressure medicines only as prescribed"

        ],

        followUp: [

            "Check BP regularly",

            "Consult a cardiologist"

        ]

    }

};