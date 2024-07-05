import { Link, useMatches } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function NavBreadcrumbs({ className }) {
  const matches = useMatches();
  const breadcrumbs = matches.filter((m: any) => m.handle?.breadcrumb);
  return (
    <Breadcrumb className={className}>
      <BreadcrumbList>
        {breadcrumbs.map((m: any) => {
          const id = m.id;
          const last = m === breadcrumbs[breadcrumbs.length - 1];
          const bc = m.handle?.breadcrumb;
          const label = typeof bc === "function" ? bc(m.data) : bc;
          return (
            <>
              <BreadcrumbItem key={id}>
                {last ? (
                  <BreadcrumbPage>{label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link to={m.pathname}>{label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {last || <BreadcrumbSeparator />}
            </>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
