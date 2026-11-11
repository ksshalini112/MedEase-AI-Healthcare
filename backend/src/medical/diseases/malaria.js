module.exports = {

    id: "MALARIA",

    name: "Malaria",

    category: "Infectious Disease",

    description:
        "Malaria is a mosquito-borne parasitic disease that affects red blood cells and may lead to anemia and thrombocytopenia.",

    patientExplanation:
        "Your blood report and symptoms may suggest malaria. This is not a confirmed diagnosis and requires laboratory confirmation.",

    doctorExplanation:
        "CBC findings suggest malaria when anemia and thrombocytopenia are associated with fever and chills.",

    symptoms: [

        "High Fever",

        "Chills",

        "Sweating",

        "Headache",

        "Body Pain",

        "Vomiting",

        "Fatigue"

    ],

    reportRules: {

        cbc: {

            hemoglobin: "low",

            platelets: "low"

        }

    },

    severity: {

        low: "Uncomplicated Malaria",

        medium: "Moderate Malaria",

        high: "Severe Malaria",

        critical: "Cerebral Malaria"

    },

    possibleCauses: [

        "Plasmodium falciparum",

        "Plasmodium vivax",

        "Plasmodium malariae",

        "Plasmodium ovale"

    ],

    recommendedTests: [

        "Peripheral Blood Smear",

        "Rapid Malaria Antigen Test",

        "Repeat CBC"

    ],

    emergencySigns: [

        "Altered Consciousness",

        "Repeated Convulsions",

        "Severe Anemia",

        "Shock"

    ],

    recommendations: {

        diet: [

            "Drink adequate fluids",

            "Eat nutritious food"

        ],

        lifestyle: [

            "Take complete rest",

            "Avoid mosquito exposure"

        ],

        medications: [

            "Take antimalarial drugs only as prescribed"

        ],

        followUp: [

            "Repeat CBC",

            "Consult an infectious disease specialist if required"

        ]

    }

};