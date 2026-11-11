const Report = require("../models/report.model");
const reportAIService = require("./reportAI.service");
const medicalEngine = require("../medical");
const AIConversation = require("../models/aiConversation.model");

class ReportService {

    // =====================================================
    // PRIORITY
    // =====================================================

    getPriorityLevel(value) {

        const level = String(value || "").trim().toLowerCase();

        if (level.includes("life-threatening")) return 4;
        if (level.includes("critical")) return 4;
        if (level.includes("high")) return 3;
        if (level.includes("medium")) return 2;

        return 1;
    }


    // =====================================================
    // NORMALIZE STATUS
    // =====================================================

    normalizeStatus(value) {

        const status = String(value || "")
            .trim()
            .toLowerCase();

        if (
            status.includes("critical") ||
            status.includes("high") ||
            status.includes("elevated") ||
            status.includes("abnormal")
        ) {
            return "High";
        }

        if (
            status.includes("low") ||
            status.includes("decreased")
        ) {
            return "Low";
        }

        if (
            status.includes("normal") ||
            status.includes("negative")
        ) {
            return "Normal";
        }

        return "Review";
    }


    // =====================================================
    // TEST CATEGORY
    // =====================================================

    getTestCategory(name) {

        const test = String(name || "").toLowerCase();

        if (
            test.includes("hemoglobin") ||
            test.includes("haemoglobin") ||
            test.includes("rbc") ||
            test.includes("wbc") ||
            test.includes("platelet") ||
            test.includes("mch") ||
            test.includes("mchc") ||
            test.includes("mcv") ||
            test.includes("rdw") ||
            test.includes("basophil") ||
            test.includes("neutrophil") ||
            test.includes("lymphocyte") ||
            test.includes("monocyte") ||
            test.includes("eosinophil")
        ) {
            return "blood";
        }

        if (
            test.includes("creatinine") ||
            test.includes("urea") ||
            test.includes("bun") ||
            test.includes("uric acid") ||
            test.includes("sodium") ||
            test.includes("potassium")
        ) {
            return "kidney";
        }

        if (
            test.includes("ast") ||
            test.includes("sgot") ||
            test.includes("alt") ||
            test.includes("sgpt") ||
            test.includes("bilirubin") ||
            test.includes("albumin") ||
            test.includes("alkaline phosphatase") ||
            test.includes("alp")
        ) {
            return "liver";
        }

        if (
            test.includes("glucose") ||
            test.includes("sugar") ||
            test.includes("hba1c")
        ) {
            return "diabetes";
        }

        if (
            test.includes("cholesterol") ||
            test.includes("ldl") ||
            test.includes("hdl") ||
            test.includes("triglyceride")
        ) {
            return "lipid";
        }

        if (
            test.includes("protein") ||
            test.includes("urine") ||
            test.includes("specific gravity")
        ) {
            return "urine";
        }

        if (test.includes("ldh")) {
            return "ldh";
        }

        return "general";
    }


    // =====================================================
    // WHY IT MAY HAPPEN
    // =====================================================

