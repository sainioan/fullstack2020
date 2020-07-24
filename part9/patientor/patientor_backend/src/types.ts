// eslint-disable-next-line @typescript-eslint/no-empty-interface
export type Entry = |OccupationalHealthCare | HospitalEntry | HealthCheck;

interface BaseEntry {
  id: string;
  date: string;
  specialist: string;
  description: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export interface SickLeave {
  startDate: string;
  endDate: string;
}

export interface OccupationalHealthCare extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: SickLeave;
}
export interface Discharge {
  date: string;
  criteria: string;
}

export interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: Discharge;

}
export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}
export interface HealthCheck extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}
export interface PatientEntry {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation:string;
    entries: Entry[]
  }
  export type NonSensitivePatientEntry = Omit<PatientEntry, 'ssn'>;

  export type NewPatientEntry = Omit<PatientEntry, 'id'>;

  export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
  }
export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}