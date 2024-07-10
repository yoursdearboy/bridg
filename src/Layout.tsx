import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import NavBreadcrumbs from "./NavBreadcrumbs";
import { Box, VStack } from "@chakra-ui/react";

export default function Layout() {
  return (
    <VStack align="stretch">
      <NavBar />
      <Box px="3">
        <NavBreadcrumbs />
      </Box>
      <Box px="3">
        <Outlet />
      </Box>
    </VStack>
  );
}
