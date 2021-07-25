import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { DiagnosisSelection, TextField, SelectField } from "./FormField";
import { AddEntryFormProps, EntryTypeOptions, EntryType } from "../types";
import { useStateValue } from "../state";

const entryTypeOptions: EntryTypeOptions[] = [{ value: EntryType.Hospital, label: "Hospital" }];

export const AddEntryForm = ({ id, onSubmit, onCancel }: AddEntryFormProps) => {
  const [{ diagnoses }] = useStateValue();

  const validateDate = (value: string) => {
    if (!value) return "Field is required";
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
        discharge: {
          date: "",
          criteria: "",
        },
        type: "Hospital",
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
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
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
            <Field
              label="Discharge Date"
              validate={validateDate}
              placeholder="Discharge Date"
              name="discharge.date"
              component={TextField}
            />
            <Field
              label="Discharge Criteria"
              validate={validateDate}
              placeholder="Discharge Criteria"
              name="discharge.criteria"
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

export default AddEntryForm;
