module.exports = {

    id: "HEART_DISEASE",

    name: "Heart Disease",

    category: "Cardiology",

    description:
        "Heart disease includes conditions affecting the heart such as coronary artery disease, heart failure and ischemic heart disease.",

    patientExplanation:
        "Your reports and symptoms may indicate an increased risk of heart disease. Additional evaluation is required for confirmation.",

    doctorExplanation:
        "Elevated lipid profile with hypertension, diabetes or abnormal ECG increases the probability of cardiovascular disease.",

    symptoms: [

        "Chest Pain",

        "Shortness of Breath",

        "Palpitations",

        "Sweating",

        "Fatigue",

        "Pain in Left Arm",

        "Jaw Pain"

    ],

    reportRules: {

        lipid: {

            totalCholesterol: "high",

            ldl: "high",

            hdl: "low",

            triglycerides: "high"

        }

    },

    severity: {

        low: "Low Cardiovascular Risk",

        medium: "Moderate Cardiovascular Risk",

        high: "High Cardiovascular Risk",

        critical: "Possible Acute Cardiac Event"

    },

    possibleCauses: [

        "High Cholesterol",

        "Hypertension",

        "Diabetes",

        "Smoking",

        "Obesity",

        "Family History"

    ],

    recommendedTests: [

        "ECG",

        "2D Echo",

        "Troponin",

        "Lipid Profile",

        "Stress Test"

    ],

    emergencySigns: [

        "Severe Chest Pain",

        "Breathlessness",

        "Loss of Consciousness",

        "Pain Radiating to Left Arm"

    ],

    recommendations: {

        diet: [

            "Low-fat diet",

            "Increase vegetables",

            "Avoid fried foods"

        ],

        lifestyle: [

            "Exercise regularly",

            "Maintain healthy weight",

            "Quit smoking"

        ],

        medications: [

            "Take cardiac medications only as prescribed"

        ],

        followUp: [

            "Consult a cardiologist",

            "Regular lipid monitoring"

        ]

    }

};