import {
  Alert,
  AlertDescription,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { FormProvider } from "react-hook-form";
import * as api from "./api";
import PersonForm, { usePersonForm } from "./form";

import { useLoaderData, useNavigate } from "react-router-dom";

function PersonEditForm({ person, onSuccess }) {
  const form = usePersonForm({ defaultValues: person });
  const [error, setError] = useState<any>();
  const onSubmit = form.handleSubmit(async (data) => {
    setError(null);
    try {
      const res = await api.update(person.id, data);
      onSuccess(res);
    } catch (e) {
      setError(e);
    }
  });

  return (
    <VStack align="stretch">
      {error && (
        <Alert status="error" borderRadius="md">
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <Heading size="md">Edit information</Heading>
        </CardHeader>
        <CardBody>
          <form id="person-form" onSubmit={onSubmit}>
            <FormProvider {...form}>
              <PersonForm />
            </FormProvider>
            <Button type="submit" mt="3">
              Save
            </Button>
          </form>
        </CardBody>
      </Card>
    </VStack>
  );
}

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
