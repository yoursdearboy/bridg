// src/components/PatientCard.tsx
import {
  Badge,
  Button,
  Card,
  Divider,
  Group,
  Stack,
  Text,
} from "@mantine/core";
import { Link } from "@tanstack/react-router";
import type { StudySubject } from "bridg-ts";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

interface PatientCardProps {
  subject: StudySubject;
  spaceId: string;
}

export function PatientCard({ subject, spaceId }: PatientCardProps) {
  const person = subject.performingBiologicEntity;
  const { t } = useTranslation();

  if (!person) {
    return <Card withBorder>No patient information available</Card>;
  }

  return (
    <Card withBorder shadow="sm" padding="lg" radius="md">
      <Stack gap="sm">
        <Group justify="space-between">
          <Text size="xl" fw={700}>
            {t("Patient Information")}
          </Text>
          <Button
            component={Link}
            to={`/spaces/${spaceId}/subjects/edit?subjectId=${subject.id}`}
          >
            {t("Edit")}
          </Button>
        </Group>

        <Divider my="xs" />

        <InfoRow label={t("Full Name")} value={person.primaryName?.trim()}>
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
      </Stack>
    </Card>
  );
}

interface InfoRowProps {
  label: string;
  value?: React.ReactNode;
  children?: React.ReactNode;
}

function InfoRow({ label, value, children }: InfoRowProps) {
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
