module.exports = {

    id: "ANEMIA",

    name: "Iron Deficiency Anemia",

    category: "Hematology",

    description:
        "Iron deficiency anemia occurs when the body does not have enough iron to produce healthy hemoglobin. This reduces the oxygen-carrying capacity of blood.",

    patientExplanation:
        "Your blood report suggests that your hemoglobin level is lower than normal. This may indicate anemia. Anemia can make you feel tired, weak, dizzy, or short of breath. This is not a confirmed diagnosis and further tests are needed.",

    doctorExplanation:
        "CBC findings are suggestive of iron deficiency anemia. Typical findings include decreased hemoglobin, reduced MCV, reduced MCH, and elevated RDW.",

    symptoms: [

        "Fatigue",

        "Weakness",

        "Dizziness",

        "Pale Skin",

        "Shortness of Breath",

        "Headache",

        "Cold Hands and Feet",

        "Rapid Heartbeat"

    ],

    reportRules: {

        cbc: {

            hemoglobin: "low",

            mcv: "low",

            mch: "low",

            rdw: "high"

        }

    },

    severity: {

        low: "Mild anemia",

        medium: "Moderate anemia",

        high: "Severe anemia",

        critical: "Life-threatening anemia"

    },

    possibleCauses: [

        "Iron Deficiency",

        "Blood Loss",

        "Poor Nutrition",

        "Heavy Menstrual Bleeding",

        "Pregnancy",

        "Gastrointestinal Bleeding",

        "Chronic Disease"

    ],

    recommendedTests: [

        "Iron Profile",

        "Serum Ferritin",

        "Vitamin B12",

        "Folate",

        "Peripheral Blood Smear",

        "Repeat CBC"

    ],

    emergencySigns: [

        "Chest Pain",

        "Severe Breathlessness",

        "Loss of Consciousness",

        "Very Low Hemoglobin"

    ],

    recommendations: {

        diet: [

            "Eat iron-rich foods",

            "Include spinach, beans, lentils",

            "Eat lean meat if non-vegetarian",

            "Take vitamin C rich fruits"

        ],

        lifestyle: [

            "Take adequate rest",

            "Avoid overexertion",

            "Stay hydrated"

        ],

        medications: [

            "Iron supplements only if prescribed by a doctor"

        ],

        followUp: [

            "Repeat CBC after treatment",

            "Consult a physician"

        ]

    }

};