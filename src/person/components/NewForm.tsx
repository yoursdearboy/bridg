import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Alert from "../../components/Alert";
import Card from "../../components/Card";
import * as api from "../api";
import NameForm from "../name/components/BaseForm";
import PersonForm, { usePersonForm } from "./BaseForm";

export default function PersonNewForm({ id, onSuccess }) {
  const nameForm = useForm();
  const personForm = usePersonForm();

  const [error, setError] = useState<any>();
  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const res: any = await api.create({
        ...personForm.getValues(),
        name: nameForm.getValues(),
      });
      onSuccess(res);
    } catch (e) {
      setError(e);
    }
  };

  return (
    <form id={id} onSubmit={onSubmit}>
      <div className="row my-0 gy-3">
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
            <Card.Body>
              <FormProvider {...nameForm}>
                <NameForm />
              </FormProvider>
            </Card.Body>
          </Card>
        </div>
        <div className="col-12">
          <Card>
            <Card.Body>
              <FormProvider {...personForm}>
                <PersonForm />
              </FormProvider>
            </Card.Body>
          </Card>
        </div>
        <div className="col-12">
          <Card>
            <Card.Body>
              <button className="btn btn-primary" onClick={onSubmit}>
                Save
              </button>
            </Card.Body>
          </Card>
        </div>
      </div>
    </form>
  );
}
