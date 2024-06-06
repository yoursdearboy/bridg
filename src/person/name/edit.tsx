import { useLoaderData, useNavigate, useRouteLoaderData } from "react-router-dom";
import Card from "../../components/Card";
import Toolbar from "../../components/Toolbar";
import NameEdit from "./NameEdit";

export default function Edit() {
  const navigate = useNavigate();
  const name: any = useLoaderData();
  const person: any = useRouteLoaderData("person");
  const { primary_name: primaryName } = person;
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
              <NameEdit person={person} name={name} onSuccess={() => navigate(-1)} />
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}
