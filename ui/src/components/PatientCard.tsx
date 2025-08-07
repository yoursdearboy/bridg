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
}

export function PatientCard({ subject }: PatientCardProps) {
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
            {t("PatientCardInfo")}
          </Text>
          <Button
            variant="outline"
            color="blue"
            size="sm"
            component={Link}
            to="/spaces/$spaceId/subjects/$subjectId/edit"
          >
            {t("Edit")}
          </Button>
        </Group>

        <Divider my="xs" />

        <InfoRow label={t("FullName")} value={person.primaryName?.trim()}>
          {person.deathIndicator && (
            <Badge color="red" ml="sm">
              {t("Deceased")}
            </Badge>
          )}
        </InfoRow>

        <InfoRow
          label={t("GenderName")}
          value={
            person.administrativeGenderCode
              ? t(`Gender.${person.administrativeGenderCode}`)
              : "N/A"
          }
        />

         <InfoRow
              label={t("DateOfBirth")}
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
          label={t("DateOfDeath")}
          value={
            person.deathIndicator
              ? person.deathDate
                ? dayjs(person.deathDate).format("DD.MM.YYYY")
                : t("DateNotSpecified")
              : t("NotDeceased")
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
