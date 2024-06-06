import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import NavBreadcrumbs from "./NavBreadcrumbs";

export default function Layout() {
  return (
    <>
      <NavBar />
      <NavBreadcrumbs className="mt-2 mb-1" />
      <div className="container-xxl">
        <Outlet />
      </div>
    </>
  );
}
