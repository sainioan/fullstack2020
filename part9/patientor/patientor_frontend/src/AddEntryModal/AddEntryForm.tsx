import React from "react";
import { Field, Formik, Form } from "formik";
import { useStateValue } from "../state";
import { TextField, DiagnosisSelection, NumberField } from "../AddPatientModal/FormField";
import {  HealthCheck, HospitalEntry, OccupationalHealthCare } from "../types";
import { Grid, Button } from "semantic-ui-react";

/*
 * use type HospitalEntry, HealthCheck, or Occupational HealthCare, but omit id,
 * because those are irrelevant for new entry object.
 */

export type HospitalEntryFormValues = Omit<HospitalEntry, "id">;
export type HealthCheckEntryFormValues = Omit<HealthCheck, "id">;
export type OccupationalHealthCareEntryFormValues = Omit<OccupationalHealthCare, "id">;

interface HospitalProps {
    onSubmit: (values: HospitalEntryFormValues) => void;
    onCancel: () => void;
}

interface HealthCheckProps {
    onSubmit: (values: HealthCheckEntryFormValues) => void;
    onCancel: () => void;
}

interface OccupationalHealthCareProps {
    onSubmit: (values: OccupationalHealthCareEntryFormValues) => void;
    onCancel: () => void;
}
  
  export const AddHospitalEntryForm: React.FC<HospitalProps> = ({ onSubmit, onCancel }) => {
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
            type: "Hospital",
        }}
        onSubmit={onSubmit}
        validate={values => {
          const requiredError = "Field is required";
          const formattingError = "Date formatting error";
          const errors: { [field: string]: string } = {};
          function isValidDate(date:string) {
            let regEx = /^\d{4}-\d{2}-\d{2}$/;
            return date.match(regEx) != null;
          }
          if (!values.date){
            errors.date = requiredError;
          }
            if(!isValidDate(values.date)) {
           errors.date = formattingError; 
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
              label="Discharge Criteria"
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

  export const AddHealthCheckEntryForm: React.FC<HealthCheckProps> = ({ onSubmit, onCancel }) => {
    const [{ diagnoses }] = useStateValue();
    return (
      <Formik
        initialValues={{
            date: "",
            specialist: "",
            description: "",
            diagnosisCodes: [],
            healthCheckRating:3,
            type: "HealthCheck",
        }}
        onSubmit={onSubmit}
        validate={values => {
          const requiredError = "Field is required";
          const formattingError = "Date formatting error";
          const errors: { [field: string]: string } = {};
          function isValidDate(date:string) {
            var regEx = /^\d{4}-\d{2}-\d{2}$/;
            return date.match(regEx) != null;
          }
          if (!values.date){
            errors.date = requiredError;
          }
            if(!isValidDate(values.date)) {
           errors.date = formattingError;
            
          }
       
          if (!values.specialist) {
            errors.specialist = requiredError;
          }
          if (!values.healthCheckRating) {
            errors.healthCheckRating = requiredError;
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
                label="healthCheckRating"
                name="healthCheckRating"
                component={NumberField}
                min={0}
                max={3}
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
  export const AddOccupationalEntryForm: React.FC<OccupationalHealthCareProps > = ({ onSubmit, onCancel }) => {
    const [{ diagnoses }] = useStateValue();
    return (
      <Formik
        initialValues={{
            date: "",
            specialist: "",
            description: "",
            diagnosisCodes: [],
            employerName: "",
            sickLeave: {
                startDate: "",
                endDate: ""
            },
            type: "OccupationalHealthcare",
        }}
        onSubmit={onSubmit}
        validate={values => {
          const requiredError = "Field is required";
          const formattingError = "Date formatting error";
          const errors: { [field: string]: string } = {};
          function isValidDate(date:string) {
            var regEx = /^\d{4}-\d{2}-\d{2}$/;
            return date.match(regEx) != null;
          }
          if (!values.date) {
          errors.date = requiredError;
          }
          if (!isValidDate(values.date)) {
            errors.date = formattingError;
          }
          if (!values.specialist) {
            errors.specialist = requiredError;
          }
          if (!values.employerName) {
            errors.employerName = requiredError;
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
                label="Description"
                placeholder="Description"
                name="description"
                component={TextField}
              />    
                <Field
                label="Employer Name"
                placeholder="Employer Name"
                name="employerName"
                component={TextField}
              />         
              <Field
              label="Sick Leave Start Date"
              placeholder="YYYY-MM-DD"
              name="sickLeave.startDate"
              component={TextField}
            />
            <Field
              label="Sick Leave End Date"
              placeholder="YYYY-MM-DD"
              name="sickLeave.endDate"
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
