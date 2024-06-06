import { useLoaderData } from "react-router-dom";
import Card from "../components/Card";
import Toolbar from "../components/Toolbar";
import PersonEdit from "./PersonEdit";

export default function PersonEditPage() {
  const person: any = useLoaderData();
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
              <PersonEdit person={person} />
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}
