import api from "@/api";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import MenuItemLink from "@/components/MenuItemLink";
import { languages } from "@/i18n";
import {
  AppShell,
  Box,
  Button,
  Flex,
  Menu,
  MenuItem,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

function LanguageSwitcher() {
  const { i18n } = useTranslation();
  return (
    <Menu>
      <Menu.Target>
        <Button size="compact-sm">
          {i18n.resolvedLanguage?.toUpperCase()}
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        {languages.map((lang) => (
          <MenuItem key={lang} onClick={() => i18n.changeLanguage(lang)}>
            {lang.toUpperCase()}
          </MenuItem>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}

function Nav() {
  const query = useQuery({
    queryKey: ["spaces"],
    queryFn: () => api.spaces.indexSpacesGet(),
  });
  return (
    <>
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
    </>
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
      <Box style={{ flex: 1 }} />
      <LanguageSwitcher />
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
        <Breadcrumbs />
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}

export const Route = createRootRoute({
  component: Layout,
});
