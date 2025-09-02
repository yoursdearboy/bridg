import { useForm } from "@mantine/form";
import { useTranslation } from "react-i18next";
import type { PersonData, Person } from "api-ts";
import { mutationOptions, type UseMutationResult } from "@tanstack/react-query";

interface PersonFormProps {
  initialValues: PersonData;
  onCancel: () => void;
  mutation: UseMutationResult<Person, Error, PersonData, unknown>;
}

export const PersonForm = ({ initialValues, onCancel }: PersonFormProps) => {
  const { t } = useTranslation();

  const form = useForm<PersonData>({
    initialValues: {
      administrativeGenderCode: initialValues.administrativeGenderCode || null,
      birthDate: initialValues.birthDate || null,
      deathDate: initialValues.deathDate || null,
      deathDateEstimatedIndicator:
        initialValues.deathDateEstimatedIndicator || null,
      deathIndicator: initialValues.deathIndicator || null,
    },
    validate: {},
  });

  const handleSubmit = (data: PersonData) => mutation.mutate(data);

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>

    </form>
  )
};