    getWhyItMayHappen(name, status) {

        const test = String(name || "").toLowerCase();
        const result = this.normalizeStatus(status);

        if (result === "Normal") {
            return "The value is within the reference range provided by the laboratory.";
        }

        if (result === "Low") {

            if (
                test.includes("hemoglobin") ||
                test.includes("haemoglobin")
            ) {
                return "A low hemoglobin level can occur with iron deficiency, blood loss, nutritional deficiencies, or some other medical conditions.";
            }

            if (test.includes("platelet")) {
                return "A low platelet count can have several causes, including infections, medications, nutritional problems, or conditions affecting blood-cell production or destruction.";
            }

            if (test.includes("mchc")) {
                return "A low MCHC means the red blood cells contain less hemoglobin concentration than the laboratory reference range. It can sometimes occur with iron deficiency or certain types of anemia.";
            }

            if (test.includes("mch")) {
                return "A low MCH can occur when red blood cells contain less hemoglobin than expected, commonly seen with some forms of anemia.";
            }

            if (test.includes("basophil")) {
                return "A low basophil count can occur normally in some people and can also be associated with stress, acute illness, medications, or other temporary changes.";
            }

            if (test.includes("hdl")) {
                return "The interpretation of HDL depends on the laboratory's reference category and the overall lipid profile. HDL is normally interpreted together with LDL, total cholesterol and other cardiovascular risk factors.";
            }

            return "A low result can have different causes depending on the test, symptoms, medications, and other laboratory findings.";
        }


        if (result === "High") {

            if (
                test.includes("hemoglobin") ||
                test.includes("haemoglobin")
            ) {
                return "A high hemoglobin level can occur with dehydration, smoking, living at high altitude, or conditions that increase red blood cell production.";
            }

            if (test.includes("platelet")) {
                return "A high platelet count can occur temporarily with infection, inflammation, iron deficiency, or other medical conditions.";
            }

            if (test.includes("rdw")) {
                return "A high RDW means there is more variation than expected in red blood-cell size. It can occur with some nutritional deficiencies or different types of anemia.";
            }

            if (
                test.includes("creatinine") ||
                test.includes("bun") ||
                test.includes("urea")
            ) {
                return "A high kidney-related value can occur with dehydration, reduced kidney function, certain medications, increased protein breakdown, or other conditions. The result needs to be interpreted with the rest of the kidney profile.";
            }

            if (
                test.includes("ast") ||
                test.includes("sgot") ||
                test.includes("alt") ||
                test.includes("sgpt")
            ) {
                return "Elevated liver enzymes can occur with liver irritation or injury, medications, alcohol use, infections, fatty liver disease, muscle injury, and other conditions.";
            }

            if (test.includes("bilirubin")) {
                return "An elevated bilirubin level can occur when bilirubin production or processing is affected, including some liver, bile-duct, or blood-related conditions.";
            }

            if (test.includes("ldh")) {
                return "LDH can increase when cells or tissues are under stress or are damaged. It is not specific to one disease and must be interpreted with other findings.";
            }

            if (
                test.includes("protein") &&
                test.includes("creatinine")
            ) {
                return "An increased protein-to-creatinine ratio may indicate increased protein loss in the urine and should be interpreted together with blood pressure, kidney function, symptoms, and other urine findings.";
            }

            if (
                test.includes("urine protein") ||
                test.includes("urinary protein")
            ) {
                return "Protein in urine can occur for temporary reasons such as exercise, fever, dehydration, or infection, but persistent proteinuria can also indicate kidney or other medical conditions.";
            }

            if (
                test.includes("glucose") ||
                test.includes("sugar") ||
                test.includes("hba1c")
            ) {
                return "A high glucose-related result can occur when blood sugar is elevated. Possible causes include diabetes, temporary illness or stress, medications, and dietary factors.";
            }

            if (
                test.includes("cholesterol") ||
                test.includes("ldl")
            ) {
                return "A high cholesterol or LDL result can be influenced by diet, genetics, body weight, physical activity, medical conditions, and some medications.";
            }

            return "A high result can have several possible causes. It should be interpreted together with the reference range, symptoms, medical history, and other test results.";
        }

        return "The report does not provide enough information to determine why this result is outside or unclear relative to the reference range.";
    }


    // =====================================================
    // WHAT IT MAY MEAN
    // =====================================================

    getWhatItMayMean(name, status) {

        const test = String(name || "").toLowerCase();
        const result = this.normalizeStatus(status);

        if (result === "Normal") {
            return "This result is within the laboratory reference range shown on the report.";
        }

        if (result === "Low") {

            if (
                test.includes("hemoglobin") ||
                test.includes("haemoglobin")
            ) {
                return "If confirmed, this may be consistent with anemia and should be interpreted with other blood-count results and symptoms.";
            }

            if (test.includes("platelet")) {
                return "If significantly low, this may increase bleeding risk depending on how low the count is and the clinical situation.";
            }

            if (
                test.includes("mch") ||
                test.includes("mchc") ||
                test.includes("rdw")
            ) {
                return "These red-cell measurements can provide clues about the type of anemia or changes in red blood-cell production, but they should not be interpreted alone.";
            }

            return "The significance depends on how far the result is outside the reference range and what the other test results show.";
        }

        if (result === "High") {

            if (
                test.includes("creatinine") ||
                test.includes("bun") ||
                test.includes("urea")
            ) {
                return "This may indicate that kidney function needs further assessment, although a single abnormal value does not establish a diagnosis.";
            }

            if (
                test.includes("ast") ||
                test.includes("alt") ||
                test.includes("sgot") ||
                test.includes("sgpt")
            ) {
                return "This may indicate liver or tissue irritation, but the cause cannot be determined from this value alone.";
            }

            if (test.includes("ldh")) {
                return "An elevated LDH is a nonspecific finding and may occur with several different types of tissue stress or injury.";
            }

            if (
                test.includes("protein") &&
                (
                    test.includes("urine") ||
                    test.includes("creatinine")
                )
            ) {
                return "This may indicate increased protein loss in the urine and may need follow-up depending on the amount and the patient's other findings.";
            }

            if (
                test.includes("cholesterol") ||
                test.includes("ldl")
            ) {
                return "This may indicate an increased cardiovascular risk profile when persistent and should be considered alongside the complete lipid profile and other risk factors.";
            }

            return "This result is outside the listed reference range and may require further assessment depending on the degree of abnormality and the patient's overall clinical picture.";
        }

        return "Further clinical interpretation is needed.";
    }


