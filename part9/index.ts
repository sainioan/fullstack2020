import express from 'express';
const app = express();
// import { exerciseCalculator,  TrainingResult,  Numbers2 , } from './exerciseCalculator'
import calculateBmi from './calculateBmi'


app.get('/bmi', (_req, res) => {
  res.send(calculateBmi(Number(_req.query.height), Number(_req.query.weight)));
});  

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
  }); 

const PORT = 3003;

 app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
