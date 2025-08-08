import { createFileRoute } from "@tanstack/react-router";
import {
  Text,
  LoadingOverlay,
  Card,
  Stack,
  Group,
  Badge,
  Divider,
  Button,
} from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import api from "@/api";

import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/spaces/$spaceId/subjects/edit")({
  component: EditComponent,
  beforeLoad: () => ({
    breadcrumb: "Edit Patient",
  }),
});

function EditComponent() {
  const { spaceId } = Route.useParams();
  const searchParams = new URLSearchParams(window.location.search);
  const subjectId = searchParams.get("subjectId");
  const { t } = useTranslation();

  const {
    data: subject,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["subject", spaceId, subjectId],
    queryFn: () =>
      api.subjects.showSpacesSpaceIdSubjectsSubjectIdGet({
        spaceId,
        subjectId: subjectId as string,
      }),
    enabled: !!subjectId,
  });

  if (isLoading) return <LoadingOverlay visible />;
  if (error) return <Text color="red">{t("Failed to load patient data")}</Text>;
  if (!subject) return <Text>{t("Patient not found")}</Text>;

  const person = subject.performingBiologicEntity;
  if (!person)
    return <Card withBorder>{t("No patient information available")}</Card>;

  return (
    <Card withBorder shadow="sm" padding="lg" radius="md">
      <Stack gap="sm">
        <Group justify="space-between">
          <Text size="xl" fw={700}>
            {t("Editing Patient")}
          </Text>
          <Button
            component={Link}
            to={`/spaces/${spaceId}/subjects/${subjectId}`}
            variant="outline"
          >
            {t("Back")}
          </Button>
        </Group>

        <Divider my="xs" />

        <InfoRow label={t("Full name")} value={person.primaryName?.trim()}>
          {person.deathIndicator && (
            <Badge color="red" ml="sm">
              {t("Deceased")}
            </Badge>
          )}
        </InfoRow>

        <InfoRow
          label={t("Gender_")}
          value={
            person.administrativeGenderCode
              ? t(`Gender.${person.administrativeGenderCode}`)
              : "N/A"
          }
        />

        <InfoRow
          label={t("Date of Birth")}
          value={
            person?.birthDate
              ? new Date(person.birthDate).toISOString().split("T")[0]
              : undefined
          }
        />

        <InfoRow
          label={t("Age")}
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
          label={t("Date of Death")}
          value={
            person.deathIndicator
              ? person.deathDate
                ? dayjs(person.deathDate).format("DD.MM.YYYY")
                : t("Date not specified")
              : t("Not deceased")
          }
        />

        <Group mt="md">
          <Button variant="outline">{t("Edit")}</Button>
        </Group>
      </Stack>
    </Card>
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
