import patients from '../../data/patients';
import { NonSensitivePatientEntry, PatientEntry, NewPatientEntry } from '../types';
import { v4 as uuidv4 } from 'uuid';

const getEntries = (): Array<PatientEntry> => {
    return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry [] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id, name, dateOfBirth, gender, occupation
    }));
};

const addPatient = (patient: NewPatientEntry): PatientEntry => {
    const newPatientEntry = {
        id: uuidv4(),
        ...patient
    };
    patients.push(newPatientEntry);
    return newPatientEntry;
};

export default {
    addPatient,
    getEntries,
    getNonSensitiveEntries
};