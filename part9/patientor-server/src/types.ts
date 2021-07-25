export interface Diagnosis {
  code: string
  name: string
  latin?: string
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export interface BaseEntry {
  id: string
  description: string
  date: string
  specialist: string
  diagnosesCodes?: Array<Diagnosis['code']>
}

export type Entry = HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry

export interface Discharge {
  date: string
  criteria: string
}

interface HospitalEntry extends BaseEntry {
  type: 'Hospital'
  discharge: Discharge
}

export interface SickLeave {
  startDate: string
  endDate: string
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: 'OccupationalHealthcare'
  employerName: string
  sickLeave?: SickLeave
}

interface HealthCheckEntry extends BaseEntry {
  type: 'HealthCheck'
  healthCheckRating: HealthCheckRating
}

export enum HealthCheckRating {
  'Healthy' = 0,
  'LowRisk' = 1,
  'HighRisk' = 2,
  'CriticalRisk' = 3,
}

export interface Patient {
  id: string
  name: string
  ssn: string
  occupation: string
  gender: Gender
  dateOfBirth: string
  entries: Entry[]
}

export type NewPatientEntry = Omit<Patient, 'id'>
export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>
