const diseaseEngine = require("./src/medical/engine/diseaseEngine");

const report = {

    cbc: {

        hemoglobin: "low",

        mcv: "low",

        mch: "low",

        rdw: "high",

        platelets: "low"

    }

};

console.log(diseaseEngine.analyze(report));