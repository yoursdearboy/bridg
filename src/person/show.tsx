import { Link, useLoaderData } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";
import Card from "../components/Card";
import Toolbar from "../components/Toolbar";
import PersonShow from "./PersonShow";

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

// TODO: Implement layout
export default function Show() {
  const person: any = useLoaderData();
  const name = person.primary_name;
  return (
    <div>
      <Breadcrumbs className="mb-1 fs-7">
        <Breadcrumbs.Item>
          <Link to="..">Persons</Link>
        </Breadcrumbs.Item>
        <Breadcrumbs.Item active>{name?.full}</Breadcrumbs.Item>
      </Breadcrumbs>
      <Toolbar>
        <Toolbar.Center>
          <div className="lead">
            <span className="fs-4 me-2">{name?.full}</span>
            <span className="fs-6">{person.birth_date}</span>
          </div>
        </Toolbar.Center>
        <Toolbar.Right>
          <div className="dropdown">
            <button
              className="btn btn-primary btn-sm dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
            >
              Actions
            </button>
            <ul className="dropdown-menu">
              {person && (
                <li>
                  <Link className="dropdown-item" to={`name/${name.id}/edit`}>
                    Rename
                  </Link>
                </li>
              )}
            </ul>
          </div>
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
