import { useLoaderData, useNavigate, useRouteLoaderData } from "react-router-dom";
import NameEditForm from "./components/EditForm";
import { Button, Flex, Spacer, Text, VStack } from "@chakra-ui/react";

export default function NameEditPage() {
  const navigate = useNavigate();

  const name: any = useLoaderData();
  const person: any = useRouteLoaderData("person");
  const { primary_name: primaryName } = person;

  return (
    <VStack align="stretch">
      <Flex>
        <Text fontSize="2xl" fontWeight="bold">
          {primaryName?.full}
          {name.id != primaryName.id && " (alias)"}
        </Text>
        <Spacer />
        <Button type="submit" form="name-form">
          Save
        </Button>
      </Flex>
      <NameEditForm person={person} name={name} onSuccess={() => navigate(-1)} />
    </VStack>
  );
}
