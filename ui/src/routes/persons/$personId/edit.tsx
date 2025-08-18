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
  const genders = Object.entries(AdministrativeGender).map(([, value]) => ({
    label: t(`Gender.${value}`),
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
              {t("PersonEditPage.title")} {person.primaryName}
            </Text>
            {person.deathIndicator && (
              <Badge color="red" ml="sm">
                {t("deceased")}
              </Badge>
            )}
          </Group>
          <ButtonLink to={indexRoute.to} params={params} variant="subtle">
            {t("PersonEditPage.cancel")}
          </ButtonLink>
        </Group>

        <Card withBorder shadow="sm" padding="lg" radius="md">
          <Stack gap="sm">
            <Text size="xl" fw={700}>
              {t("PersonEditPage.personalInfo")}
            </Text>
            <Divider my="xs" />

            <TextInput
              label={t("Person.primaryName")}
              placeholder={t("PersonEditPage.primaryNamePlaceholder")}
              {...form.getInputProps("primaryName")}
            />

            <Select
              label={t("Person.administrativeGenderCode")}
              placeholder={t("select")}
              data={genders}
              {...form.getInputProps("administrativeGenderCode")}
            />

            <Group>
              <Button type="submit" variant="filled">
                {t("submit")}
              </Button>
            </Group>
          </Stack>
        </Card>
      </Stack>
    </form>
  );
}
