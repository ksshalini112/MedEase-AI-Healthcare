module.exports = {

    id: "LIVER_DISEASE",

    name: "Liver Disease",

    category: "Hepatology",

    description:
        "Liver disease affects the liver's ability to perform essential functions such as detoxification, metabolism, and protein production.",

    patientExplanation:
        "Your liver function test contains abnormal values which may indicate liver disease. Further evaluation is required.",

    doctorExplanation:
        "Elevated AST, ALT, ALP or bilirubin are suggestive of hepatocellular injury or cholestatic liver disease.",

    symptoms: [

        "Yellow Eyes",

        "Yellow Skin",

        "Dark Urine",

        "Fatigue",

        "Abdominal Pain",

        "Nausea",

        "Loss of Appetite",

        "Swollen Abdomen"

    ],

    reportRules: {

        lft: {

            alt: "high",

            ast: "high",

            bilirubin: "high",

            alp: "high"

        }

    },

    severity: {

        low: "Mild Liver Dysfunction",

        medium: "Moderate Liver Disease",

        high: "Severe Liver Disease",

        critical: "Acute Liver Failure"

    },

    possibleCauses: [

        "Hepatitis",

        "Alcohol",

        "Fatty Liver",

        "Drug Toxicity",

        "Autoimmune Disease"

    ],

    recommendedTests: [

        "Repeat LFT",

        "Ultrasound Abdomen",

        "Hepatitis Profile",

        "Albumin",

        "PT/INR"

    ],

    emergencySigns: [

        "Confusion",

        "Vomiting Blood",

        "Severe Jaundice",

        "Loss of Consciousness"

    ],

    recommendations: {

        diet: [

            "Avoid alcohol",

            "Eat balanced meals",

            "Reduce oily foods"

        ],

        lifestyle: [

            "Maintain healthy weight",

            "Exercise regularly"

        ],

        medications: [

            "Avoid self-medication"

        ],

        followUp: [

            "Consult a hepatologist",

            "Repeat LFT as advised"

        ]

    }

};