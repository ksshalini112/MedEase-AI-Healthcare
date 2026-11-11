const express = require("express");
const cors = require("cors");
const healthRoutes = require("./routes/health.routes");
const authRoutes = require("./routes/auth.routes");
const patientRoutes = require("./routes/patient.routes");
const aiRoutes = require("./routes/ai.routes");
const reportRoutes = require("./routes/report.routes");
const diseaseRoutes = require("./routes/disease.routes");
const cbcRoutes = require("./routes/cbc.routes");
const diabetesRoutes = require("./routes/diabetes.routes");
const doctorRoutes = require("./routes/doctor.routes");
const app = express();
const errorHandler = require("./middleware/error.middleware");

// ==============================

app.use(cors({
    origin: "http://localhost:4200",
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ==============================

// Parse JSON request body
app.use(express.json());

// Parse URL-encoded data
app.use(express.urlencoded({ extended: true }));

// ==============================
// Routes
// ==============================



app.use("/api/health", healthRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/patient", patientRoutes);
app.use("/api/v1/ai", aiRoutes);
app.use("/api/v1/doctor", doctorRoutes);
app.use("/api/v1/reports", reportRoutes);
app.use("/api/disease", diseaseRoutes);
app.use("/api/cbc", cbcRoutes);
app.use("/api/diabetes", diabetesRoutes);
app.use(errorHandler);
// ==============================
// Default Route
// ==============================

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to MedEase AI Backend"
    });
});

// ==============================
// 404 Route
// ==============================

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route Not Found"
    });
});

// ==============================
// Export App
// ==============================

module.exports = app;