    // =====================================================
    // WHAT TO DO
    // =====================================================

    getWhatToDo(name, status) {

        const test = String(name || "").toLowerCase();
        const result = this.normalizeStatus(status);

        if (result === "Normal") {
            return "No action is suggested from this value alone. Continue routine care unless your healthcare professional advises otherwise.";
        }

        if (result === "Low") {

            if (
                test.includes("hemoglobin") ||
                test.includes("haemoglobin")
            ) {
                return "Discuss the result with your doctor. They may consider the complete blood count, iron studies, nutrition, symptoms, and possible causes before recommending treatment.";
            }

            if (test.includes("platelet")) {
                return "Discuss this result promptly with your doctor, especially if you have unusual bruising, bleeding, or other concerning symptoms.";
            }

            return "Discuss the result with your healthcare professional. Do not start supplements or treatment based on this value alone unless advised.";
        }

        if (result === "High") {

            if (
                test.includes("creatinine") ||
                test.includes("bun") ||
                test.includes("urea")
            ) {
                return "Discuss the result with your doctor. Kidney function may need to be reviewed using the complete kidney profile, medications, hydration status, and clinical history.";
            }

            if (
                test.includes("ast") ||
                test.includes("alt") ||
                test.includes("sgot") ||
                test.includes("sgpt") ||
                test.includes("bilirubin")
            ) {
                return "Discuss the result with your doctor. They may review medications, symptoms, alcohol exposure, other liver tests, and whether repeat testing is needed.";
            }

            if (
                test.includes("cholesterol") ||
                test.includes("ldl") ||
                test.includes("hdl")
            ) {
                return "Discuss the complete lipid profile with your healthcare professional. Lifestyle changes or treatment decisions should be based on the overall cardiovascular risk, not one number alone.";
            }

            if (
                test.includes("urine protein") ||
                (
                    test.includes("protein") &&
                    test.includes("creatinine")
                )
            ) {
                return "Discuss this result with your doctor. They may repeat urine testing and review blood pressure, kidney function, and other relevant findings.";
            }

            return "Discuss this abnormal result with your healthcare professional and interpret it together with your other results and symptoms.";
        }

        return "Please discuss this result with your healthcare professional.";
    }


    // =====================================================
    // COMPLETE PATIENT EXPLANATION
    // =====================================================

    getPatientExplanation(
        name,
        value,
        unit,
        status,
        referenceRange
    ) {

        const normalizedStatus =
            this.normalizeStatus(status);

        return {

            summary:
                normalizedStatus === "Normal"
                    ? "This value is within the listed reference range."
                    : `This value is ${normalizedStatus.toLowerCase()} compared with the listed reference range.`,

            whyItMayHappen:
                this.getWhyItMayHappen(
                    name,
                    normalizedStatus
                ),

            whatItMayMean:
                this.getWhatItMayMean(
                    name,
                    normalizedStatus
                ),

            whatToDo:
                this.getWhatToDo(
                    name,
                    normalizedStatus
                )

        };
    }


    // =====================================================
    // BUILD PATIENT REPORT SUMMARY
    // =====================================================

