const express = require("express");
const router = express.Router();

const medicalEngine = require("../medical");

router.post("/full-analysis", (req, res) => {

    const gender = req.body.gender || "male";

    const result = medicalEngine.analyze(

        req.body.report,

        gender

    );

    res.json({

        success: true,

        data: result

    });

});
// =========================
// Disease Detection
// =========================


module.exports = router;