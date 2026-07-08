const healthService = require("../services/health.service");

const getHealth = (req, res) => {
    const result = healthService.getHealthStatus();

    res.status(200).json(result);
};

module.exports = {
    getHealth
};