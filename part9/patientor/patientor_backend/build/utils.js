"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewEntry = void 0;
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
const types_1 = require("./types");
const uuid_1 = require("uuid");
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
const parseDate = (date) => {
    if (!date || !isString(date)) {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        throw new Error(`Incorrect or missing ${date}`);
    }
    return date;
};
const isRating = (param) => {
    return Object.values(types_1.HealthCheckRating).includes(param);
};
const parseRating = (rating) => {
    if (!rating || !isRating(rating)) {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        throw new Error(`Incorrect or missing ${rating}`);
    }
    return rating;
};
const parseDescription = (description) => {
    if (!description || !isString(description)) {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        throw new Error(`Incorrect or missing ${description}`);
    }
    return description;
};
const parseSpecialist = (specialist) => {
    if (!specialist || !isString(specialist)) {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        throw new Error(`Incorrect or missing ${specialist}`);
    }
    return specialist;
};
const parseSickLeave = (sickleave) => {
    if (!sickleave) {
        throw new Error(`Incorrect or missing ${sickleave}`);
    }
    return sickleave;
};
const parseDischarge = (discharge) => {
    if (!discharge) {
        throw new Error(`Incorrect or missing ${discharge}`);
    }
    return discharge;
};
const parseDiagnosisCodes = (codes) => {
    if (!codes)
        return;
    if (!Array.isArray(codes) || !codes.every(c => isString(c))) {
        throw new Error(`Incorrect or missing ${codes}`);
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return codes;
};
const parseEmployerName = (name) => {
    if (!name || !isString(name)) {
        throw new Error(`Incorrect or missing ${name}`);
    }
    return name;
};
exports.toNewEntry = (object) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    switch (object.type) {
        case "HealthCheck":
            return {
                id: uuid_1.v4(),
                description: parseDescription(object.description),
                date: parseDate(object.date),
                specialist: parseSpecialist(object.specialist),
                diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
                type: "HealthCheck",
                healthCheckRating: parseRating(object.healthCheckRating)
            };
        case "OccupationalHealthcare":
            return {
                id: uuid_1.v4(),
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
                id: uuid_1.v4(),
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
};
const toNewPatientEntry = (object) => {
    const newEntry = {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        name: parseName(object.name),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        dateOfBirth: parseDateOfBirth(object.dateOfBirth),
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
const parseName = (name) => {
    if (!name || !isString(name)) {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        throw new Error(`Incorrect or missing ${name}`);
    }
    return name;
};
const parseOccupation = (occupation) => {
    if (!occupation || !isString(occupation)) {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        throw new Error(`Incorrect or missing ${occupation}`);
        ;
    }
    return occupation;
};
const parseDateOfBirth = (dateOfBirth) => {
    if (!dateOfBirth || !isString(dateOfBirth)) {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        throw new Error(`Incorrect or missing ${dateOfBirth}`);
    }
    return dateOfBirth;
};
const parseSsn = (ssn) => {
    if (!ssn || !isString(ssn)) {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        throw new Error(`Incorrect or missing ${ssn}`);
    }
    return ssn;
};
const parseGender = (gender) => {
    if (!gender || !isGender(gender)) {
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        throw new Error('Incorrect or missing' + gender);
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return gender;
};
const isGender = (param) => {
    return Object.values(types_1.Gender).includes(param);
};
exports.default = toNewPatientEntry;
