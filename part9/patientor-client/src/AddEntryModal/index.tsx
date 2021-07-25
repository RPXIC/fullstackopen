import React from "react";
import { Modal, Segment } from "semantic-ui-react";
import { AddEntryModalProps } from "../types";
import AddHospitalEntryForm from "./AddHospitalEntryForm";
import AddHealthCheckEntryForm from "./AddHealthCheckEntryForm";
import AddOccupationalHealthCareEntryForm from "./AddOccupationalHealthCareEntryForm";

const AddEntryModal = ({ id, title, modalOpen, onClose, onSubmit, error }: AddEntryModalProps) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>{title}</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      {title === "Add Hospital Entry" && <AddHospitalEntryForm id={id} onSubmit={onSubmit} onCancel={onClose} />}
      {title === "Add Health Check Entry" && <AddHealthCheckEntryForm id={id} onSubmit={onSubmit} onCancel={onClose} />}
      {title === "Add Occupational Healthcare Entry" && (
        <AddOccupationalHealthCareEntryForm id={id} onSubmit={onSubmit} onCancel={onClose} />
      )}
    </Modal.Content>
  </Modal>
);

export default AddEntryModal;
