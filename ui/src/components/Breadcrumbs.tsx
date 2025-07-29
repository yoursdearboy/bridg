import { Breadcrumbs as MantineBreadcrumbs, Anchor, Text } from "@mantine/core";
import { Link, useMatches } from "@tanstack/react-router";

export function Breadcrumbs() {
  const matches = useMatches();

  const crumbs = matches
    .filter((match) => match.context?.breadcrumb)
    .map((match, index, all) => {
      const title =
        typeof match.context.breadcrumb === "function"
          ? match.context.breadcrumb(match.params)
          : match.context.breadcrumb;

      return {
        title,
        path: match.pathname,
        isCurrent: index === all.length - 1,
      };
    });

  return (
    <MantineBreadcrumbs separator="→" mb="md" px="md">
      {crumbs.map((crumb, index) =>
        crumb.isCurrent ? (
          <Text c="dimmed" size="sm" key={index}>
            {crumb.title}
          </Text>
        ) : (
          <Anchor component={Link} to={crumb.path} key={index} size="sm">
            {crumb.title}
          </Anchor>
        )
      )}
    </MantineBreadcrumbs>
  );
}