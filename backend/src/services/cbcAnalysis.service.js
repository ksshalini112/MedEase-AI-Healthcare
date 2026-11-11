class CBCAnalysisService {

    analyze(parameters) {

        const abnormalParameters = [];
        const possibleConditions = [];
        const recommendations = [];

        parameters.forEach(parameter => {

            const name = parameter.name.toLowerCase();
            const value = Number(parameter.value);

            // Skip invalid values
            if (isNaN(value)) return;

            //------------------------
            // Hemoglobin
            //------------------------

            if (name.includes("hemoglobin")) {

                if (value < 7) {

                    parameter.status = "Critical";

                    abnormalParameters.push(parameter);

                    possibleConditions.push("Severe Anemia");

                }

                else if (value < 12) {

                    parameter.status = "Low";

                    abnormalParameters.push(parameter);

                    possibleConditions.push("Anemia");

                }

            }

            //------------------------
            // Platelets
            //------------------------

            if (name.includes("platelet")) {

                if (value < 50000) {

                    parameter.status = "Critical";

                    abnormalParameters.push(parameter);

                    possibleConditions.push("Severe Thrombocytopenia");

                }

                else if (value < 150000) {

                    parameter.status = "Low";

                    abnormalParameters.push(parameter);

                    possibleConditions.push("Possible Dengue");

                }

            }

            //------------------------
            // WBC
            //------------------------

            if (name.includes("wbc")) {

                if (value > 11000) {

                    parameter.status = "High";

                    abnormalParameters.push(parameter);

                    possibleConditions.push("Possible Bacterial Infection");

                }

                else if (value < 4000) {

                    parameter.status = "Low";

                    abnormalParameters.push(parameter);

                    possibleConditions.push("Possible Viral Infection");

                }

            }

        });

        //------------------------

        if (abnormalParameters.length > 0) {

            recommendations.push("Consult a physician.");

            recommendations.push("Repeat CBC if clinically indicated.");

        }

        return {

            parameters,

            abnormalParameters,

            possibleConditions: [...new Set(possibleConditions)],

            recommendations

        };

    }

}

module.exports = new CBCAnalysisService();