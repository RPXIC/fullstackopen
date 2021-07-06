import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Icon } from "semantic-ui-react";
import { apiBaseUrl } from "../constants";
import Hospital from "./Hospital";
import HealtCheck from "./HealtCheck";
import OccupationalHealtcare from "./OccupationalHealtcare";
import { Diagnoses, Entry, Patient } from "../types";
import { assertNever } from "../utils";

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient>();
  const [diagnoses, setDiagnoses] = useState<Diagnoses[]>([]);

  useEffect(() => {
    if (!patient) {
      (async () => {
        const patientRes = await axios.get<Patient>(
          `${apiBaseUrl}/patient/${id}`
        );
        const diagnosesRes = await axios.get(`${apiBaseUrl}/diagnoses`);
        setDiagnoses(diagnosesRes.data);
        setPatient(patientRes.data);
      })();
    }
  }, []);
  console.log(patient, diagnoses);

  const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    switch (entry.type) {
      case "Hospital":
        return <Hospital entry={entry} diagnoses={diagnoses} />;
      case "HealthCheck":
        return <HealtCheck entry={entry} diagnoses={diagnoses} />;
      case "OccupationalHealthcare":
        return <OccupationalHealtcare entry={entry} diagnoses={diagnoses} />;
      default:
        return assertNever(entry);
    }
  };

  if (patient) {
    return (
      <>
        <h2>
          {patient?.name}
          {patient?.gender === "male" && <Icon name={"man"} />}
          {patient?.gender === "female" && <Icon name={"woman"} />}
          {patient?.gender === "other" && <Icon name={"other gender"} />}
        </h2>
        <p>ssn: {patient?.ssn}</p>
        <p>occupation: {patient?.occupation}</p>
        <h3>entries</h3>
        {patient.entries.map((entry, i) => (
          <EntryDetails key={i} entry={entry} />
        ))}
      </>
    );
  } else {
    return <p>Patient not found</p>;
  }
};

export default PatientPage;
