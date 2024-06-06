import { Link, useLoaderData } from "react-router-dom";
import Card from "../components/Card";
import Toolbar from "../components/Toolbar";
import PersonShow from "./PersonShow";

const PersonActions = ({ person }) => {
  const name: any = person.primary_name;
  return (
    <>
      <div className="dropdown">
        <button
          className="btn btn-primary btn-sm dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
        >
          Actions
        </button>
        <ul className="dropdown-menu">
          <li>
            <Link className="dropdown-item" to={`name/${name.id}/edit`}>
              Rename
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

const PersonCard = ({ person }) => (
  <Card>
    <Card.Header className="bg-body">
      <div className="d-flex">
        <div className="lead fs-5">Information</div>
        <div className="ms-auto">
          <Link to="edit" className="fs-8 align-middle">
            <i className="fa-solid fa-pencil pe-1" /> Edit
          </Link>
        </div>
      </div>
    </Card.Header>
    <Card.Body>
      <PersonShow person={person} />
    </Card.Body>
  </Card>
);

export default function PersonShowPage() {
  const person: any = useLoaderData();
  const name: any = person.primary_name;
  return (
    <div>
      <Toolbar>
        <Toolbar.Center>
          <div className="lead">
            <span className="fs-4 me-2">{name?.full}</span>
            <span className="fs-6">{person.birth_date}</span>
          </div>
        </Toolbar.Center>
        <Toolbar.Right>
          <PersonActions person={person} />
        </Toolbar.Right>
      </Toolbar>
      <div className="row my-3">
        <div className="col-sm-4">
          <PersonCard person={person} />
        </div>
      </div>
    </div>
  );
}
