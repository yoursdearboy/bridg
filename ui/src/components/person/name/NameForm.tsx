import api from "@/api";
import {
  Button,
  Group,
  TextInput,
  Stack,
  LoadingOverlay,
  Alert,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMutation } from "@tanstack/react-query";
import type { Name } from "bridg-ts";
import { useTranslation } from "react-i18next";

interface NameFormProps {
  personId: string;
  onClose: () => void;
  onSuccess: () => void;
}

export const NameForm = ({ personId, onClose, onSuccess }: NameFormProps) => {
  const { t } = useTranslation();

  const form = useForm<Name>({
    initialValues: {
      use: "",
      family: "",
      given: "",
      middle: "",
      patronymic: "",
      prefix: "",
      suffix: "",
    },
    validate: {
      family: (value) =>
        value
          ? null
          : t("fieldRequiredMessage", { fieldName: t("EntityName.family") }),
      given: (value) =>
        value
          ? null
          : t("fieldRequiredMessage", { fieldName: t("EntityName.given") }),
    },
  });

  const mutation = useMutation({
    mutationFn: (name: Name) =>
      api.persons.createPersonsPersonIdNamesPost({
        personId,
        name,
      }),

    onSuccess,
  });

  const handleSubmit = (values: Name) => {
    mutation.mutate(values);
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack gap="md" pos="relative">
        <LoadingOverlay visible={mutation.isPending} />
        {mutation.isError && (
          <Alert color="red" mb="md">
            {mutation.error.message}
          </Alert>
        )}
        <Group grow>
          <TextInput
            label={t("EntityName.use")}
            {...form.getInputProps("use")}
          />
          <TextInput
            label={t("EntityName.prefix")}
            {...form.getInputProps("prefix")}
          />
          <TextInput
            label={t("EntityName.suffix")}
            {...form.getInputProps("suffix")}
          />
        </Group>

        <TextInput
          label={t("EntityName.family")}
          withAsterisk
          {...form.getInputProps("family")}
        />

        <Group grow>
          <TextInput
            label={t("EntityName.given")}
            withAsterisk
            {...form.getInputProps("given")}
          />
          <TextInput
            label={t("EntityName.middle")}
            {...form.getInputProps("middle")}
          />
        </Group>

        <TextInput
          label={t("EntityName.patronymic")}
          {...form.getInputProps("patronymic")}
        />

        <Group justify="flex-end" mt="md">
          <Button
            variant="outline"
            onClick={onClose}
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
