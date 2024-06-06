import { Link, useMatches } from "react-router-dom";
import Breadcrumbs from "./components/Breadcrumbs";

export default function NavBreadcrumbs({ className }: any) {
  const matches = useMatches();
  const breadcrumbs = matches.filter((m: any) => m.handle?.breadcrumb);
  return (
    <div className={className}>
      <div className="container-xxl">
        <div className="fs-7">
          <Breadcrumbs>
            {breadcrumbs.map((m: any) => {
              const id = m.id;
              const last = m === breadcrumbs[breadcrumbs.length - 1];
              const bc = m.handle?.breadcrumb;
              const label = typeof bc === "function" ? bc(m.data) : bc;
              return (
                <Breadcrumbs.Item key={id} active={last}>
                  {last ? label : <Link to={m.pathname}>{label}</Link>}
                </Breadcrumbs.Item>
              );
            })}
          </Breadcrumbs>
        </div>
      </div>
    </div>
  );
}
