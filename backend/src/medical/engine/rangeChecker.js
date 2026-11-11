class RangeChecker {

    check(value, min, max) {

        value = Number(value);

        if (isNaN(value)) return null;

        if (value < min) return "low";

        if (value > max) return "high";

        return "normal";
    }

}

module.exports = new RangeChecker();