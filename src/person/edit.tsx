import { useLoaderData, useNavigate } from "react-router-dom";
import PersonEditForm from "./components/EditForm";
import { Button, Flex, Spacer, Text, VStack } from "@chakra-ui/react";

export default function PersonEditPage() {
  const navigate = useNavigate();

  const person: any = useLoaderData();
  const name: any = person.primary_name;

  return (
    <VStack align="stretch">
      <Flex>
        <Text fontSize="2xl" fontWeight="bold">
          {name?.full}
        </Text>
        <Spacer />
        <Button type="submit" form="person-form">
          Save
        </Button>
      </Flex>

      <PersonEditForm person={person} onSuccess={() => navigate(-1)} />
    </VStack>
  );
}
