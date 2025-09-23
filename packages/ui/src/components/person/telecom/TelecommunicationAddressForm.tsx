import {
  Alert,
  Button,
  Group,
  LoadingOverlay,
  Select,
  Stack,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import type { UseMutationResult } from "@tanstack/react-query";
import {
  TelecommunicationAddressUse,
  URLScheme,
  type TelecommunicationAddress,
  type TelecommunicationAddressData,
} from "api-ts";
import { useTranslation } from "react-i18next";

interface TelecommunicationAddressFormProps {
  initialValues: TelecommunicationAddressData;
  onCancel: () => void;
  mutation: UseMutationResult<
    TelecommunicationAddress,
    Error,
    TelecommunicationAddressData,
    unknown
  >;
}

export const TelecommunicationAddressForm = ({
  initialValues,
  onCancel,
  mutation,
}: TelecommunicationAddressFormProps) => {
  const { t } = useTranslation();

  const form = useForm<TelecommunicationAddressData>({
    initialValues: {
      ...initialValues,
      use: TelecommunicationAddressUse.H,
    },
    validate: {
      scheme: (value) =>
        value
          ? null
          : t("fieldRequiredMessage", {
              fieldName: t("TelecommunicationAddress.scheme"),
            }),
      address: (value) =>
        value
          ? null
          : t("fieldRequiredMessage", {
              fieldName: t("TelecommunicationAddress.address"),
            }),
    },
  });

  const handleSubmit = (data: TelecommunicationAddressData) =>
    mutation.mutate(data);
  const schemes = Object.values(URLScheme).map((value) => ({
    label: value,
    value,
  }));
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
          <Select
            label={t("TelecommunicationAddress.scheme")}
            data={schemes}
            {...form.getInputProps("scheme")}
          />

          <TextInput
            label={t("TelecommunicationAddress.address")}
            withAsterisk
            {...form.getInputProps("address")}
          />
        </Group>

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
