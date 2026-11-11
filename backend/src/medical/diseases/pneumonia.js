module.exports = {

    id: "PNEUMONIA",

    name: "Pneumonia",

    category: "Respiratory",

    description:
        "Pneumonia is an infection of the lungs that causes inflammation of the air sacs and may impair oxygen exchange.",

    patientExplanation:
        "Your symptoms and blood report may suggest pneumonia. This condition requires medical evaluation and sometimes chest imaging for confirmation.",

    doctorExplanation:
        "Neutrophilic leukocytosis with compatible respiratory symptoms is suggestive of bacterial pneumonia.",

    symptoms: [

        "Fever",

        "Cough",

        "Shortness of Breath",

        "Chest Pain",

        "Chills",

        "Fatigue",

        "Fast Breathing"

    ],

    reportRules: {

        cbc: {

            wbc: "high",

            neutrophils: "high"

        }

    },

    severity: {

        low: "Mild Pneumonia",

        medium: "Moderate Pneumonia",

        high: "Severe Pneumonia",

        critical: "Respiratory Failure"

    },

    possibleCauses: [

        "Bacterial Infection",

        "Viral Infection",

        "Fungal Infection"

    ],

    recommendedTests: [

        "Chest X-ray",

        "CBC",

        "CRP",

        "Sputum Culture",

        "Blood Culture"

    ],

    emergencySigns: [

        "Severe Breathlessness",

        "Blue Lips",

        "Low Oxygen Saturation",

        "Confusion"

    ],

    recommendations: {

        diet: [

            "Drink plenty of fluids",

            "Eat protein-rich foods"

        ],

        lifestyle: [

            "Complete rest",

            "Avoid smoking"

        ],

        medications: [

            "Take antibiotics only if prescribed"

        ],

        followUp: [

            "Repeat chest evaluation",

            "Consult a pulmonologist"

        ]

    }

};