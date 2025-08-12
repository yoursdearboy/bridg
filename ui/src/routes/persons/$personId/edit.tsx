import api from "@/api";
import ButtonLink from "@/components/ButtonLink";
import {
  Badge,
  Button,
  Card,
  Divider,
  Group,
  Select,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { createFileRoute } from "@tanstack/react-router";
import { AdministrativeGender } from "bridg-ts";
import { useTranslation } from "react-i18next";
import { Route as indexRoute } from "./index";

export const Route = createFileRoute("/persons/$personId/edit")({
  component: EditPersonComponent,
  loader: ({ params }) => api.persons.showPersonsPersonIdGet(params),
  beforeLoad: () => ({
    breadcrumb: "Edit Person",
  }),
});

function EditPersonComponent() {
  const params = Route.useParams();
  const person = Route.useLoaderData();

  const { t } = useTranslation();
  const genders = Object.entries(AdministrativeGender).map(([key, value]) => ({
    label: t(`Gender.${key}`),
    value,
  }));

  const form = useForm({
    initialValues: {
      primaryName: person.primaryName || "",
      administrativeGenderCode: person.administrativeGenderCode || "",
      birthDate: person.birthDate ? new Date(person.birthDate) : null,
      deathIndicator: person.deathIndicator || false,
      deathDate: person.deathDate ? new Date(person.deathDate) : null,
    },
  });

  return (
    <form>
      <Stack gap="md">
        <Group justify="space-between">
          <Group>
            <Text size="xl" fw={700}>
              {t("Editing:")} {person.primaryName}
            </Text>
            {person.deathIndicator && (
              <Badge color="red" ml="sm">
                {t("Deceased")}
              </Badge>
            )}
          </Group>
          <ButtonLink to={indexRoute.to} params={params} variant="subtle">
            {t("Cancel")}
          </ButtonLink>
        </Group>

        <Card withBorder shadow="sm" padding="lg" radius="md">
          <Stack gap="sm">
            <Text size="xl" fw={700}>
              {t("Personal Information")}
            </Text>
            <Divider my="xs" />

            <TextInput
              label="Full Name"
              placeholder="Enter full name"
              {...form.getInputProps("primaryName")}
            />

            <Select
              label="Gender"
              placeholder="Select gender"
              data={genders}
              {...form.getInputProps("administrativeGenderCode")}
            />

            <Group>
              <Button type="submit" variant="filled">
                {t("Save Changes")}
              </Button>
            </Group>
          </Stack>
        </Card>

        <Card withBorder shadow="sm" padding="lg" radius="md">
          <Group justify="space-between" align="center">
            <Text size="xl" fw={700}>
              {t("Names")}
            </Text>
            <Button
              variant="outline"
              onClick={() => console.log("Add new name")}
            >
              {t("Add Name")}
            </Button>
          </Group>
        </Card>

        <Card withBorder shadow="sm" padding="lg" radius="md">
          <Group justify="space-between" align="center">
            <Text size="xl" fw={700}>
              {t("Addresses")}
            </Text>
            <Button
              variant="outline"
              onClick={() => console.log("Add new address")}
            >
              {t("Add Address")}
            </Button>
          </Group>
        </Card>
      </Stack>
    </form>
  );
}
