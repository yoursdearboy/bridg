import { Link, useMatches } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";

export default function NavBreadcrumbs() {
  const matches = useMatches();
  const breadcrumbs = matches.filter((m: any) => m.handle?.breadcrumb);
  return (
    <Breadcrumb>
      {breadcrumbs.map((m: any) => {
        const id = m.id;
        const last = m === breadcrumbs[breadcrumbs.length - 1];
        const bc = m.handle?.breadcrumb;
        const label = typeof bc === "function" ? bc(m.data) : bc;
        return (
          <BreadcrumbItem key={id} isCurrentPage={last}>
            <BreadcrumbLink as={Link} to={m.pathname}>
              {label}
            </BreadcrumbLink>
          </BreadcrumbItem>
        );
      })}
    </Breadcrumb>
  );
}
