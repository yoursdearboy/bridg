import { useForm } from "@mantine/form";
import { useTranslation } from "react-i18next";
import {
  AdministrativeGender,
  type ApiPersonPerson,
  type PersonData,
} from "api-ts";
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
import { DateInput } from "@mantine/dates";

interface PersonFormProps {
  initialValues: PersonData;
  onCancel: () => void;
  mutation: UseMutationResult<ApiPersonPerson, Error, PersonData, unknown>;
}

export const PersonForm = ({
  initialValues,
  onCancel,
  mutation,
}: PersonFormProps) => {
  const { t } = useTranslation();

  const form = useForm<PersonData>({
    initialValues,
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

        <DateInput
          label={t("Person.birthDate")}
          valueFormat="L"
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
