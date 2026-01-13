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
  type PersonTelecommunicationAddress,
  type PersonTelecommunicationAddressData,
} from "api-ts";
import { useTranslation } from "react-i18next";

interface TelecommunicationAddressFormProps {
  initialValues: PersonTelecommunicationAddressData;
  onCancel: () => void;
  mutation: UseMutationResult<
    PersonTelecommunicationAddress,
    Error,
    PersonTelecommunicationAddressData,
    unknown
  >;
}

export const TelecommunicationAddressForm = ({
  initialValues,
  onCancel,
  mutation,
}: TelecommunicationAddressFormProps) => {
  const { t } = useTranslation();
  const form = useForm<PersonTelecommunicationAddressData>({
    initialValues: {
      ...initialValues,
      use: TelecommunicationAddressUse.H,
    },
    validate: {
      address: (value) =>
        value
          ? null
          : t("fieldRequiredMessage", {
              fieldName: t("TelecommunicationAddress.address"),
            }),
    },
  });
  const schemes = Object.values(URLScheme).map((value) => ({
    label: t(`TelecommunicationAddressScheme.${value}`),
    value,
  }));
  const handleSubmit = (data: PersonTelecommunicationAddressData) => {
    mutation.mutate(data);
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack gap="md" pos="relative">
        <LoadingOverlay visible={mutation.isPending} />
        {mutation.error && (
          <Alert color="red" mb="md">
            {mutation.error.message}
          </Alert>
        )}
        <Stack>
          <TextInput
            label={t("TelecommunicationAddress.address")}
            withAsterisk
            {...form.getInputProps("address")}
          />
          <Select
            label={t("TelecommunicationAddress.scheme")}
            data={schemes}
            {...form.getInputProps("scheme")}
            readOnly={true}
          />
        </Stack>
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
