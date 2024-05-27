import { useState } from "react";
import Alert from "../../Alert";
import NameForm from "./NameForm";
import * as api from "./api";

export default function NameEdit({ person, name }) {
  const [error, setError] = useState();
  const onSubmit = async (data) => {
    setError(null);
    try {
      await api.update(person.id, name.id, data);
    } catch (e) {
      setError(e);
    }
  };

  return (
    <>
      {error && <Alert variant="danger">{error.message}</Alert>}
      <NameForm name={name} onSubmit={onSubmit} />
    </>
  );
}
