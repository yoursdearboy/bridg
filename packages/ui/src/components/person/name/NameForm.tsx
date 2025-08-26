import {
  Button,
  Group,
  TextInput,
  Stack,
  LoadingOverlay,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import type { EntityNameData } from "api-ts";
import { useTranslation } from "react-i18next";

interface NameFormProps {
  initialValues: EntityNameData;
  onSubmit: (values: EntityNameData) => void;
  onClose: () => void;
  isPending?: boolean;
  error?: Error;
}

export const NameForm = ({
  initialValues,
  onSubmit,
  onClose,
  isPending = false,
  error,
}: NameFormProps) => {
  const { t } = useTranslation();

  const form = useForm<EntityNameData>({
    initialValues: {
      family: initialValues.family,
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

  if (isPending) return <LoadingOverlay visible />;

  if (error) {
    return <Text>{t("errorMessage", { error: error.message })}</Text>;
  }

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Stack gap="md" pos="relative">
        <Group grow>
          <TextInput
            label={t("Name.family")}
            withAsterisk
            {...form.getInputProps("family")}
            disabled={isPending}
          />
          <TextInput
            label={t("Name.given")}
            withAsterisk
            {...form.getInputProps("given")}
            disabled={isPending}
          />
          <TextInput
            label={t("Name.middle")}
            {...form.getInputProps("middle")}
            disabled={isPending}
          />
        </Group>

        <details>
          <summary>{t("extra")}</summary>
          <Group grow>
            <TextInput
              label={t("Name.prefix")}
              {...form.getInputProps("prefix")}
              disabled={isPending}
            />
            <TextInput
              label={t("Name.suffix")}
              {...form.getInputProps("suffix")}
              disabled={isPending}
            />
          </Group>
          <TextInput
            label={t("Name.patronymic")}
            {...form.getInputProps("patronymic")}
            disabled={isPending}
          />
        </details>

        <Group justify="flex-end" mt="md">
          <Button variant="outline" onClick={onClose} disabled={isPending}>
            {t("cancel")}
          </Button>
          <Button type="submit" loading={isPending}>
            {t("submit")}
          </Button>
        </Group>
      </Stack>
    </form>
  );
};
