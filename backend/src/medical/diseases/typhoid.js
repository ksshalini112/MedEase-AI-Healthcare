module.exports = {

    id: "TYPHOID",

    name: "Typhoid Fever",

    category: "Infectious Disease",

    description:
        "Typhoid fever is a bacterial infection caused by Salmonella Typhi. It usually spreads through contaminated food and water.",

    patientExplanation:
        "Your symptoms and blood report may suggest typhoid fever. This is not a confirmed diagnosis. Further laboratory tests are required.",

    doctorExplanation:
        "CBC may demonstrate leukopenia or normal WBC count with relative lymphocytosis. Clinical correlation is recommended.",

    symptoms: [

        "High Fever",

        "Headache",

        "Weakness",

        "Loss of Appetite",

        "Abdominal Pain",

        "Constipation",

        "Diarrhea",

        "Nausea"

    ],

    reportRules: {

        cbc: {

            wbc: "low",

            neutrophils: "low",

            lymphocytes: "high"

        }

    },

    severity: {

        low: "Mild Typhoid",

        medium: "Moderate Typhoid",

        high: "Severe Typhoid",

        critical: "Typhoid with Complications"

    },

    possibleCauses: [

        "Salmonella Typhi Infection"

    ],

    recommendedTests: [

        "Blood Culture",

        "TyphiDot",

        "Widal Test",

        "Repeat CBC"

    ],

    emergencySigns: [

        "Persistent High Fever",

        "Confusion",

        "Severe Dehydration",

        "Intestinal Bleeding"

    ],

    recommendations: {

        diet: [

            "Soft nutritious diet",

            "Drink plenty of fluids",

            "Avoid spicy food"

        ],

        lifestyle: [

            "Complete bed rest",

            "Maintain hygiene"

        ],

        medications: [

            "Take antibiotics only as prescribed"

        ],

        followUp: [

            "Repeat CBC",

            "Complete antibiotic course"

        ]

    }

};