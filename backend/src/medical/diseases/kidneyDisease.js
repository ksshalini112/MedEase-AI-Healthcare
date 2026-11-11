module.exports = {

    id: "KIDNEY_DISEASE",

    name: "Chronic Kidney Disease",

    category: "Nephrology",

    description:
        "Kidney disease occurs when the kidneys are unable to effectively filter waste products and excess fluids from the blood.",

    patientExplanation:
        "Your kidney function test shows abnormal values that may indicate reduced kidney function. This does not confirm kidney disease, and further evaluation by a doctor is recommended.",

    doctorExplanation:
        "Elevated serum creatinine and blood urea with reduced estimated GFR are suggestive of chronic kidney disease.",

    symptoms: [

        "Swelling of Legs",

        "Fatigue",

        "Loss of Appetite",

        "Nausea",

        "Vomiting",

        "Reduced Urine Output",

        "High Blood Pressure",

        "Shortness of Breath"

    ],

    reportRules: {

        kft: {

            creatinine: "high",

            bloodUrea: "high",

            egfr: "low"

        },

        urine: {

            protein: "positive"

        }

    },

    severity: {

        low: "Mild Kidney Dysfunction",

        medium: "Moderate Kidney Disease",

        high: "Severe Kidney Disease",

        critical: "Kidney Failure"

    },

    possibleCauses: [

        "Diabetes",

        "Hypertension",

        "Kidney Infection",

        "Kidney Stones",

        "Autoimmune Disease"

    ],

    recommendedTests: [

        "Repeat KFT",

        "Urine Routine",

        "Urine Protein",

        "Ultrasound Kidney",

        "Electrolytes"

    ],

    emergencySigns: [

        "No Urine Output",

        "Severe Swelling",

        "Chest Pain",

        "Difficulty Breathing"

    ],

    recommendations: {

        diet: [

            "Reduce salt intake",

            "Limit protein if advised",

            "Drink fluids as recommended"

        ],

        lifestyle: [

            "Control blood pressure",

            "Avoid smoking",

            "Exercise regularly"

        ],

        medications: [

            "Take medicines only as prescribed"

        ],

        followUp: [

            "Consult a nephrologist",

            "Monitor kidney function regularly"

        ]

    }

};