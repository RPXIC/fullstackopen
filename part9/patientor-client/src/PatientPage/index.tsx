import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom'
import { Icon } from 'semantic-ui-react'
import { apiBaseUrl } from '../constants';
import { Patient } from '../types'

const PatientPage = () => {
    const { id } = useParams<{id: string}>();
    const [patient, setPatient] = useState<Patient>()

    useEffect(() => {
        if (!patient) {
            (async() => {
                const { data } = await axios.get<Patient>(`${apiBaseUrl}/patient/${id}`)
                setPatient(data)
            })()
        }
    },[])
    
    if (patient) {
        return (
            <>
                <h2>{patient?.name}
                    {patient?.gender === 'male' && <Icon name={'man'} />}
                    {patient?.gender === 'female' && <Icon name={'woman'} />}
                    {patient?.gender === 'other' && <Icon name={'other gender'} />}
                </h2>
                <p>ssn: {patient?.ssn}</p>
                <p>occupation: {patient?.occupation}</p>
                {patient.entries.map(({diagnosisCodes, date, description}, i) => (
                    <div key={i}>
                        <p>{date} {description}</p>
                        <ul>
                            {diagnosisCodes?.map((el, i) => <li key={i}>{el}</li>)}
                        </ul>
                    </div>
                ))}
            </>
        );
    } else {
        return <p>Patient not found</p>
    }
};

export default PatientPage;