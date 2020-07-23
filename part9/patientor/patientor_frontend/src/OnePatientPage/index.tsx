import axios from "axios";
import { useParams } from "react-router-dom";
import { Container, Icon, Table, TableCell, List, Segment} from "semantic-ui-react";
import React, { useState, useEffect } from "react";
import { PatientFormValues } from "../AddPatientModal/AddPatientForm";
import AddPatientModal from "../AddPatientModal";
import { HospitalEntry, Patient, Entry, OccupationalHealthCare, HealthCheck } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue, updatePatient } from "../state";

const OnePatientPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
 // const [, dispatch] = useStateValue();

 const [patient, setPatient] = useState<Patient | null>(null);
  const [{ patients, diagnoses }, dispatch] = useStateValue();
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
  
   console.log(patient)
   console.log(patient.entries)
   console.log(diagnoses)
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

  const HospitalEntryType: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
  return (
    <Segment>
      Hospital Entry <Icon className ="hospital outline icon"  size="large"/>
      <Table.Row>Reason for Hospital Discharge : {entry.discharge.criteria} </Table.Row>
      <Table.Row>Date of Discharge: {entry.discharge.date}</Table.Row>
    </Segment>
  );
  }; 
  const OccupationalHealthcareEntryType: React.FC<{ entry: OccupationalHealthCare}> = ({ entry }) => {
    if(entry.sickLeave){
 return (
   <Segment>
     Occupational Healthcare
  <Icon className ="user md icon"  size="large"/>
  <TableCell>Employer: {entry.employerName}</TableCell>
  <TableCell>Sick leave: START: {entry.sickLeave.startDate} END: {entry.sickLeave.endDate}</TableCell>
  </Segment>
  );
    } else {
      return (
        <Segment>
          Occupational Healthcare
       <Icon className ="user md icon"  size="large"/>
       <Table.Row> Employer: {entry.employerName}</Table.Row>
       </Segment>
       );
    }
 

  };
  const  HealthCheckEntryType: React.FC<{ entry:  HealthCheck}> = ({ entry }) => {
    const HealthCheckRating: React.FC<{ entry: HealthCheck }> = ({ entry }) => {
      switch (entry.healthCheckRating) {
        case 0:
          return <Icon color="green" className="heart" />;
        case 1:
          return <Icon color="yellow" className="heart" />;
        case 2:
          return <Icon color="teal" className="heart" />;
        case 3:
          return <Icon color="red" className="heart" />;
        default:
          return <div></div>;
      }
    };
 return (
   <Segment>
     Health Check-up
  <Icon className ="stethoscope icon" size="large"  />
  <HealthCheckRating entry={entry} />
 </Segment>
 );
  };

  const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    const assertNever = (value: never): never => {
      throw new Error(
        `error, 'value: ${value} not defined`
      );
    };
  
    switch (entry.type) {
      case "Hospital":
        return <HospitalEntryType entry={entry} />;
      case "OccupationalHealthcare":
        return <OccupationalHealthcareEntryType entry={entry} />;
      case "HealthCheck":
        return <HealthCheckEntryType entry={entry} />;
      default:
        return assertNever(entry);
    }
  };
  return (
      <Container textAlign="left" >
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
        <h3>Entries: </h3> 
        <Table celled >
        <Table.Body>
      {patient.entries.map((entry,i )=>
      <Table.Row key={entry.id}>
        {i + 1}
       <TableCell style={{ padding: "10px" }}> <b>Entry date:</b> {entry.date}   <EntryDetails  entry={entry}/>   </TableCell>  
      <TableCell> <strong>Description:</strong> {entry.description}</TableCell>  
       <List bulleted> {entry.diagnosisCodes?.map(code => 
      <List.Item  key = {code} style={{ padding: "10px" }}> <b>Diagnosis code: </b>{code} <b>Diagnosis: </b>{ diagnoses?.find(d =>d.code === code)?.name} </List.Item>  
        )}    </List> 
      </Table.Row>
      )}
         </Table.Body>
         </Table>
    </Container>
  );
} else {
  return <div>{error}</div>;
}
};

export default OnePatientPage;