import { createFileRoute } from "@tanstack/react-router";
import {
  Text,
  Card,
  Stack,
  Group,
  Badge,
  Divider,
  Button,
} from "@mantine/core";

import api from "@/api";

import { useTranslation } from "react-i18next";
import dayjs from "dayjs";

export const Route = createFileRoute("/spaces/$spaceId/subjects/edit")({
  component: EditComponent,
  loader: ({ params }) => api.subjects.indexSpacesSpaceIdSubjectsGet(params),
  beforeLoad: () => ({
    breadcrumb: "Edit Patient",
  }),
});

function EditComponent() {
  console.log("EditComponent rendered");

  const searchParams = new URLSearchParams(window.location.search);
  const personId = searchParams.get("personId");
  console.log("personId ID from URL:", personId);
  const { t } = useTranslation();
  const subjects = Route.useLoaderData();
  const subject = subjects.find(
    (s) => s.performingBiologicEntity?.id === personId
  );
  const person = subject?.performingBiologicEntity;
  if (!subject || !person) {
    return (
      <Card withBorder>
        <Text color="red">{"Patient not found"}</Text>
      </Card>
    );
  }

  return (
    <Stack gap="md">
      <Group>
        <Text size="xl" fw={700}>
          {person.primaryName?.trim()}
        </Text>
        {person.deathIndicator && (
          <Badge color="red" ml="sm">
            {"Deceased"}
          </Badge>
        )}
      </Group>

      <Card withBorder shadow="sm" padding="lg" radius="md">
        <Stack gap="sm">
          <Group justify="space-between">
            <Text size="xl" fw={700}>
              {"Editing Patient"}
            </Text>
          </Group>

          <Divider my="xs" />

          <InfoRow
            label={"Gender Name"}
            value={
              person.administrativeGenderCode
                ? t(`Gender.${person.administrativeGenderCode}`)
                : "N/A"
            }
          />

          <InfoRow
            label={"Date of Birth"}
            value={
              person?.birthDate
                ? t("intlDateTime", { val: person.birthDate })
                : undefined
            }
          />

          <InfoRow
            label={"Age"}
            value={
              person?.birthDate
                ? t("dayjsDuration", {
                    val: dayjs.duration(
                      dayjs().diff(person.birthDate, "year"),
                      "year"
                    ),
                  })
                : undefined
            }
          />

          <InfoRow
            label={"Date of Death"}
            value={
              person?.deathIndicator
                ? person?.deathDate
                  ? t("intlDateTime", { val: person.deathDate })
                  : "Date not specified"
                : "Not deceased"
            }
          />

          <Group mt="md">
            <Button variant="outline">{t("Edit")}</Button>
          </Group>
        </Stack>
      </Card>
      <Card withBorder shadow="sm" padding="lg" radius="md">
        <Group justify="space-between" align="center">
          <Group align="center">
            <Text size="xl" fw={700}>
              {person.primaryName?.trim() || t("Unnamed")}
            </Text>
            {person.deathIndicator && (
              <Badge color="red" ml="sm">
                {"Deceased"}
              </Badge>
            )}
          </Group>

          <Group>
            <Button variant="outline" onClick={() => console.log("Добавить")}>
              {"Add"}
            </Button>
            <Button
              variant="outline"
              onClick={() => console.log("Редактировать текущее имя")}
            >
              {"Edit Name"}
            </Button>
          </Group>
        </Group>
      </Card>

      <Card withBorder shadow="sm" padding="lg" radius="md">
        <Group justify="space-between" align="center">
          <Text size="xl" fw={700}>
            {"Addresses"}
          </Text>
          <Group>
            <Button
              variant="outline"
              onClick={() => console.log("Add address")}
            >
              {"Add Address"}
            </Button>
          </Group>
        </Group>

        <Divider my="md" />

        <Stack gap="sm"></Stack>
      </Card>
    </Stack>
  );
}

function InfoRow({
  label,
  value,
  children,
}: {
  label: string;
  value?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <Group>
      <Text fw={600} w={150} c="dimmed">
        {label}:
      </Text>
      <Text>
        {value || "N/A"}
        {children}
      </Text>
    </Group>
  );
}
