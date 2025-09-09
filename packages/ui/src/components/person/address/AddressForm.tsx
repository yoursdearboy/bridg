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
import type { PostalAddress, PostalAddressData } from "api-ts";
import { useTranslation } from "react-i18next";

interface AddressFormProps {
  initialValues: PostalAddressData;
  onCancel: () => void;
  mutation: UseMutationResult<PostalAddress, Error, PostalAddressData, unknown>;
}

export const AddressForm = ({
  initialValues,
  onCancel,
  mutation,
}: AddressFormProps) => {
  const { t } = useTranslation();

  const form = useForm<PostalAddressData>({
    initialValues: initialValues,
    validate: {
      street: (value) =>
        value
          ? null
          : t("fieldRequiredMessage", { fieldName: t("Address.street") }),
      country: (value) =>
        value
          ? null
          : t("fieldRequiredMessage", { fieldName: t("Address.country") }),
    },
  });

  const handleSubmit = (data: PostalAddressData) => mutation.mutate(data);

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
            label={t("Address.country")}
            withAsterisk
            {...form.getInputProps("country")}
          />
          <TextInput
            label={t("Address.street")}
            withAsterisk
            {...form.getInputProps("street")}
          />
        </Group>

        <details>
          <summary>{t("extra")}</summary>
          <Group grow>
            <TextInput
              label={t("Address.building")}
              {...form.getInputProps("building")}
            />
            <TextInput
              label={t("Address.municipality")}
              {...form.getInputProps("municipality")}
            />
            <TextInput
              label={t("Address.state")}
              {...form.getInputProps("state")}
            />
          </Group>
          <TextInput label={t("Address.zip")} {...form.getInputProps("zip")} />
        </details>

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
