const express = require("express");
const healthRoutes = require("./routes/health.routes");
const authRoutes = require("./routes/auth.routes");
const patientRoutes = require("./routes/patient.routes");
const aiRoutes = require("./routes/ai.routes");
const app = express();

// ==============================
// Middleware
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