import { useState } from "react";
import Alert from "../Alert";
import PersonForm from "./PersonForm";
import * as api from "./api";

export default function PersonEdit({ person }) {
  const [error, setError] = useState();
  const onSubmit = async (data) => {
    setError(null);
    try {
      await api.update(data);
    } catch (e) {
      setError(e);
    }
  };

  return (
    <>
      {error && <Alert variant="danger">{error.message}</Alert>}
      <PersonForm person={person} onSubmit={onSubmit} />
    </>
  );
}
