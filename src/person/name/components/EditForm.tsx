import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Alert from "../../../components/Alert";
import Card from "../../../components/Card";
import * as api from "../api";
import NameForm from "./BaseForm";

export default function NameEditForm({ person, name, onSuccess }) {
  const form = useForm({ defaultValues: name });
  const [error, setError] = useState<any>();
  const onSubmit = form.handleSubmit(async (data) => {
    setError(null);
    try {
      const res = await api.update(person.id, name.id, data);
      onSuccess(res);
    } catch (e) {
      setError(e);
    }
  });

  return (
    <form id="name-form" onSubmit={onSubmit}>
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
              <FormProvider {...form}>
                <NameForm />
                <input className="btn btn-primary" type="submit" value="Save" />
              </FormProvider>
            </Card.Body>
          </Card>
        </div>
      </div>
    </form>
  );
}
