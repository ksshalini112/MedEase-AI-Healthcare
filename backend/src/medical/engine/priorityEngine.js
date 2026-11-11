class PriorityEngine {

    calculate(severity) {

        let priority = "Low";
        let color = "Green";
        let waitingTime = "Within 24 hours";
        let action = "Routine Consultation";

        switch (severity.overallSeverity) {

            case "Critical":
                priority = "Emergency";
                color = "Red";
                waitingTime = "Immediate";
                action = "Immediate Doctor Consultation / ICU if required";
                break;

            case "High":
                priority = "High";
                color = "Orange";
                waitingTime = "Within 30 Minutes";
                action = "Urgent Doctor Consultation";
                break;

            case "Medium":
                priority = "Medium";
                color = "Yellow";
                waitingTime = "Within 2 Hours";
                action = "Consult Doctor Today";
                break;

            default:
                priority = "Low";
                color = "Green";
                waitingTime = "Within 24 Hours";
                action = "Routine Follow-up";
        }

        return {

            priority,

            color,

            waitingTime,

            action

        };

    }

}

module.exports = new PriorityEngine();