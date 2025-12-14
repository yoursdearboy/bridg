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

// eslint-disable-next-line react-refresh/only-export-components
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
  {
    beforeLoad,
    params,
    search,
  }: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    beforeLoad?: () => any;
    params?: object;
    search?: object;
  } = {}
) => {
  const rootRoute = createRootRouteWithContext()();
  const testRoute = createRoute({
    ...r.options,
    beforeLoad,
    params,
    getParentRoute: () => rootRoute,
    path: "/",
    search,
  });
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

export const renderComponentInRoute = (component: React.ReactNode) => {
  const rootRoute = createRootRoute();
  const route = createRoute({
    path: "/",
    getParentRoute: () => rootRoute,
    component: () => component,
  });
  return renderRoute(route);
};
