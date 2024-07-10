import { Button, Flex, Spacer, Text, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import PersonNewForm from "./components/NewForm";

export default function PersonNewPage() {
  const navigate = useNavigate();

  return (
    <VStack align="stretch">
      <Flex>
        <Text fontSize="2xl" fontWeight="bold">
          Create new person
        </Text>
        <Spacer />
        <Button type="submit" form="person-form">
          Save
        </Button>
      </Flex>
      <PersonNewForm id="person-form" onSuccess={({ id }) => navigate(`/persons/${id}`)} />
    </VStack>
  );
}
