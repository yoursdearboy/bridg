import { useForm } from "@mantine/form";
import { useTranslation } from "react-i18next";
import { AdministrativeGender, type Person, type PersonData } from "api-ts";
import type { UseMutationResult } from "@tanstack/react-query";
import {
  Alert,
  Button,
  Group,
  LoadingOverlay,
  Select,
  Stack,
} from "@mantine/core";
import dayjs from "dayjs";
import { DatePickerInput } from "@mantine/dates";

interface PersonFormProps {
  initialValues: Person;
  onCancel: () => void;
  mutation: UseMutationResult<PersonData, Error, PersonData, unknown>;
}

export const PersonForm = ({
  initialValues,
  onCancel,
  mutation,
}: PersonFormProps) => {
  const { t } = useTranslation();

  const form = useForm<PersonData>({
    initialValues: {
      administrativeGenderCode: initialValues.administrativeGenderCode || "U",
      birthDate: initialValues.birthDate || new Date(),
      deathDate: initialValues.deathDate || new Date(),
      deathDateEstimatedIndicator:
        initialValues.deathDateEstimatedIndicator || null,
      deathIndicator: initialValues.deathIndicator || false,
    },
    validate: {},
    transformValues: (values: PersonData) => {
      if (values.birthDate) {
        values.birthDate = dayjs(values.birthDate).toDate();
      }
      return values;
    },
  });

  const handleSubmit = (data: PersonData) => mutation.mutate(data);

  const genders = Object.values(AdministrativeGender).map((value) => ({
    label: t(`Gender.${value}`),
    value,
  }));

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack gap={"md"} pos="relative">
        <LoadingOverlay visible={mutation.isPending} />
        {mutation.error && (
          <Alert color="red" mb="md">
            {mutation.error.message}
          </Alert>
        )}

        <DatePickerInput
          label={t("Person.birthDate")}
          {...form.getInputProps("birthDate")}
        />
        <Select
          label={t("Person.administrativeGenderCode")}
          data={genders}
          {...form.getInputProps("administrativeGenderCode")}
        />

        <Group justify="flex-end" mt="md">
          <Button
            variant="outline"
            onClick={onCancel}
            disabled={mutation.isPending}
          >
            {t("cancel")}
          </Button>
          <Button type="submit" loading={mutation.isPending}>
            {t("submit")}
          </Button>
        </Group>
      </Stack>
    </form>
  );
};
