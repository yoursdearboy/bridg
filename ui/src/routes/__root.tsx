import api from "@/api";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import MenuItemLink from "@/components/MenuItemLink";
import { languages } from "@/i18n";
import logo from "@/logo.png";
import {
  AppShell,
  Box,
  Button,
  Flex,
  Group,
  Menu,
  MenuItem,
  Switch,
  Title,
  useComputedColorScheme,
  useMantineColorScheme,
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

function Logo() {
  const theme = useMantineTheme();
  return (
    <Group>
      <img
        src={logo}
        width={25}
        style={{ border: "1px solid #AA230F", borderRadius: 12 }}
      />
      <Title ml={-8} size="h3" c={theme.primaryColor}>
        BRIDG
      </Title>
    </Group>
  );
}

function ThemeSwitcher() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });
  const isLight = computedColorScheme === "light";
  return (
    <Switch
      onClick={() => setColorScheme(isLight ? "dark" : "light")}
      checked={isLight}
      size="md"
      color="dark.4"
      withThumbIndicator={false}
      onLabel={<Title size="h5">☀️</Title>}
      offLabel={<Title size="h5">🌑</Title>}
    />
  );
}

function Header() {
  return (
    <Flex
      px="lg"
      direction="row"
      gap="lg"
      align="center"
      style={{ height: 45 }}
    >
      <Link style={{ textDecoration: "none" }} to="/">
        <Logo />
      </Link>
      <Nav />
      <Box style={{ flex: 1 }} />
      <LanguageSwitcher />
      <ThemeSwitcher />
    </Flex>
  );
}

function Layout() {
  return (
    <AppShell padding="md" header={{ height: 45 }}>
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
