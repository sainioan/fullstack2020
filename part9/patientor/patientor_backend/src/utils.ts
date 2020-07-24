/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatientEntry, Gender, Entry, HealthCheckRating, SickLeave, Discharge } from './types';
import { v4 as uuidv4 } from "uuid";


const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseDate = (date: any): string => {
    if (!date || !isString(date)) {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      throw new Error(`Incorrect or missing ${date}`);
    }
  return date;
};

const isRating = (param: any): param is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(param);
};

const parseRating = (rating: any): HealthCheckRating=> {
    if (!rating || !isRating(rating)) {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      throw new Error(`Incorrect or missing ${rating}`);
    }
  
  return rating;
};
  
const parseDescription = (description: any): string => {
    if (!description || !isString(description)) {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      throw new Error(`Incorrect or missing ${description}`);
    }
  
  return description;
};

const parseSpecialist = (specialist: any): string => {
    if (!specialist || !isString(specialist)) {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      throw new Error(`Incorrect or missing ${specialist}`);
    }
  
  return specialist;
};

const parseSickLeave = (sickleave: any ): SickLeave => {
if(!sickleave) {
  throw new Error(`Incorrect or missing ${sickleave}`)
}
return sickleave
}
const parseDischarge = (discharge: any ): Discharge => {
  if(!discharge) {
    throw new Error(`Incorrect or missing ${discharge}`)
  }
  return discharge
  }
const parseDiagnosisCodes = (codes: any): string[] | undefined => {
    if (!codes) return;
  
    if (!Array.isArray(codes) || !codes.every(c => isString(c))) {
      throw new Error(`Incorrect or missing ${codes}`);
    }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return codes;
};

const parseEmployerName = (name: any): string => {
    if (!name || !isString(name)) {
      throw new Error(`Incorrect or missing ${name}`);
    }
    return name;
  };


export const toNewEntry = (object: any): Entry | undefined => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  switch (object.type) {
    case "HealthCheck":
      return {
        id: uuidv4(),
        description: parseDescription(object.description),
        date: parseDate(object.date),
        specialist: parseSpecialist(object.specialist),
        diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
        type: "HealthCheck",
        healthCheckRating: parseRating(object.healthCheckRating)
      };
    case "OccupationalHealthcare":
      return {
        id: uuidv4(),
        description: parseDescription(object.description),
        date: parseDate(object.date),
        specialist: parseSpecialist(object.specialist),
        diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
        type: "OccupationalHealthcare",
        employerName: parseEmployerName(object.employerName),
        sickLeave: parseSickLeave(object.sickLeave)
      };
      case "Hospital":
        return {
          id: uuidv4(),
          description: parseDescription(object.description),
          date: parseDate(object.date),
          specialist: parseSpecialist(object.specialist),
          diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
          type: "Hospital",
          discharge: parseDischarge(object.discharge)
        };
        default:
          throw new Error('Invalid type - choose "Hospital, HealthCheck OR OccupationalHealthcare"');
      }
  }

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
      }
      return newEntry;
};
const parseName = (name: any): string => {
    if (!name || !isString(name)) {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      throw new Error( `Incorrect or missing ${name}`);
    }
  
    return name;
  };

  const parseOccupation = (occupation: any): string => {
    if (!occupation || !isString(occupation)) {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      throw new Error(`Incorrect or missing ${occupation}`);;
    }
  
    return occupation;
  };

  const parseDateOfBirth = (dateOfBirth: any): string => {
    if (!dateOfBirth || !isString(dateOfBirth)) {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      throw new Error(`Incorrect or missing ${dateOfBirth}`);
    }
  
    return dateOfBirth;
  };

  const parseSsn = (ssn: any): string => {
    if (!ssn || !isString(ssn)) {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      throw new Error(`Incorrect or missing ${ssn}`);
    }
  
    return ssn;
  };
  const parseGender = (gender: any): Gender => {
    if (!gender || !isGender(gender)) {
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        throw new Error('Incorrect or missing' + gender);
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return gender;
  };

  const isGender = (param: any): param is Gender => {
	return Object.values(Gender).includes(param);
};

export default toNewPatientEntry;