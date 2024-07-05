import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import NavBreadcrumbs from "./NavBreadcrumbs";

export default function Layout() {
  return (
    <div>
      <NavBar className="px-4 py-2" />
      <NavBreadcrumbs className="px-4 py-2" />
      <div className="px-4 py-2">
        <Outlet />
      </div>
    </div>
  );
}
