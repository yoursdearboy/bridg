import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Alert from "../components/Alert";
import Card from "../components/Card";
import Toolbar from "../components/Toolbar";
import * as api from "./api";
import PersonForm, { usePersonForm } from "./components/Form";
import NameForm from "./name/components/Form";

export default function PersonNewPage() {
  const navigate = useNavigate();

  const nameForm = useForm();
  const personForm = usePersonForm();

  const [error, setError] = useState<any>();
  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const person: any = await api.create({
        ...personForm.getValues(),
        name: nameForm.getValues(),
      });
      navigate(`/persons/${person.id}`);
    } catch (e) {
      setError(e);
    }
  };

  return (
    <div>
      <Toolbar>
        <Toolbar.Center>
          <div className="lead">
            <span className="fs-4">Create new person</span>
          </div>
        </Toolbar.Center>
        <Toolbar.Right>
          <button className="btn btn-sm btn-primary" onClick={onSubmit}>
            Save
          </button>
        </Toolbar.Right>
      </Toolbar>
      <form onSubmit={onSubmit}>
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
    </div>
  );
}
