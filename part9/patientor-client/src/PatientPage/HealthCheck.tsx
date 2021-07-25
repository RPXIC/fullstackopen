import React from "react";
import { Icon } from "semantic-ui-react";
import { SemanticCOLORS } from "semantic-ui-react/dist/commonjs/generic";
import { HealthCheckEntry, Diagnosis } from "../types";

const colors: SemanticCOLORS[] = ["green", "yellow", "purple", "red"];

const HealthCheck: React.FC<{
  entry: HealthCheckEntry;
  diagnoses: Diagnosis[];
}> = ({ entry, diagnoses }) => {
  const { diagnosesCodes, date, description, healthCheckRating } = entry;

  const getDiagnoseCode = (el: string) => {
    const res = diagnoses?.find((diagnose: Diagnosis) => diagnose.code === el);
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
        <Icon name="heart" size="large" />
      </div>{" "}
      <span style={{ color: "gray" }}> {description}</span>
      <div style={{ listStyle: "none", marginTop: "0.5rem" }}>
        {diagnosesCodes?.map((el, i) => (
          <div key={i}>
            {el} {getDiagnoseCode(el)}
          </div>
        ))}
      </div>
      <Icon name="heart" size="large" color={colors[healthCheckRating]} />
    </div>
  );
};

export default HealthCheck;
