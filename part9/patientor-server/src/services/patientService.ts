import patients from '../../data/patients';
import { Patient } from '../types';

const getPatient = (id:string): Patient | undefined => {
    const res = patients.find(patient => patient.id === id)
    return res
};

export default {
    getPatient
};