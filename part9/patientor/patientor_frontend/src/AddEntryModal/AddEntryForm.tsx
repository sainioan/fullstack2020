import React from "react";
import { Field, Formik, Form } from "formik";
import { useStateValue } from "../state";
import { TextField, DiagnosisSelection, NumberField } from "../AddPatientModal/FormField";
import { Gender, Patient, Entry, HealthCheck, HealthCheckRating, HospitalEntry, OccupationalHealthCare } from "../types";
import { Grid, Button } from "semantic-ui-react";

/*
 * use type Entry, but omit id and entries,
 * because those are irrelevant for new patient object.
 */


export type HospitalEntryFormValues = Omit<HospitalEntry, "id">;
export type HealthCheckEntryFormValues = Omit<HealthCheck, "id">;
export type OccupationalHealthCareEntryFormValues = Omit<OccupationalHealthCare, "id">
export type EntryFormValues = Omit<Entry, "id">;
interface HospitalProps {
    onSubmit: (values: HospitalEntryFormValues) => void;
    onCancel: () => void;
  }

  
  export const AddEntryForm: React.FC<HospitalProps> = ({ onSubmit, onCancel }) => {
    const [{ diagnoses }] = useStateValue();
    return (
      <Formik
        initialValues={{
            date: "",
            specialist: "",
            description: "",
            diagnosisCodes: [],
            discharge: {
                date: "",
                criteria: ""
              },
            //healthCheckRating: HealthCheckRating.Healthy
            type: "Hospital",
        }}
        onSubmit={onSubmit}
        validate={values => {
          const requiredError = "Field is required";
          const errors: { [field: string]: string } = {};
          if (!values.date) {
            errors.date = requiredError;
          }
          if (!values.specialist) {
            errors.specialist = requiredError;
          }
          if (!values.discharge.date || !values.discharge.criteria) {
            errors.date = requiredError;
            errors.criteria = requiredError;
          }
          if (!values.description) {
            errors.description = requiredError;
          }
          return errors;
        }}
      >
        {({ isValid, dirty, setFieldValue, setFieldTouched  }) => {
          return (
            <Form className="form ui">
             <Field
                label="Type"
                placeholder="type"
                name="type"
                component={TextField}
              />
              <Field
                label="Date"
                placeholder="YYYY-MM-DD"
                name="date"
                component={TextField}
              />
              <Field
                label="Specialist"
                placeholder="specialist"
                name="specialist"
                component={TextField}
              />         
              <Field
              label="Discharge Date"
              placeholder="YYYY-MM-DD"
              name="discharge.date"
              component={TextField}
            />
            <Field
              label="Criteria"
              placeholder="Criteria"
              name="discharge.criteria"
              component={TextField}
            />
              <Field
                label="Description"
                placeholder="Description"
                name="description"
                component={TextField}
              />     
               <DiagnosisSelection
              diagnoses={diagnoses}
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
            />
              <Grid>
                <Grid.Column floated="left" width={5}>
                  <Button type="button" onClick={onCancel} color="red">
                    Cancel
                  </Button>
                </Grid.Column>
                <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
                </Grid.Column>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    );
  };
export default AddEntryForm;