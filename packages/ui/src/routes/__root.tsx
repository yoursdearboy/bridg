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
import { IconChevronDown } from "@tabler/icons-react";
import { QueryClient, useQuery } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  Link,
  Outlet,
} from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import api from "@/api";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import MenuItemLink from "@/components/MenuItemLink";
import { languages } from "@/i18n";
import logo from "@/logo.png";

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
          <MenuItem key={lang} onClick={() => void i18n.changeLanguage(lang)}>
            {lang.toUpperCase()}
          </MenuItem>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}

function Nav() {
  const { spaceId }: { spaceId?: string } = Route.useParams();
  const spaces = useQuery({
    queryKey: ["spaces"],
    queryFn: () => api.spaces.indexSpacesGet(),
  });
  const space = spaces.data?.find((s) => s.id == spaceId);
  const theme = useMantineTheme();
  const { t } = useTranslation();
  const spaceTitle = space?.label || t("system.title");
  return (
    <Group>
      <Menu position="bottom-end" width={200}>
        <Menu.Target>
          <Title size={18} c={theme.primaryColor}>
            <Group gap={0}>
              {spaceTitle}
              <IconChevronDown />
            </Group>
          </Title>
        </Menu.Target>
        <Menu.Dropdown>
          {spaces.data?.map((s) => (
            <MenuItemLink
              key={s.id}
              to="/spaces/$spaceId/subjects"
              params={{ spaceId: s.id }}
              className="[&.active]:font-bold"
            >
              {s.label || t("StudyProtocolVersion.defaultLabel")}
            </MenuItemLink>
          ))}
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
}

function Logo() {
  return <img src={logo} width={32} />;
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

interface RouteContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouteContext>()({
  component: Layout,
});
