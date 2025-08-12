import {
  Badge,
  Button,
  Card,
  Divider,
  Group,
  Stack,
  Text,
} from "@mantine/core";
import type { PersonOutput } from "bridg-ts";
import dayjs from "dayjs";
import type React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "@tanstack/react-router";
import { Route as personRoute } from "@/routes/persons/$personId";

interface PatientCardProps {
  person: PersonOutput;
}

export function PatientCard({ person }: PatientCardProps) {
  const { t } = useTranslation();

  return (
    <Card withBorder shadow="sm" padding="lg" radius="md">
      <Stack gap="sm">
        <Group justify="space-between">
          <Text size="xl" fw={700}>
            {t("Patient Information")}
          </Text>
        </Group>

        <Divider my="xs" />

        <InfoRow label="Full Name" value={person.primaryName}>
          {person.deathIndicator && (
            <Badge color="red" ml="sm">
              Deceased
            </Badge>
          )}
        </InfoRow>

        <InfoRow label="Gender" value={person.administrativeGenderCode} />

        <InfoRow
          label="Date of Birth"
          value={
            person.birthDate
              ? t("intlDateTime", { val: person.birthDate })
              : undefined
          }
        />

        <InfoRow
          label="Age"
          value={
            person.birthDate
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
            person.deathIndicator
              ? person.deathDate
                ? t("intlDateTime", { val: person.deathDate })
                : t("Date not specified")
              : t("Not deceased")
          }
        />
      </Stack>
      <Button component={Link} href={personRoute.to} variant="light">
        Go to {person.primaryName}
      </Button>
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
