const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true
        },

        bloodGroup: {
            type: String,
            enum: [
                "A+",
                "A-",
                "B+",
                "B-",
                "AB+",
                "AB-",
                "O+",
                "O-"
            ]
        },

        height: {
            type: Number
        },

        weight: {
            type: Number
        },
        age: {
    type: Number
},

gender: {
    type: String,
    enum: ["Male", "Female", "Other"]
},

pregnant: {
    type: Boolean,
    default: false
},

pregnancyWeeks: {
    type: Number,
    default: null
},

        allergies: [{
            type: String
        }],

        chronicDiseases: [{
            type: String
        }],

        currentMedicines: [{
            type: String
        }],

        emergencyContact: {
            name: String,
            relationship: String,
            phone: String
        },

        familyHistory: [{
            disease: String,
            relation: String
        }]
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Patient", patientSchema);