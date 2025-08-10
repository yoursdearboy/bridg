// src/components/PatientCard.tsx
import { Badge, Card, Divider, Group, Stack, Text } from "@mantine/core";
import type { StudySubject } from "bridg-ts";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

interface PatientCardProps {
  subject: StudySubject;
  editLink?: React.ReactNode;
}

export function PatientCard({ subject, editLink }: PatientCardProps) {
  const person = subject.performingBiologicEntity;
  const { t } = useTranslation();

  return (
    <Card withBorder shadow="sm" padding="lg" radius="md">
      <Stack gap="sm">
        <Group justify="space-between">
          <Text size="xl" fw={700}>
            {t("Patient Information")}
          </Text>
          {editLink}
        </Group>

        <Divider my="xs" />

        {/* Основная информация */}
        <InfoRow label={t("Full Name")} value={person?.primaryName?.trim()}>
          {person?.deathIndicator && (
            <Badge color="red" ml="sm">
              {t("Deceased")}
            </Badge>
          )}
        </InfoRow>

        <InfoRow
          label={t("Gender Name")}
          value={
            person?.administrativeGenderCode
              ? t(`Gender.${person.administrativeGenderCode}`)
              : "N/A"
          }
        />

        <InfoRow
          label={t("Date of Birth")}
          value={
            person?.birthDate
              ? t("intlDateTime", { val: person.birthDate })
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
                ? t("intlDateTime", { val: person.deathDate })
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
