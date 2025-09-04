import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { DatesProvider } from "@mantine/dates";
import "@mantine/dates/styles.css";
import {
  MutationCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import { useTranslation } from "react-i18next";
import "./i18n";
import "./index.css";
import { routeTree } from "./routeTree.gen";

const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onSuccess: async (
      _data,
      _variables,
      _context,
      { options: { mutationKey } }
    ) => {
      if (!mutationKey) return;
      const mutationKeys = mutationKey.map((_, i) =>
        mutationKey.slice(0, i + 1)
      );
      await Promise.all(
        mutationKeys.map((mk) =>
          queryClient.invalidateQueries({ queryKey: mk })
        )
      );
      await router.invalidate({
        filter: (route) => {
          const ctx = route.context as {
            loaderKey?: unknown;
          };
          if (!ctx.loaderKey) return false;
          return mutationKeys.some((mk) => mk === ctx.loaderKey);
        },
      });
    },
  }),
});
const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function MantineApp({ children }: React.PropsWithChildren) {
  const { i18n } = useTranslation();
  return (
    <>
      <ColorSchemeScript defaultColorScheme="auto" />
      <MantineProvider defaultColorScheme="auto">
        <DatesProvider settings={{ locale: i18n.resolvedLanguage }}>
          {children}
        </DatesProvider>
      </MantineProvider>
    </>
  );
}

export default function App() {
  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <MantineApp>
          <RouterProvider router={router} />
        </MantineApp>
      </QueryClientProvider>
    </StrictMode>
  );
}
