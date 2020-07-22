import axios from "axios";
import { useParams } from "react-router-dom";
import { Container, Table, Icon } from "semantic-ui-react";
import React, { useState, useEffect } from "react";
import { PatientFormValues } from "../AddPatientModal/AddPatientForm";
import AddPatientModal from "../AddPatientModal";
import { Patient, Entry } from "../types";
import { apiBaseUrl } from "../constants";
import HealthRatingBar from "../components/HealthRatingBar";
import { useStateValue, updatePatient } from "../state";

const OnePatientPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
 // const [, dispatch] = useStateValue();

 const [patient, setPatient] = useState<Patient | null>(null);
  const [{ patients }, dispatch] = useStateValue();
  const [error, setError] = React.useState<string | undefined>();
  const [entries, setEntries] = React.useState<Entry[]>();
  useEffect(() => {
    const patient = Object.values(patients).find(p => p.id === id);
    if (patient) {
      if (!patient.ssn) {
        axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        )
        .then(response => {
          dispatch(updatePatient(response.data));
          setPatient(response.data);
        });
      } else {
        setPatient(patient);
      }
    }
  }, [patients]);
 


  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };


 if(patient){
  let sex = "";
  switch (patient.gender) {
      case "male":
          sex = "man";
          break;
      case "female":
          sex = "woman";
          break;
      default:
        sex = "transgender";
          break;
  }
  return (
    <div className="App">
      <Container textAlign="left">
        <h2>{patient.name} 
       <Icon className={sex}/>
        </h2>
        <p>
        <strong>SSN: </strong> {patient.ssn}
         </p>
         <p>
        <strong>Date of Birth:</strong> {patient.dateOfBirth}
         </p>
         <p>
        <strong>Occupation: </strong> {patient.occupation}
        </p>
        <p>
        <strong>Entries: </strong> {patient.entries}
        </p>
    </Container>
    </div>
  );
} else {
  return <div>{error}</div>;
}
};

export default OnePatientPage;