import express from 'express';
const app = express();

import  exerciseCalculator from './exerciseCalculator'
import calculateBmi from './calculateBmi'
import bodyParser from "body-parser";
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get('/bmi', (_req, res) => {
 res.send(calculateBmi(Number(_req.query.height), Number(_req.query.weight)));
});  
interface Numbers2 {
    target: number;
    daily_exercises: number[];
  }

  app.post('/exercises', (_req, _res) => {
 
  const  body  = _req.body as Numbers2 ;
  const  daily_exercises = body.daily_exercises;
  const  target  = body.target;
/*    const daily_exercises = _req.body.daily_exercises
   const target = Number(_req.body.target) */
    if (!daily_exercises || !target) {
    _res.status(400).json({ error: 'parameters missing' });
   
    }
  
    if (!(daily_exercises instanceof Array) || !(typeof target === 'number')) {
    
      _res.status(400).json({ error: 'malformatted parameters' });
    
    }
    
    _res.json(exerciseCalculator(daily_exercises.map(Number), Number(target)));

  });
  app.get('/exercises', (_req, res) => {
  res.send(_req.body)
  }); 
app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
  }); 

const PORT = 3003;

 app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
