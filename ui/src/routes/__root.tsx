import {
  AppShell,
  Button,
  Flex,
  Menu,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import api from "@/api";
import MenuItemLink from "@/components/MenuItemLink";

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
  const theme = useMantineTheme();
  return (
    <Flex px="lg" py="4" direction="row" gap="lg">
      <Link style={{ textDecoration: "none" }} to="/">
        <Title size="h3" c={theme.primaryColor}>
          BRIDG
        </Title>
      </Link>
      <Nav />
    </Flex>
  );
}

function Layout() {
  return (
    <AppShell padding="md" header={{ height: 40 }}>
      <AppShell.Header>
        <Header />
      </AppShell.Header>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}

export const Route = createRootRoute({
  component: Layout,
});
