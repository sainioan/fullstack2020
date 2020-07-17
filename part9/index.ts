import express from 'express';
const app = express();
// import { exerciseCalculator,  TrainingResult,  Numbers2 , } from './exerciseCalculator'
// import { calculateBmi, parseArguments } from './calculateBmi'


app.get('/ping', (_req, res) => {
  res.send('pong');
});  

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
  }); 

const PORT = 3003;

 app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
