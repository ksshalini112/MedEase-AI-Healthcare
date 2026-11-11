const pcv = {

    name: "Packed Cell Volume",

    code: "PCV",

    unit: "%",

    category: "CBC",

    normalRange: {

        male: {

            min: 40,

            max: 50

        },

        female: {

            min: 36,

            max: 46

        }

    },

    criticalValues: {

        low: 20,

        high: 60

    },

    interpretations: {

        low: {

            severity: "High",

            patientExplanation:
                "Your packed cell volume is lower than normal. This usually means your blood contains fewer red blood cells than expected.",

            doctorExplanation:
                "Low hematocrit may indicate anemia, blood loss, or overhydration.",

            possibleCauses: [

                "Iron Deficiency",

                "Blood Loss",

                "Anemia",

                "Overhydration"

            ],

            recommendedTests: [

                "CBC",

                "Iron Profile",

                "Peripheral Smear"

            ],

            recommendations: [

                "Consult your physician"

            ]

        },

        normal: {

            severity: "Normal",

            patientExplanation:
                "Your packed cell volume is within the normal range.",

            doctorExplanation:
                "PCV is within normal limits.",

            recommendations: [

                "No action required"

            ]

        },

        high: {

            severity: "Medium",

            patientExplanation:
                "Your packed cell volume is higher than normal. This may happen due to dehydration or increased red blood cell production.",

            doctorExplanation:
                "Raised hematocrit may indicate dehydration or polycythemia.",

            possibleCauses: [

                "Dehydration",

                "Polycythemia"

            ],

            recommendedTests: [

                "Repeat CBC",

                "Hydration Assessment"

            ],

            recommendations: [

                "Increase water intake",

                "Consult physician"

            ]

        }

    }

};

module.exports = pcv;