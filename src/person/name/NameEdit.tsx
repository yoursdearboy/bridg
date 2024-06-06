import { useState } from "react";
import { useRevalidator } from "react-router-dom";
import Alert from "../../components/Alert";
import NameForm from "./NameForm";
import * as api from "./api";

export default function NameEdit({ person, name, onSuccess }) {
  const { revalidate } = useRevalidator();
  const [error, setError] = useState<any>();
  const onSubmit = async (data) => {
    setError(null);
    try {
      await api.update(person.id, name.id, data);
      revalidate();
      onSuccess(data);
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
