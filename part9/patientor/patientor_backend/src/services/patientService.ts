/* eslint-disable @typescript-eslint/no-unsafe-call */
import { v4 as uuidv4 } from "uuid";
import patientData from '../data/patients';
import { PatientEntry, Entry, NewPatientEntry ,NonSensitivePatientEntry } from '../types';

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
/* const addNewEntry = (entry: Entry |undefined, id: string): Entry|undefined => {

  const patient = findById(id);
  if(entry) patient?.entries.push(entry);
  return entry;
}; */
const addNewEntry = (entry: Entry, id: string): Entry | undefined => {
	const patient = patients.find((p) => p.id === id);
	if (patient && entry) {
		const entries: Entry[] = patient.entries;
		const newEntry = {
			...entry,
			id: uuidv4(),
		};
		entries.push(newEntry);
		return newEntry;
	}
	return undefined;
};
  export default {
    getEntries,
    getNonSensitiveEntries,
    findById,
    addEntry,
    addNewEntry
  };