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

const exerciseCalculator = (numberOfDays: number[], trainingDays: number, target:number) :TrainingResult=> {

    let rating: number;
    let average: number;
    let success : boolean;
    let percentage: number;
    let ratingDescription: string;
    let totalHours: number;
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
if(percentage >=0.40 && 0<0.8){
rating = 2;
success = false;
ratingDescription = "approaching";
}
if(percentage >= 0.8 && percentage <1){
rating = 3;
ratingDescription = "meets";
}

let myExerciseLog = createCalculator({periodLength:periodLength, trainingDays:trainingDays,success:success, rating:rating, ratingDescription:ratingDescription, target:target, average:average})
return ({periodLength:periodLength, trainingDays:trainingDays,success:success, rating:rating, ratingDescription:ratingDescription, target:target, average:average});
}

console.log(exerciseCalculator([3, 0, 2, 4.5, 0, 3, 1],5,2))