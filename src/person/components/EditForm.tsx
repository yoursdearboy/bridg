import { useState } from "react";
import { FormProvider } from "react-hook-form";
import Alert from "../../components/Alert";
import Card from "../../components/Card";
import * as api from "../api";
import PersonForm, { usePersonForm } from "./BaseForm";

export default function PersonEditForm({ person, onSuccess }) {
  const form = usePersonForm({ defaultValues: person });
  const [error, setError] = useState<any>();
  const onSubmit = form.handleSubmit(async (data) => {
    setError(null);
    try {
      const res = await api.update(person.id, data);
      onSuccess(res);
    } catch (e) {
      setError(e);
    }
  });

  return (
    <div className="row my-3">
      {error && (
        <div className="col-12">
          <Card>
            <Card.Body>
              <Alert variant="danger">{error.message}</Alert>
            </Card.Body>
          </Card>
        </div>
      )}
      <div className="col-12">
        <Card>
          <Card.Header className="bg-body">
            <div className="lead fs-5">Edit information</div>
          </Card.Header>
          <Card.Body>
            <form id="person-form" onSubmit={onSubmit}>
              <FormProvider {...form}>
                <PersonForm />
              </FormProvider>
              <input className="btn btn-primary" type="submit" value="Save" />
            </form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
