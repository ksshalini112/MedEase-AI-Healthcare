class HealthService {
    getHealthStatus() {
        return {
            success: true,
            message: "MedEase AI Backend Running",
            version: "1.0.0"
        };
    }
}

module.exports = new HealthService();