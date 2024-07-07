import { ChakraProvider } from "@chakra-ui/react";
import { ErrorComponent, RefineThemes, ThemedLayoutV2 } from "@refinedev/chakra-ui";
import { Authenticated, Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbarProvider } from "@refinedev/kbar";

import routerBindings, {
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import { IconDatabase } from "@tabler/icons-react";
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import { authProvider } from "./authProvider";
import { AuthPage } from "./components/pages/auth";
import { PersonEdit, PersonList, PersonShow } from "./pages/persons";

function App() {
  return (
    <BrowserRouter>
      <ChakraProvider theme={RefineThemes.Blue}>
        <RefineKbarProvider>
          <DevtoolsProvider>
            <Refine
              dataProvider={dataProvider("http://127.0.0.1:8000")}
              routerProvider={routerBindings}
              authProvider={authProvider}
              options={{
                title: {
                  icon: <IconDatabase />,
                  text: "UMDB",
                },
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
                useNewQueryKeys: true,
                projectId: "1RyMqV-IuEEzM-WBy6jD",
              }}
              resources={[
                {
                  name: "persons",
                  list: "/persons",
                  show: "/persons/:id",
                  edit: "/persons/:id/edit",
                  meta: {
                    canDelete: true,
                  },
                },
              ]}
            >
              <Routes>
                <Route
                  element={
                    <Authenticated key="logged" fallback={<Navigate to="/login" />}>
                      <Outlet />
                    </Authenticated>
                  }
                >
                  <Route
                    element={
                      <ThemedLayoutV2>
                        <Outlet />
                      </ThemedLayoutV2>
                    }
                  >
                    <Route index element={<NavigateToResource resource="persons" />} />
                    <Route path="/persons" element={<Outlet />}>
                      <Route index element={<PersonList />} />
                      <Route path=":id" element={<PersonShow />} />
                      <Route path=":id/edit" element={<PersonEdit />} />
                    </Route>
                    <Route path="*" element={<ErrorComponent />} />
                  </Route>
                </Route>
                <Route
                  element={
                    <Authenticated key="anonymous" fallback={<Outlet />}>
                      <NavigateToResource resource="persons" />
                    </Authenticated>
                  }
                >
                  <Route path="/login" element={<AuthPage type="login" />} />
                  <Route path="/register" element={<AuthPage type="register" />} />
                  <Route path="/forgot-password" element={<AuthPage type="forgotPassword" />} />
                  <Route path="/update-password" element={<AuthPage type="updatePassword" />} />
                  <Route path="*" element={<ErrorComponent />} />
                </Route>
              </Routes>
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>
            <DevtoolsPanel />
          </DevtoolsProvider>
        </RefineKbarProvider>
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
