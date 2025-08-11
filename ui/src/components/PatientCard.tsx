// src/components/PatientCard.tsx
import { Badge, Button, Card, Divider, Group, Stack, Text } from "@mantine/core";
import type { StudySubject } from "bridg-ts";
import dayjs from "dayjs";
import type React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "@tanstack/react-router";

interface PatientCardProps {
  subject: StudySubject;
  editLink?: React.ReactNode;
  personLink?: React.ReactNode;
}

export function PatientCard({ subject, editLink }: PatientCardProps) {
  const person = subject.performingBiologicEntity;
  const { t } = useTranslation();

  return (
    <Card withBorder shadow="sm" padding="lg" radius="md">
      <Stack gap="sm">
        <Group justify="space-between">
          <Text size="xl" fw={700}>
            {"Patient Information"}
          </Text>
          {editLink}
        </Group>

        <Divider my="xs" />

        {/* Основная информация */}
        <InfoRow label="Full Name" value={person?.primaryName?.trim()}>
          {person?.deathIndicator && (
            <Badge color="red" ml="sm">
              {"Deceased"}
            </Badge>
          )}
        </InfoRow>

        <InfoRow label="Gender Name" value={person?.administrativeGenderCode} />

        <InfoRow
          label="Date of Birth"
          value={
            person?.birthDate
              ? t("intlDateTime", { val: person.birthDate })
              : undefined
          }
        />

        <InfoRow
          label="Age"
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
          label="Date of Death"
          value={
            person?.deathIndicator
              ? person?.deathDate
                ? t("intlDateTime", { val: person.deathDate })
                : "Date not specified"
              : "Not deceased"
          }
        />
      </Stack>
      {person ? (
        <Button
          component={Link}
          href={`/persons/${person.id}`}
          variant="light"
        >Перейти к {person.primaryName}</Button>
      ) : null}
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
