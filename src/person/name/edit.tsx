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
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useLoaderData, useNavigate, useRouteLoaderData } from "react-router-dom";
import * as api from "./api";
import NameForm from "./form";

function NameEditForm({ person, name, onSuccess }) {
  const form = useForm({ defaultValues: name });
  const [error, setError] = useState<any>();
  const onSubmit = form.handleSubmit(async (data) => {
    setError(null);
    try {
      const res = await api.update(person.id, name.id, data);
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
          <form id="name-form" onSubmit={onSubmit}>
            <FormProvider {...form}>
              <NameForm />
              <Button type="submit" mt="3">
                Save
              </Button>
            </FormProvider>
          </form>
        </CardBody>
      </Card>
    </VStack>
  );
}

export default function NameEditPage() {
  const navigate = useNavigate();

  const name: any = useLoaderData();
  const person: any = useRouteLoaderData("person");
  const { primary_name: primaryName } = person;

  return (
    <VStack align="stretch">
      <Flex>
        <Heading size="lg">
          {primaryName?.full}
          {name.id != primaryName.id && " (alias)"}
        </Heading>
        <Spacer />
        <Button type="submit" form="name-form">
          Save
        </Button>
      </Flex>
      <NameEditForm person={person} name={name} onSuccess={() => navigate(-1)} />
    </VStack>
  );
}
