/* eslint-disable react-refresh/only-export-components */
import { MantineProvider } from "@mantine/core";
import { DatesProvider } from "@mantine/dates";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  type AnyRoute,
  createRootRoute,
  createRootRouteWithContext,
  createRoute,
  createRouter,
  RouterProvider,
} from "@tanstack/react-router";
import { act, render } from "@testing-library/react";
import "./i18n";
import type { PropsWithChildren } from "react";

const queryClient = new QueryClient();

const App = ({ children }: React.PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider defaultColorScheme="auto">
        <DatesProvider settings={{ locale: "en" }}>{children}</DatesProvider>
      </MantineProvider>
    </QueryClientProvider>
  );
};

export const renderRoute = (
  r: AnyRoute,
  { params, props }: { params?: object; props?: PropsWithChildren } = {}
) => {
  const rootRoute = createRootRouteWithContext()();
  let routeConfig = {
    ...r.options,
    params: params,
    getParentRoute: () => rootRoute,
    path: "/",
  };
  if (props?.children)
    routeConfig = { ...routeConfig, component: () => props.children };

  const testRoute = createRoute(routeConfig);
  const routeTree = rootRoute.addChildren([testRoute]);
  const router = createRouter({
    routeTree,
    context: {
      queryClient,
    },
  });
  return act(() =>
    render(
      <App>
        <RouterProvider router={router} />
      </App>
    )
  );
};

export const renderComponent = (component: React.ReactNode) =>
  render(<App>{component}</App>);

export const EmptyRouterProvider = (props: PropsWithChildren) => {
  const rootRoute = createRootRoute({
    component: () => props.children,
  });

  return renderRoute(rootRoute, { props: { children: props.children } });
};
