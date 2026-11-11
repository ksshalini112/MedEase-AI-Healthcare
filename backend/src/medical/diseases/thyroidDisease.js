module.exports = {

    id: "THYROID_DISEASE",

    name: "Thyroid Disorder",

    category: "Endocrinology",

    description:
        "Thyroid disorders occur when the thyroid gland produces too much or too little thyroid hormone.",

    patientExplanation:
        "Your thyroid test shows abnormal hormone levels that may indicate a thyroid disorder. Additional medical evaluation is recommended.",

    doctorExplanation:
        "Abnormal TSH with altered T3 or T4 levels suggests thyroid dysfunction.",

    symptoms: [

        "Weight Gain",

        "Weight Loss",

        "Hair Fall",

        "Fatigue",

        "Cold Intolerance",

        "Heat Intolerance",

        "Constipation",

        "Palpitations"

    ],

    reportRules: {

        thyroid: {

            tsh: "abnormal",

            t3: "abnormal",

            t4: "abnormal"

        }

    },

    severity: {

        low: "Subclinical Thyroid Disorder",

        medium: "Hypothyroidism / Hyperthyroidism",

        high: "Severe Thyroid Disease",

        critical: "Thyroid Crisis"

    },

    possibleCauses: [

        "Hashimoto Thyroiditis",

        "Graves Disease",

        "Iodine Deficiency",

        "Thyroid Nodules"

    ],

    recommendedTests: [

        "Repeat Thyroid Profile",

        "Anti-TPO Antibody",

        "Thyroid Ultrasound"

    ],

    emergencySigns: [

        "Severe Palpitations",

        "Chest Pain",

        "Confusion",

        "Difficulty Breathing"

    ],

    recommendations: {

        diet: [

            "Maintain adequate iodine intake",

            "Eat a balanced diet"

        ],

        lifestyle: [

            "Exercise regularly",

            "Reduce stress"

        ],

        medications: [

            "Take thyroid medication exactly as prescribed"

        ],

        followUp: [

            "Repeat thyroid profile every 3–6 months",

            "Consult an endocrinologist"

        ]

    }

};