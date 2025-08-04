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
import { Link, useParams } from "@tanstack/react-router";
import type { StudySubject } from "bridg-ts";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

interface PatientCardProps {
  subject: StudySubject;
}

export function PatientCard({ subject }: PatientCardProps) {
  const person = subject.performingBiologicEntity;
  const { spaceId } = useParams({ strict: false });
  const { t } = useTranslation();
  console.log("Navigation params:", {
    spaceId,
    subjectId: subject.id,
    fullPath: `/spaces/${spaceId}/subjects/${subject.id}/edit`,
  });

  return (
    <Card withBorder shadow="sm" padding="lg" radius="md">
      <Stack gap="sm">
        {/* Header with edit button */}
        <Group justify="space-between">
          <Text size="xl" fw={700}>
            {t("PatientCardInfo")}
          </Text>

          <Button
            component={Link}
            to="/spaces/$spaceId/subjects/edit"
            params={{
              spaceId: spaceId!,
            }}
            variant="light"
            color="blue"
            size="sm"
          >
            {t("Edit")}
          </Button>
        </Group>

        <Divider my="xs" />

        {/* Patient information */}
        <InfoRow label={t("Full Name")} value={person?.primaryName?.trim()}>
          {person?.deathIndicator && (
            <Badge color="red" ml="sm">
              {t("Deceased")}
            </Badge>
          )}
        </InfoRow>

        <InfoRow
          label={t("Gender")}
          value={
            person?.administrativeGenderCode &&
            t(person.administrativeGenderCode)
          }
        />

        <InfoRow
          label={t("Date of Birth")}
          value={
            person?.birthDate
              ? dayjs(person.birthDate).format("DD.MM.YYYY")
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
            person?.deathIndicator
              ? person?.deathDate
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
