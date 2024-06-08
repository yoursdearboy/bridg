import { useLoaderData, useNavigate, useRouteLoaderData } from "react-router-dom";
import Toolbar from "../../components/Toolbar";
import NameEditForm from "./components/EditForm";

export default function NameEditPage() {
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
        <Toolbar.Right>
          <input type="submit" form="name-form" className="btn btn-sm btn-primary" value="Save" />
        </Toolbar.Right>
      </Toolbar>
      <NameEditForm person={person} name={name} onSuccess={() => navigate(-1)} />
    </div>
  );
}
