import React from "react";
import { Modal, Segment } from "semantic-ui-react";
import AddPatientForm from "./AddPatientForm";
import { PatientModalProps } from "../types";

const AddPatientModal = ({ modalOpen, onClose, onSubmit, error }: PatientModalProps) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new patient</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddPatientForm onSubmit={onSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>
);

export default AddPatientModal;