    buildPatientReportSummary(uploadedReport) {

        const aiAnalysis =
            uploadedReport.aiAnalysis || {};

        const medicalAnalysis =
            uploadedReport.medicalAnalysis || {};

        const parameters =
            Array.isArray(aiAnalysis.parameters)
                ? aiAnalysis.parameters
                : [];

        const doctorSummary =
            medicalAnalysis.summary?.doctorSummary || {};

        const diseases =
            Array.isArray(
                doctorSummary.suspectedDiseases
            )
                ? doctorSummary.suspectedDiseases
                : [];

        const values =
            parameters.map(parameter => {

                const name =
                    parameter?.name || "Test";

                const value =
                    parameter?.value ?? "Not available";

                const unit =
                    parameter?.unit || "";

                const referenceRange =
                    parameter?.referenceRange ||
                    parameter?.normalRange ||
                    parameter?.reference ||
                    "Not provided";

                const rawStatus =
                    parameter?.flag ||
                    parameter?.status ||
                    parameter?.interpretation ||
                    "";

                const status =
                    this.normalizeStatus(
                        rawStatus
                    );

                const explanation =
                    this.getPatientExplanation(
                        name,
                        value,
                        unit,
                        status,
                        referenceRange
                    );

                return {

                    name,

                    value,

                    unit,

                    referenceRange,

                    status,

                    explanation

                };

            });

        return {

            reportId:
                String(uploadedReport._id),

            fileName:
                uploadedReport.originalFileName,

            reportType:
                aiAnalysis.reportType ||
                "Medical Report",

            severity:
                medicalAnalysis.severity?.overallSeverity ||
                doctorSummary.severity ||
                "Low",

            values,

            findings:
                diseases,

            patientMessage:
                this.getPatientReportMessage(
                    values,
                    diseases
                )

        };
    }


    // =====================================================
    // PATIENT REPORT MESSAGE
    // =====================================================

    getPatientReportMessage(values, diseases) {

        const abnormalValues =
            values.filter(
                item =>
                    item.status === "High" ||
                    item.status === "Low"
            );

        if (abnormalValues.length === 0) {

            if (values.length > 0) {

                return (
                    "The available values are within the " +
                    "reference ranges shown on the report."
                );

            }

            return (
                "No individual test values were available " +
                "from this report."
            );
        }

        return (
            `${abnormalValues.length} value(s) are outside ` +
            `the reference ranges shown on this report. ` +
            `These results should be interpreted together ` +
            `with your symptoms, medical history and other tests.`
        );
    }


    // =====================================================
    // CREATE FINAL RESPONSE
    // =====================================================

