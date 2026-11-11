class SeverityEngine {

    calculate(reportAnalysis) {

        if (!reportAnalysis) {

            return {

                overallSeverity: "Normal",

                score: 0,

                abnormalParameters: 0,

                findings: []

            };

        }

        let score = 0;

        let findings = [];

        Object.keys(reportAnalysis).forEach(parameter => {

            const item = reportAnalysis[parameter];

            if (!item || !item.severity) return;

            switch (item.severity) {

                case "Medium":

                    score += 2;

                    findings.push({
                        parameter,
                        severity: "Medium"
                    });

                    break;

                case "High":

                    score += 4;

                    findings.push({
                        parameter,
                        severity: "High"
                    });

                    break;

                case "Critical":

                    score += 8;

                    findings.push({
                        parameter,
                        severity: "Critical"
                    });

                    break;

            }

        });

        let overallSeverity = "Normal";

        if (score >= 20) {

            overallSeverity = "Critical";

        }

        else if (score >= 12) {

            overallSeverity = "High";

        }

        else if (score >= 5) {

            overallSeverity = "Medium";

        }

        return {

            overallSeverity,

            score,

            abnormalParameters: findings.length,

            findings

        };

    }

}

module.exports = new SeverityEngine();