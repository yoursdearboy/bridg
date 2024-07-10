import {
  Alert,
  AlertDescription,
  Button,
  Card,
  CardBody,
  Flex,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as api from "./api";
import PersonForm, { usePersonForm } from "./form";
import NameForm from "./name/form";

function PersonNewForm({ id, onSuccess }) {
  const nameForm = useForm();
  const personForm = usePersonForm();

  const [error, setError] = useState<any>();
  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const res: any = await api.create({
        ...personForm.getValues(),
        name: nameForm.getValues(),
      });
      onSuccess(res);
    } catch (e) {
      setError(e);
    }
  };

  return (
    <form id={id} onSubmit={onSubmit}>
      <VStack align="stretch">
        {error && (
          <Alert status="error" borderRadius="md">
            <AlertDescription>{error.message}</AlertDescription>
          </Alert>
        )}

        <Card>
          <CardBody>
            <FormProvider {...nameForm}>
              <NameForm />
            </FormProvider>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <FormProvider {...personForm}>
              <PersonForm />
            </FormProvider>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <Button type="submit" onClick={onSubmit}>
              Save
            </Button>
          </CardBody>
        </Card>
      </VStack>
    </form>
  );
}

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
