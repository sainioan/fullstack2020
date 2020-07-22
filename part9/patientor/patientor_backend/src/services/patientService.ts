/* eslint-disable @typescript-eslint/no-unsafe-call */
import { v4 as uuidv4 } from "uuid";
import patientData from '../data/patients';
import { PatientEntry, NewPatientEntry ,NonSensitivePatientEntry } from '../types';

const patients: Array<PatientEntry> = patientData;

const getEntries = (): Array<PatientEntry> => {
  return patients;
};


const getNonSensitiveEntries = (): NonSensitivePatientEntry [] => {
  return patients.map(
		({ id, name, dateOfBirth, gender, occupation, entries}) => ({
			id,
			name,
			dateOfBirth,
			gender,
      occupation,
      entries
	
		})
	);
};

const findById = (id: string): PatientEntry | undefined=> {
  const entry = patients.find(d => d.id === id);
  return entry;
};

  
const addEntry = (entry: NewPatientEntry): PatientEntry => {
  const newPatientEntry = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    id: uuidv4(),
    ...entry,
  };

  patients.push(newPatientEntry);
  console.log(newPatientEntry);
  return newPatientEntry;
};
  export default {
    getEntries,
    getNonSensitiveEntries,
    findById,
    addEntry
  };