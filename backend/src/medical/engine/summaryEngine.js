class SummaryEngine {

    generate(analysis) {

        const report = analysis.cbc || analysis.diabetes;

        const diseases = analysis.diseases || [];

        const severity = analysis.severity;

        const priority = analysis.priority;

        const abnormalParameters = [];

        Object.keys(report).forEach(key => {

            if (!report[key]) return;

            if (report[key].status !== "Normal") {

                abnormalParameters.push({

                    parameter: report[key].parameter,

                    value: report[key].value,

                    status: report[key].status,

                    severity: report[key].severity

                });

            }

        });

        return {

            overallHealth: severity.overallSeverity,

            priority: priority.priority,

            possibleDiseases: diseases.map(d => d.name),

            abnormalParameters,

            patientSummary: this.patientSummary(

                severity,

                priority,

                diseases

            ),

            doctorSummary: this.doctorSummary(

                severity,

                diseases

            )

        };

    }

    patientSummary(severity, priority, diseases) {

        let message = `Your report shows ${severity.overallSeverity.toLowerCase()} abnormalities. `;

        if (diseases.length > 0) {

            message += `Possible conditions include ${diseases.map(d => d.name).join(", ")}. `;

        }

        message += `Medical Priority: ${priority.priority}.`;

        return message;

    }

    doctorSummary(severity, diseases) {

        return {

            severity: severity.overallSeverity,

            suspectedDiseases: diseases.map(d => ({

                disease: d.name,

                confidence: d.confidence

            }))

        };

    }

}

module.exports = new SummaryEngine();