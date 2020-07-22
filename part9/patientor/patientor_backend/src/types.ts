// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {
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
  export interface DiagnosisEntry {
    code: string;
    name: string;
    latin?: string;
  }
  export type NewPatientEntry = Omit<PatientEntry, 'id'>;
 
export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}