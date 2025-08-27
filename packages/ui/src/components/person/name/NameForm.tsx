import {
  Alert,
  Button,
  Group,
  LoadingOverlay,
  Stack,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import type { UseMutationResult } from "@tanstack/react-query";
import type { EntityName, EntityNameData } from "api-ts";
import { useTranslation } from "react-i18next";

interface NameFormProps {
  initialValues: EntityNameData;
  onClose: () => void;
  mutation: UseMutationResult<EntityName, Error, EntityNameData, unknown>;
}

export const NameForm = ({
  initialValues,
  onClose,
  mutation,
}: NameFormProps) => {
  const { t } = useTranslation();

  const form = useForm<EntityNameData>({
    initialValues: {
      family: initialValues.family || "",
      given: initialValues.given || "",
      middle: initialValues.middle || "",
      patronymic: initialValues.patronymic || "",
      prefix: initialValues.prefix || "",
      suffix: initialValues.suffix || "",
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

  const handleSubmit = (data: EntityNameData) => mutation.mutate(data);

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack gap="md" pos="relative">
        <LoadingOverlay visible={mutation.isPending} />
        {mutation.error && (
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
