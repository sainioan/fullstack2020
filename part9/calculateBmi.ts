type Result = string;
type bmi = number;
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
    console.log(calculateBmi(180, 74))
} catch (e) {
  console.log('Something went wrong, error message: ', e.message);
}
