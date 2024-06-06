import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import Alert from "../components/Alert";
import Card from "../components/Card";
import Toolbar from "../components/Toolbar";
import * as api from "./api";
import PersonForm from "./components/Form";

export default function PersonEditPage() {
  const navigate = useNavigate();

  const person: any = useLoaderData();

  const [error, setError] = useState<any>();
  const onSubmit = async (data) => {
    setError(null);
    try {
      await api.update(person.id, data);
      navigate(-1);
    } catch (e) {
      setError(e);
    }
  };

  return (
    <div>
      <Toolbar>
        <Toolbar.Center>
          <div className="lead">
            <span className="fs-4 me-2">{person.primary_name?.full}</span>
            <span className="fs-6">{person.birth_date}</span>
          </div>
        </Toolbar.Center>
      </Toolbar>
      <div className="row my-3">
        <div className="col-12">
          <Card>
            <Card.Header className="bg-body">
              <div className="lead fs-5">Edit information</div>
            </Card.Header>
            <Card.Body>
              {error && <Alert variant="danger">{error.message}</Alert>}
              <PersonForm person={person} onSubmit={onSubmit} />
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}
