
export interface BaseEntry { 
  id: string; 
  date: string; 
  specialist: string; 
  description: string; 
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
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
  "CriticalRisk" = 3}
  
export interface HealthCheck extends BaseEntry { 
  type: "HealthCheck"; 
  healthCheckRating: HealthCheckRating;
}

export type Entry = OccupationalHealthCare | HospitalEntry | HealthCheck;
export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
}
export interface SickLeave { 
  startDate: string; 
  endDate: string;
}
