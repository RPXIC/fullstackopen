import { Gender, NewPatientEntry } from './types';

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseString = (data: unknown, target: string): string => {
    if (!data || !isString(data)) {
        throw new Error(`Incorrect or missing ${target}`);
    }
    return data;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};

const isArray = (param: unknown): boolean => {
    return typeof(param) === 'object' && param instanceof Array
}

const parseEntries = (entries: unknown, target: string): any => {
    if ( !isArray(entries)) {
        throw new Error('Incorrect or missing entries: ' + target)
    }
    return entries
}

type Fields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown, entries: unknown };

const toNewPatientEntry = ({ name, dateOfBirth, ssn, gender, occupation, entries }: Fields): NewPatientEntry => {
    const newEntry: NewPatientEntry = {
        name: parseString(name, 'name'), 
        dateOfBirth: parseDate(dateOfBirth), 
        ssn: parseString(ssn, 'ssr'), 
        gender: parseGender(gender), 
        occupation: parseString(occupation, 'occupation'),
        entries: parseEntries(entries, 'entries')
    };
    return newEntry;
};

export default toNewPatientEntry;