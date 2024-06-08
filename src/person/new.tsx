import { useNavigate } from "react-router-dom";
import Toolbar from "../components/Toolbar";
import PersonNewForm from "./components/NewForm";

export default function PersonNewPage() {
  const navigate = useNavigate();

  return (
    <div>
      <Toolbar>
        <Toolbar.Center>
          <div className="lead">
            <span className="fs-4">Create new person</span>
          </div>
        </Toolbar.Center>
        <Toolbar.Right>
          <input className="btn btn-sm btn-primary" type="submit" form="person-form" value="Save" />
        </Toolbar.Right>
      </Toolbar>
      <PersonNewForm id="person-form" onSuccess={({ id }) => navigate(`/persons/${id}`)} />
    </div>
  );
}
