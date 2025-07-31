import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider,
  type AnyRoute,
} from "@tanstack/react-router";
import { act, render } from "@testing-library/react";

// eslint-disable-next-line react-refresh/only-export-components
const App = ({ children }: React.PropsWithChildren) => {
  const queryClient = new QueryClient();

  return (
    <MantineProvider defaultColorScheme="auto">
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </MantineProvider>
  );
};

export const renderRoute = (
  r: AnyRoute,
  { params }: { params?: object } = {}
) => {
  const rootRoute = createRootRoute();
  const testRoute = createRoute({
    ...r.options,
    params: params,
    getParentRoute: () => rootRoute,
    path: "/",
  });
  const routeTree = rootRoute.addChildren([testRoute]);
  const router = createRouter({
    routeTree,
  });
  return act(() =>
    render(
      <App>
        <RouterProvider router={router} />
      </App>
    )
  );
};