    async createFinalResponse(
        report,
        conversation,
        consultationPriority,
        consultationSeverity
    ) {

        const reports =
            await Report.find({
                conversationId: conversation._id
            })
            .sort({
                uploadedAt: 1,
                createdAt: 1
            });

        // -------------------------------------------------
        // Remove duplicate filenames
        // -------------------------------------------------

        const uniqueReportMap = new Map();

        for (const item of reports) {

            const fileKey =
                String(
                    item.originalFileName || ""
                )
                .trim()
                .toLowerCase();

            if (!uniqueReportMap.has(fileKey)) {

                uniqueReportMap.set(
                    fileKey,
                    item
                );

            }
        }

        const allReports =
            Array.from(
                uniqueReportMap.values()
            );

        // -------------------------------------------------
        // Priority / severity
        // -------------------------------------------------

        let highestPriority =
            consultationPriority || "Low";

        let highestSeverity =
            consultationSeverity || "Low";

        let highestPriorityLevel =
            this.getPriorityLevel(
                highestPriority
            );

        let highestSeverityLevel =
            this.getPriorityLevel(
                highestSeverity
            );

        const allReportSummaries = [];
        const allRecommendations = [];
        const allSuspectedDiseases = [];

        // -------------------------------------------------
        // Process reports
        // -------------------------------------------------

        for (const uploadedReport of allReports) {

            const analysis =
                uploadedReport.medicalAnalysis || {};

            const reportPriority =
                analysis.priority?.priority ||
                "Low";

            const reportSeverity =
                analysis.severity?.overallSeverity ||
                "Low";

            const currentPriorityLevel =
                this.getPriorityLevel(
                    reportPriority
                );

            if (
                currentPriorityLevel >
                highestPriorityLevel
            ) {

                highestPriority =
                    reportPriority;

                highestPriorityLevel =
                    currentPriorityLevel;
            }

            const currentSeverityLevel =
                this.getPriorityLevel(
                    reportSeverity
                );

            if (
                currentSeverityLevel >
                highestSeverityLevel
            ) {

                highestSeverity =
                    reportSeverity;

                highestSeverityLevel =
                    currentSeverityLevel;
            }

            const doctorSummary =
                analysis.summary?.doctorSummary || {};

            const diseases =
                Array.isArray(
                    doctorSummary.suspectedDiseases
                )
                    ? doctorSummary.suspectedDiseases
                    : [];

            allSuspectedDiseases.push(
                ...diseases
            );

            const patientSummary =
                this.buildPatientReportSummary(
                    uploadedReport
                );

            allReportSummaries.push(
                patientSummary
            );

            const recommendations =
                analysis.recommendations || {};

            const reportRecommendations = [

                ...(Array.isArray(recommendations.diet)
                    ? recommendations.diet
                    : []),

                ...(Array.isArray(recommendations.lifestyle)
                    ? recommendations.lifestyle
                    : []),

                ...(Array.isArray(recommendations.tests)
                    ? recommendations.tests
                    : []),

                ...(Array.isArray(recommendations.emergency)
                    ? recommendations.emergency
                    : [])

            ];

            allRecommendations.push(
                ...reportRecommendations
            );
        }

        // -------------------------------------------------
        // Unique diseases
        // -------------------------------------------------

        const uniqueDiseases = [
            ...new Set(
                allSuspectedDiseases
                    .filter(Boolean)
                    .map(
                        item =>
                            typeof item === "string"
                                ? item.trim()
                                : (
                                    item.name ||
                                    item.condition ||
                                    item.title ||
                                    ""
                                ).trim()
                    )
                    .filter(Boolean)
            )
        ];

        // -------------------------------------------------
        // Unique recommendations
        // -------------------------------------------------

        const uniqueRecommendations = [
            ...new Set(
                allRecommendations
                    .filter(Boolean)
                    .map(
                        item =>
                            String(item).trim()
                    )
            )
        ];

        // -------------------------------------------------
        // Consultation conditions
        // -------------------------------------------------

        const possibleConditionsText =
            conversation.possibleConditions?.length

                ? conversation.possibleConditions
                    .map(condition => {

                        if (
                            typeof condition === "string"
                        ) {
                            return `- ${condition}`;
                        }

                        return (
                            `- ${
                                condition.name ||
                                condition.condition ||
                                "Possible condition"
                            }`
                        );
                    })
                    .join("\n")

                : "No possible conditions recorded.";

        // -------------------------------------------------
        // Tests
        // -------------------------------------------------

        const recommendedTestsText =
            conversation.recommendedTests?.length

                ? conversation.recommendedTests
                    .map(test => {

                        if (
                            typeof test === "string"
                        ) {
                            return `- ${test}`;
                        }

                        return (
                            `- ${
                                test.name ||
                                test.test ||
                                test.title ||
                                "Recommended test"
                            }`
                        );
                    })
                    .join("\n")

                : "No recommended tests recorded.";

        // -------------------------------------------------
        // Abnormal findings text
        // -------------------------------------------------

        const reportFindingsText =
            allReportSummaries
                .map(reportItem => {

                    const abnormal =
                        reportItem.values.filter(
                            value =>
                                value.status === "High" ||
                                value.status === "Low"
                        );

                    if (!abnormal.length) {

                        return `
${reportItem.reportType}

File: ${reportItem.fileName}

- No abnormal values identified from the available data.
`;
                    }

                    return `
${reportItem.reportType}

File: ${reportItem.fileName}

${abnormal
    .map(value => {

        return `
- ${value.name}: ${value.value}${value.unit ? " " + value.unit : ""}
  Reference: ${value.referenceRange}
  Status: ${value.status}
  Why it may happen: ${value.explanation.whyItMayHappen}
  What it may mean: ${value.explanation.whatItMayMean}
  What to do: ${value.explanation.whatToDo}
`;

    })
    .join("\n")}
`;

                })
                .join("\n");

        // -------------------------------------------------
        // FINAL CONCLUSION
        // -------------------------------------------------

        const abnormalCount =
            allReportSummaries.reduce(
                (count, reportItem) => {

                    return (
                        count +
                        reportItem.values.filter(
                            value =>
                                value.status === "High" ||
                                value.status === "Low"
                        ).length
                    );

                },
                0
            );

        let finalConclusion;

        if (abnormalCount === 0) {

            finalConclusion =
                "The available report values are within the listed reference ranges. The results should still be interpreted together with the patient's symptoms and medical history.";

        } else if (
            highestPriority === "Critical" ||
            highestPriority === "Life-threatening"
        ) {

            finalConclusion =
                "The combined assessment contains findings that require urgent medical review. This result is not a diagnosis. A healthcare professional should review the abnormal values, symptoms, medical history, and consultation findings promptly.";

        } else if (
            highestPriority === "High"
        ) {

            finalConclusion =
                "The combined assessment contains abnormal findings that should receive timely medical review. The abnormal values do not by themselves establish a diagnosis and should be interpreted together with the patient's symptoms, medical history, and other test results.";

        } else {

            finalConclusion =
                "Some report values are outside the listed reference ranges. These findings may have several possible causes and should be reviewed with a healthcare professional before drawing conclusions or starting treatment.";

        }

        // -------------------------------------------------
        // Combined assessment
        // -------------------------------------------------

        const combinedAssessment = `

WHAT YOUR RESULTS MAY MEAN

Your consultation and uploaded medical reports have been
reviewed together.

This information is intended to help explain the reported
results. It is not a diagnosis.

--------------------------------------------------

CONSULTATION SUMMARY

${conversation.clinicalSummary ||
"No clinical summary available."}

--------------------------------------------------

POSSIBLE CONDITIONS

${possibleConditionsText}

--------------------------------------------------

RECOMMENDED TESTS

${recommendedTestsText}

--------------------------------------------------

UPLOADED REPORT FINDINGS

${reportFindingsText ||
"No uploaded report findings available."}

--------------------------------------------------

COMBINED REPORT FINDINGS

${
    uniqueDiseases.length > 0
        ? uniqueDiseases
            .map(
                disease => `- ${disease}`
            )
            .join("\n")
        : "- No additional suspected findings identified."
}

--------------------------------------------------

COMBINED RECOMMENDATIONS

${
    uniqueRecommendations.length > 0
        ? uniqueRecommendations
            .map(
                recommendation =>
                    `- ${recommendation}`
            )
            .join("\n")
        : "- No additional recommendations recorded."
}

--------------------------------------------------

FINAL CONCLUSION

${finalConclusion}

--------------------------------------------------

FINAL PRIORITY: ${highestPriority}

FINAL SEVERITY: ${highestSeverity}

`;

        // -------------------------------------------------
        // Report IDs
        // -------------------------------------------------

        const uniqueReportIds =
            allReports.map(
                item => item._id
            );

        // -------------------------------------------------
        // Update conversation
        // -------------------------------------------------

        await AIConversation.findByIdAndUpdate(
            conversation._id,
            {
                $set: {

                    reportUploaded:
                        allReports.length > 0,

                    combinedAssessment,

                    reportSummary:
                        allReportSummaries,

                    finalSeverity:
                        highestSeverity,

                    finalPriority:
                        highestPriority,

                    reportIds:
                        uniqueReportIds

                }
            }
        );

        // -------------------------------------------------
        // Return
        // -------------------------------------------------

        return {

            report,

            consultation: {

                priority:
                    consultationPriority,

                severity:
                    consultationSeverity,

                clinicalSummary:
                    conversation.clinicalSummary

            },

            reportAnalysis: {

                reportType:
                    report.aiAnalysis?.reportType,

                extractedData: {},

                severity:
                    report.medicalAnalysis
                        ?.severity
                        ?.overallSeverity ||
                    "Low",

                priority:
                    report.medicalAnalysis
                        ?.priority
                        ?.priority ||
                    "Low",

                summary:
                    report.medicalAnalysis
                        ?.summary,

                recommendations:
                    report.medicalAnalysis
                        ?.recommendations

            },

            finalAssessment: {

                severity:
                    highestSeverity,

                priority:
                    highestPriority,

                combinedAssessment,

                reportSummary:
                    allReportSummaries,

                uploadedReportCount:
                    allReports.length,

                suspectedFindings:
                    uniqueDiseases,

                recommendations:
                    uniqueRecommendations,

                finalConclusion

            }

        };
    }


