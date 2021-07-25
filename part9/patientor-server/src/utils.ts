import { BaseEntry, Discharge, Entry, Gender, HealthCheckRating, NewPatientEntry, SickLeave } from './types'

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String
}

const parseString = (data: unknown, target: string): string => {
  if (!data || !isString(data)) {
    throw new Error(`Incorrect or missing ${target}`)
  }
  return data
}

const isObject = (obj: any): any => {
  return typeof obj === 'object' || obj instanceof Object
}

const parseObject = (data: any, target: string): any => {
  if (!data || !isObject(data)) {
    throw new Error(`Incorrect or missing ${target}`)
  }
  return data
}

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date))
}

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing date: ${date}`)
  }
  return date
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param)
}

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error(`Incorrect or missing gender: ${gender}`)
  }
  return gender
}

const isArray = (param: any): boolean => {
  return typeof param === 'object' && param instanceof Array
}

const parseEntries = (entries: unknown, target: string): any => {
  if (!isArray(entries)) {
    throw new Error(`Incorrect or missing entries: ${target}`)
  }
  return entries
}

const parseDiagnosesCodes = (diagnoses: unknown, target: string): any => {
  if (!isArray(diagnoses)) {
    throw new Error(`Incorrect or missing diagnoses: ${target}`)
  }
  return diagnoses
}

const isHealthCheckRating = (param: HealthCheckRating): HealthCheckRating => {
  if (Object.values(HealthCheckRating).includes(param)) {
    return param
  }
  throw new Error(`Incorrect or missing HealthCheckRating: ${param}`)
}

const isDischarge = (param: Discharge): Discharge => {
  if (param && param.criteria && param.date) {
    parseString(param.criteria, 'criteria')
    parseDate(param.date)
    return parseObject(param, 'Discharge')
  }
  throw new Error(`Incorrect or missing Discharge: ${param}`)
}

const isSickLeave = (param: SickLeave): SickLeave => {
  if (param && param.startDate && param.endDate) {
    parseDate(param.startDate)
    parseDate(param.endDate)
    return parseObject(param, 'SickLeave')
  }
  throw new Error(`Incorrect or missing SickLeave: ${param}`)
}

export const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`)
}

type Fields = {
  name: unknown
  dateOfBirth: unknown
  ssn: unknown
  gender: unknown
  occupation: unknown
  entries: unknown
}

export const toNewPatientEntry = ({ name, dateOfBirth, ssn, gender, occupation, entries }: Fields): NewPatientEntry => {
  const newEntry: NewPatientEntry = {
    name: parseString(name, 'name'),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseString(ssn, 'ssr'),
    gender: parseGender(gender),
    occupation: parseString(occupation, 'occupation'),
    entries: parseEntries(entries, 'entries'),
  }
  return newEntry
}

export const toNewEntry = (entry: Entry): Entry => {
  let { id, description, date, specialist, diagnosesCodes } = entry

  let baseEntry: BaseEntry = {
    id: (id = parseString(id, 'id')),
    description: (description = parseString(description, 'description')),
    date: (date = parseDate(date)),
    specialist: (specialist = parseString(specialist, 'specialist')),
    diagnosesCodes: (diagnosesCodes = parseDiagnosesCodes(diagnosesCodes, 'diagnoses codes')),
  }

  switch (entry.type) {
    case 'HealthCheck':
      let newEntryHe = {
        ...baseEntry,
        type: entry.type,
        healthCheckRating: isHealthCheckRating(entry.healthCheckRating),
      }
      return newEntryHe
    case 'Hospital':
      let newEntryHo = {
        ...baseEntry,
        type: entry.type,
        discharge: isDischarge(entry.discharge),
      }
      return newEntryHo
    case 'OccupationalHealthcare':
      let newEntryO = {
        ...baseEntry,
        type: entry.type,
        employerName: parseString(entry.employerName, 'employer name'),
        sickLeave: entry.sickLeave ? isSickLeave(entry.sickLeave) : undefined,
      }
      return newEntryO
    default:
      return assertNever(entry)
  }
}
