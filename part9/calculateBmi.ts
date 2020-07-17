type Result = string;
export type bmi = number;

 interface Numbers {
  height: number;
  weight: number;
}

export const parseArguments = (args: Array<string>): Numbers => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
} 

const calculateBmi = (height: number, weight: number ) : Result => {
    if(weight<= 0 || height <= 0 || weight===NaN || height === NaN)
    throw new Error('invalid arguments!');
    
    const bmi =weight/((height/100)*(height/100));
    console.log('bmi:', bmi)
    let value ='';
    if(  (bmi > 18) && (bmi<26)) {
     value = "Normal (healthy weight)";
    }
    if( bmi < 18.5){
    value = "Underweight (unhealthy weight)";
    }
    if( bmi > 25){
     value =   "Overweight (unehealthy weight)";
    }
    return value;
  }
 

  try {

  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(weight, height));
  } catch (e) {
    console.log('Error, something bad happened, message: ', e.message);
  }

  export default calculateBmi
