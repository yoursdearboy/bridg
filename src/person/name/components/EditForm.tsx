import {
  Alert,
  AlertDescription,
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as api from "../api";
import NameForm from "./BaseForm";

export default function NameEditForm({ person, name, onSuccess }) {
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
