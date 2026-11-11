const asyncHandler = require("../utils/asyncHandler");
const reportService = require("../services/report.service");

const uploadReport = asyncHandler(async (req, res) => {

    const report = await reportService.uploadReport(

        req.user.id,
        req.params.conversationId,
        req.file

    );

    res.status(201).json({

        success: true,

        message: "Report uploaded and analyzed successfully",

        data: report

    });

});

module.exports = {

    uploadReport

};