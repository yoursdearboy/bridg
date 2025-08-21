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
import type { EntityNameData } from "api-ts";
import { useTranslation } from "react-i18next";

interface NameFormProps {
  personId: string;
  onClose: () => void;
  onSuccess: () => void;
}

export const NameForm = ({ personId, onClose, onSuccess }: NameFormProps) => {
  const { t } = useTranslation();

  const form = useForm<EntityNameData>({
    initialValues: {
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
          : t("fieldRequiredMessage", { fieldName: t("Name.family") }),
      given: (value) =>
        value
          ? null
          : t("fieldRequiredMessage", { fieldName: t("Name.given") }),
    },
  });

  const mutation = useMutation({
    mutationFn: (entityNameData: EntityNameData) =>
      api.persons.createPersonsPersonIdNamesPost({
        personId,
        entityNameData,
      }),

    onSuccess,
  });

  const handleSubmit = (values: EntityNameData) => {
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
            label={t("Name.family")}
            withAsterisk
            {...form.getInputProps("family")}
          />
          <TextInput
            label={t("Name.given")}
            withAsterisk
            {...form.getInputProps("given")}
          />
          <TextInput
            label={t("Name.middle")}
            {...form.getInputProps("middle")}
          />
        </Group>

        <details>
          <summary>{t("extra")}</summary>
          <Group grow>
            <TextInput
              label={t("Name.prefix")}
              {...form.getInputProps("prefix")}
            />
            <TextInput
              label={t("Name.suffix")}
              {...form.getInputProps("suffix")}
            />
          </Group>
          <TextInput
            label={t("Name.patronymic")}
            {...form.getInputProps("patronymic")}
          />
        </details>

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
