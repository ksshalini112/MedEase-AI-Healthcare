const express = require("express");

const router = express.Router();

const diabetesAnalyzer = require("../medical/analyzers/diabetesAnalyzer");

router.post("/analyze", (req, res) => {

    const result = diabetesAnalyzer.analyze(req.body);

    res.json({

        success: true,

        data: result

    });

});

module.exports = router;