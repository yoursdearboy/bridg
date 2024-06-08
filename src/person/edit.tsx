import { useLoaderData, useNavigate } from "react-router-dom";
import Toolbar from "../components/Toolbar";
import PersonEditForm from "./components/EditForm";

export default function PersonEditPage() {
  const navigate = useNavigate();

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
        <Toolbar.Right>
          <input className="btn btn-sm btn-primary" type="submit" form="person-form" value="Save" />
        </Toolbar.Right>
      </Toolbar>
      <PersonEditForm person={person} onSuccess={() => navigate(-1)} />
    </div>
  );
}
