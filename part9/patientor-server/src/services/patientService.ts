import patients from '../../data/patients'
import { Entry, Patient } from '../types'

const getPatient = (id: string): Patient | undefined => {
  const res = patients.find(patient => patient.id === id)
  return res
}

const addEntry = (patient: Patient, entry: Entry) => {
  const res = patient.entries.concat(entry)
  return res
}

export default {
  addEntry,
  getPatient,
}
