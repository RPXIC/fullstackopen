import React from "react";
import { Diagnose, EntryDetailsProps } from "../types";
import { Icon } from "semantic-ui-react";

const OccupationalHealtcare = ({ entry, diagnoses }: EntryDetailsProps) => {
  const { diagnosisCodes, date, description } = entry;

  const getDiagnoseCode = (el: string) => {
    const res = diagnoses?.find((diagnose: Diagnose) => diagnose.code === el);
    return res?.name;
  };

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "1rem",
      }}
    >
      <div style={{ display: "flex", marginBottom: "0.5rem" }}>
        <span
          style={{
            fontWeight: "bold",
            fontSize: "1.5rem",
            marginRight: "0.5rem",
          }}
        >
          {date}
        </span>
        <Icon name="hospital" size="large" />
      </div>
      <span style={{ color: "gray" }}> {description}</span>
      <div style={{ listStyle: "none", marginTop: "0.5rem" }}>
        {diagnosisCodes?.map((el, i) => (
          <div key={i}>
            {el} {getDiagnoseCode(el)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OccupationalHealtcare;
