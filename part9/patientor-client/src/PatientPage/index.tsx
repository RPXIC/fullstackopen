import axios from "axios";
import React, { useEffect, useState } from "react";
import { useStateValue } from "../state";
import { useParams } from "react-router-dom";
import { Icon } from "semantic-ui-react";
import { Button } from "semantic-ui-react";
import { apiBaseUrl } from "../constants";
import Hospital from "./Hospital";
import HealthCheck from "./HealthCheck";
import OccupationalHealtcare from "./OccupationalHealtcare";
import AddEntryModal from "../AddEntryModal";
import { Entry, Patient } from "../types";
import { assertNever } from "../utils";

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient>();
  const [{ diagnoses }] = useStateValue();
  const [modalHospitalOpen, setModalHospitalOpen] = React.useState<boolean>(false);
  const [modalHealthCheckOpen, setModalHealthCheckOpen] = React.useState<boolean>(false);
  const [modalOccupationalHealthcareOpen, setModalOccupationalHealthcareOpen] = React.useState<boolean>(false);

  const [error, setError] = React.useState<string | undefined>();

  const openHospitalModal = (): void => setModalHospitalOpen(true);
  const openHealthCheckModal = (): void => setModalHealthCheckOpen(true);
  const openOccupationalHealthcareModal = (): void => setModalOccupationalHealthcareOpen(true);

  const closeModal = (): void => {
    setModalHospitalOpen(false);
    setModalHealthCheckOpen(false);
    setModalOccupationalHealthcareOpen(false);
    setError(undefined);
  };

  useEffect(() => {
    if (!patient) {
      (async () => {
        const patientRes = await axios.get<Patient>(`${apiBaseUrl}/patient/${id}`);
        setPatient(patientRes.data);
      })();
    }
  }, []);

  const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    switch (entry.type) {
      case "Hospital":
        return <Hospital entry={entry} diagnoses={diagnoses} />;
      case "HealthCheck":
        return <HealthCheck entry={entry} diagnoses={diagnoses} />;
      case "OccupationalHealthcare":
        return <OccupationalHealtcare entry={entry} diagnoses={diagnoses} />;
      default:
        return assertNever(entry);
    }
  };

  const submitNewEntry = async (values: Entry) => {
    if (patient) {
      try {
        const { data: newEntry } = await axios.post<Entry[]>(`${apiBaseUrl}/patient/${values.id}/entries`, values);
        setPatient({ ...patient, entries: patient.entries.concat(newEntry) });
        closeModal();
      } catch (e) {
        console.error(e.response?.data || "Unknown Error");
      }
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
        <Button onClick={() => openHospitalModal()}>Add Hospital Entry</Button>
        <Button onClick={() => openHealthCheckModal()}>Add Health Check Entry</Button>
        <Button onClick={() => openOccupationalHealthcareModal()}>Add Occupational Healthcare Entry</Button>

        <AddEntryModal
          title={"Add Hospital Entry"}
          modalOpen={modalHospitalOpen}
          id={id}
          onSubmit={submitNewEntry}
          error={error}
          onClose={closeModal}
        />
        <AddEntryModal
          title={"Add Health Check Entry"}
          modalOpen={modalHealthCheckOpen}
          id={id}
          onSubmit={submitNewEntry}
          error={error}
          onClose={closeModal}
        />
        <AddEntryModal
          title={"Add Occupational Healthcare Entry"}
          modalOpen={modalOccupationalHealthcareOpen}
          id={id}
          onSubmit={submitNewEntry}
          error={error}
          onClose={closeModal}
        />
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
