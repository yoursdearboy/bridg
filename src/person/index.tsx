import { Link } from "react-router-dom";
import Toolbar from "../components/Toolbar";
import PersonTable from "./PersonTable";

export default function PersonIndexPage() {
  return (
    <div>
      <Toolbar>
        <Toolbar.Center>
          <div className="lead fs-4">List of Persons</div>
        </Toolbar.Center>
        <Toolbar.Right>
          <Link className="btn btn-sm btn-outline-primary" to="new">
            New
          </Link>
        </Toolbar.Right>
      </Toolbar>
      <div className="my-3">
        <PersonTable />
      </div>
    </div>
  );
}
