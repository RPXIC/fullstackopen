interface ParsedValues {
    argsParsed: Array<number>
    objective: number
}

interface ExerciseValues {
    periodLength: number
    trainingDays: number
    target: number
    average: number
    success: boolean
    rating: number
    ratingDescription: string
}

interface _Error {
    error: string
}

module.exports = (args: Array<string>, c: string): ExerciseValues | _Error => {
    const _parseArguments = (args: Array<string>, c: string): ParsedValues => {
        if (args.length <= 1) throw new Error('Not enough arguments');
        const objective = Number(c);
        const argsParsed: Array<number> = [];
        args.forEach(arg => {
            if(!isNaN(Number(arg))) argsParsed.push(Number(arg));
            else throw new Error('malformatted parameters');
        });
        return {argsParsed, objective};
    };

    const getRating = (a: Array<number>, objective: number): number => {
        let value = 0;
        a.forEach(day => {
            if (day < objective) value+=1;
            if (day === objective) value+=2;
            if (day > objective) value+=3;
        });
        return Math.round(value/a.length);
    };

    const getRatingDescription = (rating: number): string => {
        if (rating < 2) return "You have not reached the objective :(";
        if (rating === 2) return "Not too bad but could be better :)";
        if (rating > 2) return "Incredible! you have exceeded the objective :D";
        return "invalid arguments";
    };
    
    const resu = (a: Array<number>, objective: number): ExerciseValues => {
        const periodLength = a.length;
        const trainingDays = a.reduce((a, b) => b > 0 ? a + 1 : a, 0);
        const target = objective;
        const average = a.reduce((a, b) => a + b) / a.length;
        const success = average >= target;
        const rating = getRating(a, objective);
        const ratingDescription = getRatingDescription(rating);
        return {periodLength, trainingDays, target, average, success, rating, ratingDescription};
    };
    
    try {
        const {argsParsed, objective} = _parseArguments(args, c);
        getRating(argsParsed, objective);
        return resu(argsParsed, objective);
    } catch (e) {
        return {
            error: "malformatted parameters"
        };
    }
};