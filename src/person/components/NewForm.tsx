import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as api from "../api";
import NameForm from "../name/components/BaseForm";
import PersonForm, { usePersonForm } from "./BaseForm";
import { Alert, AlertDescription, Button, Card, CardBody, VStack } from "@chakra-ui/react";

export default function PersonNewForm({ id, onSuccess }) {
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
