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
  { params }: { params?: object } = {}
) => {
  const rootRoute = createRootRouteWithContext()();
  const routeConfig = {
    ...r.options,
    params: params,
    getParentRoute: () => rootRoute,
    path: "/",
  };

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

export const renderInRoute = (component: React.ReactNode) => {
  const rootRoute = createRootRoute();
  const route = createRoute({
    path: "/",
    getParentRoute: () => rootRoute,
    component: () => component,
  });
  return renderRoute(route);
};
