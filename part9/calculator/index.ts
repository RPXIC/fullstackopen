import express from 'express';
const bmiCalc = require('./bmiCalculator');
const exerciseCalc = require('./exerciseCalculator');
const app = express();
app.use(express.json());

app.get('/', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi?:height?:weight', (req, res) => {
    const arr = ["0","0",req.query.height, req.query.weight];
    const result = bmiCalc(arr); 
    res.send(result);
});

app.post('/exercises', (req, res) => {
    const { daily_exercises, target } = req.body;
    if (!daily_exercises || !target) return res.send({error: "parameters missing"});
    const resp = exerciseCalc(daily_exercises, target);
    return res.send(resp);
});

const PORT = 3002;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});