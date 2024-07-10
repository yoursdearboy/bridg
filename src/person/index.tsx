import { Box, Button, Flex, Heading, Spacer, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import PersonTable from "./table";

export default function PersonIndexPage() {
  return (
    <VStack align="stretch">
      <Flex>
        <Heading size="lg">List of persons</Heading>
        <Spacer />
        <Box>
          <Button as={Link} to="new">
            New
          </Button>
        </Box>
      </Flex>
      <PersonTable />
    </VStack>
  );
}
