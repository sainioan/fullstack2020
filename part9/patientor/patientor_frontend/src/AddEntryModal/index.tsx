import { Modal, Segment, Button } from 'semantic-ui-react';
import { AddHospitalEntryForm, AddHealthCheckEntryForm,AddOccupationalEntryForm, HospitalEntryFormValues, HealthCheckEntryFormValues, OccupationalHealthCareEntryFormValues } from './AddEntryForm';
import React, {useState} from 'react';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: HospitalEntryFormValues|HealthCheckEntryFormValues|OccupationalHealthCareEntryFormValues ) => void;
  error?: string;
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => {
    const [ type, setType ] = useState<"Hospital" | "HealthCheck" | "OccupationalHealthcare">("Hospital");
    
    
return (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new entry</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <Button.Group>
      
        <Button 
          class="ui teal basic button"
          content="Health Check"
          color={type === "HealthCheck" ? "twitter" : undefined}
          onClick={() => setType("HealthCheck")}  
        />
        <Button 
          class="ui teal basic button"
          content="Occupational Healthcare"
          color={type === "OccupationalHealthcare" ? "facebook" : undefined}
          onClick={() => setType("OccupationalHealthcare")}        
        />  <Button 
        class="ui teal basic button"
        content="Hospital" 
        color={type === "Hospital" ? "instagram" : undefined}
        onClick={() => setType("Hospital")} 
      />
      </Button.Group>
      {type === "Hospital" ? <AddHospitalEntryForm onSubmit={onSubmit} onCancel={onClose} />
      : type === "HealthCheck" ? <AddHealthCheckEntryForm onSubmit={onSubmit} onCancel={onClose} />
      :<AddOccupationalEntryForm onSubmit={onSubmit} onCancel={onClose} />}
    </Modal.Content>
  </Modal>
);
};


export default AddEntryModal;