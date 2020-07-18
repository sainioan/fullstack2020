
export interface TrainingResult {
     periodLength: number;
        trainingDays: number;
        success: boolean;
        rating: number,
        ratingDescription: string;
        target: number;
        average: number;
     
}


export interface Numbers2 {
    target: number;
    numberOfDays: number[];
  }

 export const parseArguments2 = (args: Array<string>): Numbers2 => {
    if (args.length < 2) throw new Error('Not enough arguments');
 
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        const [, , , ...elements] = args;
        const numberOfDays = elements.map((n) => Number(n));

      return {
          
        numberOfDays: numberOfDays,
        
        target:  Number(args[2])

      }
    } else {
      throw new Error('Provided values were not numbers!');
    }
  } 
   

const exerciseCalculator = (numberOfDays: number[], target:number) :TrainingResult=> {

    let rating = 0;
   // let trainingDays;
    let average;
    let success =false;
    let percentage;
    let ratingDescription = '';
    //let totalHours;

    const numberOfTrainingDays = numberOfDays.filter(n => n!==0);
    const trainingDays = numberOfTrainingDays.length;
    const periodLength = numberOfDays.length;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const reducer = (accumulator: any, currentValue: any) => accumulator + currentValue;

    const totalHours = numberOfDays.reduce(reducer);
  
    average = totalHours/periodLength;
    percentage = average/target;
if (percentage === 1 || percentage >1) {
    rating = 3;
    success = true;
    ratingDescription= "excellent";
}
if (percentage >0 && percentage < 0.4){
rating = 1;
success = false;
ratingDescription = "developing";
}
if((percentage >0.39) && (percentage <0.9)){
rating = 2;
success = false;
ratingDescription = "approaching";
}
if(percentage > 0.89 && percentage <1){
rating = 3;
ratingDescription = "meets";
success = false;
}

if (numberOfDays === null) {
numberOfDays === [0]
}
return ({periodLength:periodLength,trainingDays,success:success, rating:rating, ratingDescription:ratingDescription, target:target, average:average});
}

//console.log(exerciseCalculator([3, 0, 2, 4.5, 0, 3, 1],2))
if (require.main === module) {

 try {

    const { numberOfDays, target } = parseArguments2(process.argv);
    console.log(exerciseCalculator (numberOfDays,target));
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      console.log('Error in module exerciseCalculator, something bad happened, message: ', e.message);
    }
}
    export default exerciseCalculator 