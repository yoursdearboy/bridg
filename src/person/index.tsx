import { Box, Button, Flex, Spacer, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import PersonTable from "./components/Table";

export default function PersonIndexPage() {
  return (
    <VStack align="stretch">
      <Flex>
        <Text fontSize="2xl" fontWeight="bold">
          List of persons
        </Text>
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
