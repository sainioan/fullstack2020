import { State } from "./state";
import { Patient, Entry } from "../types";


type SetPatientList = {
  type: "SET_PATIENT_LIST";
  payload: Patient[];
};

type AddPatient = {
  type: "ADD_PATIENT";
  payload: Patient;
};

type UpdatePatient = {
  type: "UPDATE_PATIENT";
  payload: Patient;
};

export type Action = SetPatientList | AddPatient | UpdatePatient;

export const setPatientList = (patientListFromApi: Patient[]): Action => {
  return {type: "SET_PATIENT_LIST", payload: patientListFromApi }};

export const updatePatient = (patient: Patient): Action => {
  return { type: "UPDATE_PATIENT", payload: patient };
};
export const addPatient = (newPatient: Patient): Action => {
  return { type: "ADD_PATIENT", payload: newPatient };
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "UPDATE_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    default:
      return state;
  }
};
