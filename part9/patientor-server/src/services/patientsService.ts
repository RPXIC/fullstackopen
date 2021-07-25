import patients from "../../data/patients";
import { Patient, PublicPatient, NewPatientEntry } from "../types";
import { v4 as uuidv4 } from "uuid";

const getEntries = (): Array<Patient> => {
  return patients;
};

const getNonSensitiveEntries = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (patient: NewPatientEntry): Patient => {
  const newPatientEntry = {
    id: uuidv4(),
    ...patient,
  };
  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  addPatient,
  getEntries,
  getNonSensitiveEntries,
};
