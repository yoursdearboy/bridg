import { useState } from "react";
import { useLoaderData, useNavigate, useRouteLoaderData } from "react-router-dom";
import Alert from "../../components/Alert";
import Card from "../../components/Card";
import Toolbar from "../../components/Toolbar";
import * as api from "./api";
import NameForm from "./components/Form";

export default function NameEditPage() {
  const navigate = useNavigate();

  const name: any = useLoaderData();
  const person: any = useRouteLoaderData("person");
  const { primary_name: primaryName } = person;

  const [error, setError] = useState<any>();
  const onSubmit = async (data) => {
    setError(null);
    try {
      await api.update(person.id, name.id, data);
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
            <span className="fs-4 me-2">{primaryName?.full}</span>
            <span className="fs-6 me-2">{person.birth_date}</span>
            {name.id != primaryName.id && <span className="fs-4">(alias)</span>}
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
              <NameForm name={name} onSubmit={onSubmit} />
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}
