import { Anchor, Breadcrumbs as MantineBreadcrumbs, Text } from "@mantine/core";
import { type AnyRouteMatch, Link, useMatches } from "@tanstack/react-router";

type Breadcrumb = string | ((match: AnyRouteMatch) => string);
type Context = { breadcrumb?: Breadcrumb };

export function Breadcrumbs() {
  const matches = useMatches();

  const crumbs = matches
    .filter((match: AnyRouteMatch) => (match.context as Context).breadcrumb)
    .map((match: AnyRouteMatch, index, all) => {
      const breadcrumb = (match.context as Context).breadcrumb;
      const title =
        typeof breadcrumb === "function" ? breadcrumb(match) : breadcrumb;

      return {
        title,
        path: match.pathname,
        isCurrent: index === all.length - 1,
      };
    });

  return (
    <MantineBreadcrumbs separator="→" mb="md">
      {crumbs.map((crumb, index) =>
        crumb.isCurrent ? (
          <Text key={index}>{crumb.title}</Text>
        ) : (
          <Anchor component={Link} to={crumb.path} key={index}>
            {crumb.title}
          </Anchor>
        )
      )}
    </MantineBreadcrumbs>
  );
}
