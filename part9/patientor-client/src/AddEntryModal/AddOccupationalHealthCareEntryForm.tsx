import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { DiagnosisSelection, TextField, SelectField } from "./FormField";
import { EntryTypeOptions, EntryType, AddEntryOccupationalHealthCareFormProps } from "../types";
import { useStateValue } from "../state";

const entryTypeOptions: EntryTypeOptions[] = [
  { value: EntryType.OccupationalHealthcare, label: "occupational health care" },
];

export const AddOccupationalHealthCareEntryForm = ({
  id,
  onSubmit,
  onCancel,
}: AddEntryOccupationalHealthCareFormProps) => {
  const [{ diagnoses }] = useStateValue();

  const validateDate = (value: string) => {
    if (!value) return "Field is required";
    const dateReg = /^\d{4}[./-]\d{2}[./-]\d{2}$/;
    const res = dateReg.test(value);
    if (res) return undefined;
    return "Invalid format";
  };

  const validateDateFormat = (value: string) => {
    if (!value) return undefined;
    const dateReg = /^\d{4}[./-]\d{2}[./-]\d{2}$/;
    const res = dateReg.test(value);
    if (res) return undefined;
    return "Invalid format";
  };

  return (
    <Formik
      initialValues={{
        id: id,
        description: "",
        date: "",
        specialist: "",
        diagnosesCodes: [],
        employerName: "",
        sickLeave: {
          startDate: "",
          endDate: "",
        },
        type: "OccupationalHealthcare",
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.id) {
          errors.id = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.employerName) {
          errors.employerName = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field label="Description" placeholder="Description" name="description" component={TextField} />
            <Field label="date" validate={validateDate} placeholder="YYYY-MM-DD" name="date" component={TextField} />
            <Field label="Specialist" placeholder="Specialist" name="specialist" component={TextField} />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <Field label="Employer Name" placeholder="Employer Name" name="employerName" component={TextField} />
            <Field
              label="Start Date"
              validate={validateDateFormat}
              placeholder="YYYY-MM-DD"
              name="sickLeave.startDate"
              component={TextField}
            />
            <Field
              label="End Date"
              validate={validateDateFormat}
              placeholder="YYYY-MM-DD"
              name="sickLeave.endDate"
              component={TextField}
            />
            <SelectField label="Type" name="type" options={entryTypeOptions} />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button type="submit" floated="right" color="green" disabled={!dirty || !isValid}>
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

export default AddOccupationalHealthCareEntryForm;
