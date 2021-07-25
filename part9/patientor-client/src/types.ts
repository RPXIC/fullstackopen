import { FieldProps } from "formik";

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosesCodes?: Array<Diagnosis["code"]>;
}

export type Entry = HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry;

interface Discharge {
  date: string;
  criteria: string;
}

export interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: Discharge;
}

interface SickLeave {
  startDate: string;
  endDate: string;
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: SickLeave;
}

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
}

export interface EntryDetailsProps {
  entry: Entry;
  diagnoses?: Diagnosis[];
}

export type EntryTypeOptions = {
  value: EntryType;
  label: string;
};

export enum EntryType {
  Hospital = "hospital",
  OccupationalHealthcare = "occupational healthcare",
  HealthCheck = "health check",
}

export type GenderOption = {
  value: Gender;
  label: string;
};

export type SelectFieldProps = {
  name: string;
  label: string;
  options: GenderOption[] | EntryTypeOptions[];
};

export interface TextProps extends FieldProps {
  label: string;
  placeholder: string;
}

export interface NumberProps extends FieldProps {
  label: string;
  errorMessage?: string;
  min: number;
  max: number;
}

export interface AddEntryFormProps {
  id: string;
  onSubmit: (values: HospitalEntry) => void;
  onCancel: () => void;
}

export interface AddEntryHealthCheckFormProps {
  id: string;
  onSubmit: (values: HealthCheckEntry) => void;
  onCancel: () => void;
}

export interface AddEntryOccupationalHealthCareFormProps {
  id: string;
  onSubmit: (values: OccupationalHealthcareEntry) => void;
  onCancel: () => void;
}

export interface AddEntryModalProps {
  modalOpen: boolean;
  id: string;
  title: string;
  onClose: () => void;
  onSubmit: (values: Entry) => void;
  error?: string;
}

export type PatientFormValues = Omit<Patient, "id" | "entries">;

export interface AddPatientFormProps {
  onSubmit: (values: PatientFormValues) => void;
  onCancel: () => void;
}

export type PatientSelectFieldProps = {
  name: string;
  label: string;
  options: GenderOption[];
};

export interface PatientModalProps {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: PatientFormValues) => void;
  error?: string;
}

export type BarProps = {
  rating: number;
  showText: boolean;
};
