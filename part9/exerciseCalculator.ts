
interface TrainingResult {
     periodLength: number;
        trainingDays: number;
        success: boolean;
        rating: number,
        ratingDescription: string;
        target: number;
        average: number;
     
}

function createCalculator(config:TrainingResult) {
    console.log()
}
interface Numbers2 {
    target: number;
    numberOfDays: number[];
  }

  const parseArguments2 = (args: Array<string>): Numbers2 => {
    if (args.length < 4) throw new Error('Not enough arguments');
 
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        const [, , , ...elements] = args;
        const numberOfDays = elements.map((n) => Number(n));
    /*     const numberOfDays = [Number(process.argv[3])]
        for (let j = 4; j < process.argv.length; j++) {
           numberOfDays.concat(Number(process.argv[j]));
          } */
      return {
          
        numberOfDays: numberOfDays,
        
        target:  Number(args[2])

      }
    } else {
      throw new Error('Provided values were not numbers!');
    }
  } 
   

const exerciseCalculator = (numberOfDays: number[], target:number) :TrainingResult=> {

    let rating: number;
    let trainingDays: number;
    let average: number;
    let success : boolean;
    let percentage: number;
    let ratingDescription: string;
    let totalHours: number;

    const numberOfTrainingDays = numberOfDays.filter(n => n!==0);
    trainingDays = numberOfTrainingDays.length;
    const periodLength = numberOfDays.length;
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
   
    totalHours = numberOfDays.reduce(reducer);
  
    average = totalHours/periodLength;
    percentage = average/target;
if (percentage >= 1) {
    rating = 3;
    success = true;
    ratingDescription= "excellent";
}
if (percentage >0 && percentage < 0.4){
rating = 1;
success = false;
ratingDescription = "developing";
}
if(percentage >=0.40 && 0<0.9){
rating = 2;
success = false;
ratingDescription = "approaching";
}
if(percentage >= 0.9 && percentage <1){
rating = 3;
ratingDescription = "meets";
}

let myExerciseLog = createCalculator({periodLength:periodLength, trainingDays:trainingDays,success:success, rating:rating, ratingDescription:ratingDescription, target:target, average:average})
return ({periodLength:periodLength, trainingDays:trainingDays,success:success, rating:rating, ratingDescription:ratingDescription, target:target, average:average});
}

//console.log(exerciseCalculator([3, 0, 2, 4.5, 0, 3, 1],2))
try {

    const { numberOfDays, target } = parseArguments2(process.argv);
    console.log(exerciseCalculator (numberOfDays,target));
    } catch (e) {
      console.log('Error, something bad happened, message: ', e.message);
    }
  