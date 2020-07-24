"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unsafe-call */
const uuid_1 = require("uuid");
const patients_1 = __importDefault(require("../data/patients"));
const patients = patients_1.default;
const getEntries = () => {
    return patients;
};
const getNonSensitiveEntries = () => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries
    }));
};
const findById = (id) => {
    const entry = patients.find(d => d.id === id);
    return entry;
};
const addEntry = (entry) => {
    const newPatientEntry = Object.assign({ 
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        id: uuid_1.v4() }, entry);
    patients.push(newPatientEntry);
    console.log(newPatientEntry);
    return newPatientEntry;
};
/* const addNewEntry = (entry: Entry |undefined, id: string): Entry|undefined => {

  const patient = findById(id);
  if(entry) patient?.entries.push(entry);
  return entry;
}; */
const addNewEntry = (entry, id) => {
    const patient = patients.find((p) => p.id === id);
    if (patient && entry) {
        const entries = patient.entries;
        const newEntry = Object.assign(Object.assign({}, entry), { id: uuid_1.v4() });
        entries.push(newEntry);
        return newEntry;
    }
    return undefined;
};
exports.default = {
    getEntries,
    getNonSensitiveEntries,
    findById,
    addEntry,
    addNewEntry
};
