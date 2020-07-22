/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatientEntry, Gender } from './types';

/* eslint-disable @typescript-eslint/no-explicit-any */
const toNewPatientEntry = (object:any): NewPatientEntry => {
  const newEntry = {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        name: parseName(object.name),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        dateOfBirth:  parseDateOfBirth(object.dateOfBirth),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        ssn: parseSsn(object.ssn),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        gender: parseGender(object.gender),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        occupation: parseOccupation(object.occupation),
        entries: []
      };
      return newEntry;
};
const parseName = (name: any): string => {
    if (!name || !isString(name)) {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      throw new Error( `Incorrect or missing name:  ${name}`);
    }
  
    return name;
  };

  const parseOccupation = (occupation: any): string => {
    if (!occupation || !isString(occupation)) {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      throw new Error(`Incorrect or missing name:  ${occupation}`);;
    }
  
    return occupation;
  };

  const parseDateOfBirth = (dateOfBirth: any): string => {
    if (!dateOfBirth || !isString(dateOfBirth)) {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      throw new Error(`Incorrect or missing name:  ${dateOfBirth}`);
    }
  
    return dateOfBirth;
  };

  const parseSsn = (ssn: any): string => {
    if (!ssn || !isString(ssn)) {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      throw new Error(`Incorrect or missing name:  ${ssn}`);
    }
  
    return ssn;
  };
  const parseGender = (gender: any): Gender => {
    if (!gender || !isGender(gender)) {
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return gender;
  };

  const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
  };


  const isGender = (param: any): param is Gender => {
	return Object.values(Gender).includes(param);
};

/* const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
  };
  
  const parseDate = (date: any): string => {
    if (!date || !isString(date) || !isDate(date)) {
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
  }; */
export default toNewPatientEntry;