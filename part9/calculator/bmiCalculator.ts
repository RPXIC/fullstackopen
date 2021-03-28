interface CalculatorValues {
    height: number,
    weight: number,
    bmi: string
}

interface _Error {
    error: string
}

interface MultiplyValues {
    value1: number;
    value2: number;
}

module.exports = (args:Array<string>): CalculatorValues | _Error => {
    const parseArguments = (args: Array<string>): MultiplyValues => {
        if (args.length < 4) throw new Error('Not enough arguments');
        if (args.length > 4) throw new Error('Too many arguments');

        if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
            return {
                value1: Number(args[2]),
                value2: Number(args[3])
            };
        } else {
            throw new Error('Provided values were not numbers!');
        }
    };
  
    const result = (a: number, b: number): string => {
        const res = (b / (a/100*2));

        if (res < 15) return "Very severely underweight";
        if (res >= 15 && res < 16) return "Severely underweight";
        if (res >= 16 && res < 18.5) return "Underweight";
        if (res >= 18.5 && res < 25) return "Normal (healthy weight)";
        if (res >= 25 && res < 30) return "Overweight";
        if (res >= 30 && res < 35) return "Obese Class I (Moderately obese)";
        if (res >= 35 && res < 40) return "Obese Class II (Severely obese)";
        if (res >= 40) return "Obese Class III (Very severely obese)";

        return "invalid arguments";
    };
  
    try {
        const { value1, value2 } = parseArguments(args);
        return {
            weight: value2,
            height: value1,
            bmi: result(value1, value2)
        };
    } catch (e) {
        return {
            error: "malformatted parameters"
        };
    }
};