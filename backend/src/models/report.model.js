const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({

    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    conversationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AIConversation",
    required: true
},

    originalFileName: {
        type: String,
        required: true
    },

    storedFileName: {
        type: String,
        required: true
    },

    filePath: {
        type: String,
        required: true
    },

    fileType: {
        type: String,
        required: true
    },

    uploadedAt: {
        type: Date,
        default: Date.now
    },

    status: {
        type: String,
        enum: [
            "Uploaded",
            "Processing",
            "Completed",
            "Failed"
        ],
        default: "Uploaded"
    },

    extractedText: {
        type: String,
        default: null
    },

    aiAnalysis: {
        type: Object,
        default: null
    },
    medicalAnalysis: {

    type: Object,

    default: null

},

});

module.exports = mongoose.model("Report", reportSchema);