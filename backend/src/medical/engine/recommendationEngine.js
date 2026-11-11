const diet = require("../recommendations/diet");
const lifestyle = require("../recommendations/lifestyle");
const tests = require("../recommendations/tests");
const emergency = require("../recommendations/emergency");

class RecommendationEngine {

    generate(analysis) {

        const diseases = analysis.diseases || [];

        const severity = analysis.severity;

        const priority = analysis.priority;

        const recommendations = {

            diet: [],

            lifestyle: [],

            tests: [],

            emergency: [],

            medications: []

        };

        diseases.forEach(disease => {

            if (!disease.recommendations) return;

            recommendations.diet.push(
                ...(disease.recommendations.diet || [])
            );

            recommendations.lifestyle.push(
                ...(disease.recommendations.lifestyle || [])
            );

            recommendations.medications.push(
                ...(disease.recommendations.medications || [])
            );

            recommendations.tests.push(
                ...(disease.recommendations.followUp || [])
            );

        });

        recommendations.diet.push(...diet);

        recommendations.lifestyle.push(...lifestyle);

        recommendations.tests.push(...tests);

        if (
            severity &&
            priority &&
            (
                severity.overallSeverity === "Critical" ||
                priority.priority === "Emergency"
            )
        ) {

            recommendations.emergency.push(...emergency);

        }

        recommendations.diet = [...new Set(recommendations.diet)];
        recommendations.lifestyle = [...new Set(recommendations.lifestyle)];
        recommendations.tests = [...new Set(recommendations.tests)];
        recommendations.medications = [...new Set(recommendations.medications)];
        recommendations.emergency = [...new Set(recommendations.emergency)];

        return recommendations;

    }

}

module.exports = new RecommendationEngine();