    // =====================================================
    // UPLOAD REPORT
    // =====================================================

    async uploadReport(
        patientId,
        conversationId,
        file
    ) {

        if (!file) {
            throw new Error("No file uploaded");
        }

        if (!conversationId) {
            throw new Error("Conversation ID is required");
        }

        const conversation =
            await AIConversation.findById(
                conversationId
            );

        if (!conversation) {
            throw new Error("AI conversation not found");
        }

        if (
            conversation.patientId.toString() !==
            patientId.toString()
        ) {

            throw new Error(
                "This conversation does not belong to this patient"
            );

        }

        // -------------------------------------------------
        // Duplicate check
        // -------------------------------------------------

        const existingReport =
            await Report.findOne({

                patientId,

                conversationId,

                originalFileName:
                    file.originalname

            });

        if (existingReport) {

            const result =
                await this.createFinalResponse(

                    existingReport,

                    conversation,

                    conversation.priority ||
                    "Low",

                    conversation.severity ||
                    "Low"

                );

            return {

                ...result,

                duplicate: true,

                message:
                    "This report was already uploaded."

            };
        }

        // -------------------------------------------------
        // AI analysis
        // -------------------------------------------------

        const aiAnalysis =
            await reportAIService.analyzeReport(
                file
            );

        // -------------------------------------------------
        // Extract values
        // -------------------------------------------------

        const reportData = {};

        if (
            aiAnalysis &&
            Array.isArray(
                aiAnalysis.parameters
            )
        ) {

            aiAnalysis.parameters.forEach(
                param => {

                    const name =
                        String(
                            param.name || ""
                        )
                        .toLowerCase()
                        .trim();

                    const value =
                        Number(
                            String(
                                param.value ?? ""
                            )
                            .replace(/,/g, "")
                            .replace(/[^\d.-]/g, "")
                        );

                    if (Number.isNaN(value)) {
                        return;
                    }

                    // Diabetes
                    if (
                        name.includes("fasting glucose") ||
                        name.includes("fasting sugar")
                    ) {

                        reportData.fastingGlucose =
                            value;

                    } else if (
                        name.includes("post prandial") ||
                        name.includes("postprandial") ||
                        name === "pp" ||
                        name.includes("pp glucose")
                    ) {

                        reportData.ppGlucose =
                            value;

                    } else if (
                        name.includes("hba1c") ||
                        name.includes("hb a1c")
                    ) {

                        reportData.hba1c =
                            value;

                    }

                    // CBC
                    else if (
                        name.includes("hemoglobin") ||
                        name.includes("haemoglobin")
                    ) {

                        reportData.hemoglobin =
                            value;

                    } else if (
                        name === "rbc" ||
                        name.includes("rbc count") ||
                        name.includes("red blood cell")
                    ) {

                        reportData.rbc =
                            value;

                    } else if (
                        name === "wbc" ||
                        name.includes("wbc count") ||
                        name.includes("white blood cell") ||
                        name.includes("total leukocyte")
                    ) {

                        reportData.wbc =
                            value;

                    } else if (
                        name.includes("platelet")
                    ) {

                        let plateletValue =
                            value;

                        const unit =
                            String(
                                param.unit || ""
                            )
                            .toLowerCase();

                        if (
                            unit.includes("lakh") ||
                            unit.includes("lac")
                        ) {

                            plateletValue *= 100000;

                        }

                        reportData.platelet =
                            plateletValue;

                    } else if (
                        name === "mcv" ||
                        name.includes("mean corpuscular volume")
                    ) {

                        reportData.mcv =
                            value;

                    } else if (
                        name === "mch" ||
                        name.includes("mean corpuscular hemoglobin") ||
                        name.includes("mean cell haemoglobin")
                    ) {

                        reportData.mch =
                            value;

                    } else if (
                        name === "mchc" ||
                        name.includes("mean corpuscular hemoglobin concentration")
                    ) {

                        reportData.mchc =
                            value;

                    } else if (
                        name.includes("rdw")
                    ) {

                        reportData.rdw =
                            value;

                    } else if (
                        name.includes("neutrophil") ||
                        name === "neut"
                    ) {

                        reportData.neutrophils =
                            value;

                    } else if (
                        name.includes("lymphocyte") ||
                        name === "lymph"
                    ) {

                        reportData.lymphocytes =
                            value;

                    } else if (
                        name.includes("eosinophil") ||
                        name === "eosin"
                    ) {

                        reportData.eosinophils =
                            value;

                    } else if (
                        name.includes("monocyte") ||
                        name === "mono"
                    ) {

                        reportData.monocytes =
                            value;

                    } else if (
                        name.includes("basophil") ||
                        name === "baso"
                    ) {

                        reportData.basophils =
                            value;

                    }

                    // Liver
                    else if (
                        name === "ast" ||
                        name.includes("sgot") ||
                        name.includes("aspartate aminotransferase")
                    ) {

                        reportData.ast =
                            value;

                    } else if (
                        name === "alt" ||
                        name.includes("sgpt") ||
                        name.includes("alanine aminotransferase")
                    ) {

                        reportData.alt =
                            value;

                    } else if (
                        name.includes("total bilirubin")
                    ) {

                        reportData.totalBilirubin =
                            value;

                    } else if (
                        name.includes("direct bilirubin")
                    ) {

                        reportData.directBilirubin =
                            value;

                    } else if (
                        name === "albumin" ||
                        name.includes("serum albumin")
                    ) {

                        reportData.albumin =
                            value;

                    } else if (
                        name === "alp" ||
                        name.includes("alkaline phosphatase")
                    ) {

                        reportData.alp =
                            value;

                    }

                    // Kidney
                    else if (
                        name === "creatinine" ||
                        name.includes("serum creatinine")
                    ) {

                        reportData.creatinine =
                            value;

                    } else if (
                        name === "bun" ||
                        name.includes("blood urea nitrogen")
                    ) {

                        reportData.bun =
                            value;

                    } else if (
                        name === "urea" ||
                        name.includes("blood urea")
                    ) {

                        reportData.urea =
                            value;

                    } else if (
                        name.includes("uric acid")
                    ) {

                        reportData.uricAcid =
                            value;

                    } else if (
                        name === "sodium" ||
                        name.includes("serum sodium")
                    ) {

                        reportData.sodium =
                            value;

                    } else if (
                        name === "potassium" ||
                        name.includes("serum potassium")
                    ) {

                        reportData.potassium =
                            value;

                    }

                    // Urine
                    else if (
                        name.includes("protein/creatinine ratio") ||
                        name.includes("protein creatinine ratio") ||
                        name.includes("pcr ratio")
                    ) {

                        reportData.proteinCreatinineRatio =
                            value;

                    } else if (
                        name === "urine protein" ||
                        name.includes("urinary protein")
                    ) {

                        reportData.urineProtein =
                            value;

                    } else if (
                        name.includes("specific gravity")
                    ) {

                        reportData.specificGravity =
                            value;

                    }

                    // LDH
                    else if (
                        name === "ldh" ||
                        name.includes("lactate dehydrogenase")
                    ) {

                        reportData.ldh =
                            value;

                    }

                }
            );

        }

        // -------------------------------------------------
        // Medical engine
        // -------------------------------------------------

        const medicalAnalysis =
            medicalEngine.analyze(
                reportData,
                aiAnalysis.reportType,
                "female"
            );

        // -------------------------------------------------
        // Save
        // -------------------------------------------------

        const report =
            await Report.create({

                patientId,

                conversationId,

                originalFileName:
                    file.originalname,

                storedFileName:
                    file.filename,

                filePath:
                    file.path,

                fileType:
                    file.mimetype,

                extractedText:
                    null,

                aiAnalysis,

                medicalAnalysis,

                status:
                    "Completed"

            });

        // -------------------------------------------------
        // Final result
        // -------------------------------------------------

        const result =
            await this.createFinalResponse(

                report,

                conversation,

                conversation.priority ||
                "Low",

                conversation.severity ||
                "Low"

            );

        result.reportAnalysis.extractedData =
            reportData;

        return {

            ...result,

            duplicate: false,

            message:
                "Report uploaded and analyzed successfully"

        };
    }
}


module.exports =
    new ReportService();