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
      family: (value) => (value ? null : t("Family name is required")),
      given: (value) => (value ? null : t("Given name is required")),
    },
  });

  const mutation = useMutation({
    mutationFn: (name: Name) =>
      api.persons.createPersonsPersonIdNamesPost({
        personId,
        name,
      }),
    onSuccess: () => {
      onSuccess();
    },
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
          <TextInput label={t("Use")} {...form.getInputProps("use")} />
          <TextInput label={t("Prefix")} {...form.getInputProps("prefix")} />
          <TextInput label={t("Suffix")} {...form.getInputProps("suffix")} />
        </Group>

        <TextInput
          label={t("Family name")}
          withAsterisk
          {...form.getInputProps("family")}
        />

        <Group grow>
          <TextInput
            label={t("Given name")}
            withAsterisk
            {...form.getInputProps("given")}
          />
          <TextInput
            label={t("Middle name")}
            {...form.getInputProps("middle")}
          />
        </Group>

        <TextInput
          label={t("Patronymic")}
          {...form.getInputProps("patronymic")}
        />

        <Group justify="flex-end" mt="md">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={mutation.isPending}
          >
            {t("Cancel")}
          </Button>
          <Button type="submit" loading={mutation.isPending}>
            {t("Save")}
          </Button>
        </Group>
      </Stack>
    </form>
  );
};
