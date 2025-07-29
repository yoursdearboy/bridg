import { AppShell, Button, Flex, Menu, Title } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import api from "@/api";
import MenuItemLink from "@/components/MenuItemLink";
import { Breadcrumbs } from "@/components/Breadcrumbs";

function Nav() {
  const query = useQuery({
    queryKey: ["spaces"],
    queryFn: () => api.spaces.indexSpacesGet(),
  });
  return (
    <Menu>
      <Menu.Target>
        <Button size="compact-md">Spaces</Button>
      </Menu.Target>
      <Menu.Dropdown>
        {query.data?.map((s) => (
          <MenuItemLink
            key={s.id}
            to="/spaces/$spaceId/subjects"
            params={{ spaceId: s.id }}
            className="[&.active]:font-bold"
          >
            {s.name}
          </MenuItemLink>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}

function Header() {
  return (
    <Flex px="lg" py="4" direction="row" gap="lg" align="center">
      <Link style={{ textDecoration: "none", color: "black" }} to="/">
        <Title size="h3">BRIDG</Title>
      </Link>
      <Nav />
    </Flex>
  );
}

function Layout() {
  return (
    <AppShell padding="md" header={{ height: 60 }}>
      <AppShell.Header>
        <Header />
      </AppShell.Header>
      <AppShell.Main>
        <Breadcrumbs />
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}

export const Route = createRootRoute({
  component: Layout,
  beforeLoad: () => ({
    breadcrumb: "Spaces",
  }),
});
