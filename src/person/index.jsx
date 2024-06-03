import { Link } from "react-router-dom";
import Breadcrumbs from "../Breadcrumbs";
import Toolbar from "../Toolbar";
import PersonTable from "./PersonTable";

// TODO: Implement layout
export default function Index() {
  return (
    <div>
      <Breadcrumbs className="mb-1 fs-7">
        <Breadcrumbs.Item active>Persons</Breadcrumbs.Item>
      </Breadcrumbs>
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
