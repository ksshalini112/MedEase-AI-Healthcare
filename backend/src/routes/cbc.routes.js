const express = require("express");
const router = express.Router();

const cbcAnalyzer = require("../medical/analyzers/cbcAnalyzer");

router.post("/analyze", (req, res) => {

    const { report, gender } = req.body;

    const result = cbcAnalyzer.analyze(report, gender);

    res.json({
        success: true,
        data: result
    });

});

module.exports = router;