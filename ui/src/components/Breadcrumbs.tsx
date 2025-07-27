import { Breadcrumbs as MantineBreadcrumbs, Anchor, Text } from "@mantine/core";
import { Link, useRouterState } from "@tanstack/react-router";

export function Breadcrumbs() {
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const getBreadcrumbItems = () => {
    const items = [{ title: "Home", path: "/", show: true }];

    if (currentPath.includes("/spaces/") && currentPath.includes("/subjects")) {
      // Страница списка пациентов
      if (!currentPath.endsWith("/info")) {
        items.push(
          { title: "Spaces", path: "/spaces", show: false },
          { title: "Patients", path: currentPath, show: true }
        );
      }
      // Страница информации о пациенте
      else {
        items.push(
          { title: "Spaces", path: "/spaces", show: false },
          {
            title: "Patients",
            path: currentPath.replace("/info", ""),
            show: true,
          },
          { title: "Patients info", path: currentPath, show: true }
        );
      }
    }

    return items.filter((item) => item.show);
  };

  const items = getBreadcrumbItems();

  return (
    <MantineBreadcrumbs separator="→" mb="md">
      {items.map((item, index) =>
        index < items.length - 1 ? (
          <Anchor component={Link} to={item.path} key={index} size="sm">
            {item.title}
          </Anchor>
        ) : (
          <Text c="dimmed" size="sm" key={index}>
            {item.title}
          </Text>
        )
      )}
    </MantineBreadcrumbs>
  );
}
