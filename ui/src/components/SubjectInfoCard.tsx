// src/components/SubjectInfoCard.tsx
import { Badge, Card, Divider, Group, Stack, Text } from "@mantine/core";
import type { StudySubject } from "bridg-ts";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { InfoRow } from "./InfoRow";

interface SubjectInfoCardProps {
  subject: StudySubject;
  spaceId: string;
  onEdit?: () => void;
}

export function SubjectInfoCard({ subject, onEdit }: SubjectInfoCardProps) {
  const person = subject.performingBiologicEntity;
  const organization = subject.performingOrganization;
  const { t } = useTranslation();

  return (
    <Card withBorder shadow="sm" padding="lg" radius="md">
      <Stack gap="sm">
        {/* Card Header */}
        <Group justify="space-between">
          <Text size="xl" fw={700}>
            Subject Information
          </Text>
          {onEdit && (
            <Badge color="blue" style={{ cursor: "pointer" }}>
              {t("Edit")}
            </Badge>
          )}
        </Group>

        <Divider my="xs" />

        {/* Status Information */}
        <InfoRow
          label="Status"
          value={
            <>
              {subject.status || "-"}
              {subject.statusDate && (
                <Text span ml="sm">
                  ({dayjs(subject.statusDate).format("YYYY-MM-DD")})
                </Text>
              )}
            </>
          }
        />

        {/* Subject Type */}
        <InfoRow
          label="Subject Type"
          value={person ? "Person" : organization ? "Organization" : "Unknown"}
        />

        {/* Person Information */}
        {person && (
          <>
            <Divider my="xs" />
            <Text fw={600} size="sm" c="dimmed">
              Person Details
            </Text>

            <InfoRow label="Full Name" value={person.primaryName} />
            <InfoRow label="Gender" value={person.administrativeGenderCode} />
            <InfoRow
              label="Date of Birth"
              value={
                person.birthDate
                  ? dayjs(person.birthDate).format("YYYY-MM-DD")
                  : undefined
              }
            />
            {person.deathIndicator && (
              <InfoRow
                label="Date of Death"
                value={
                  person.deathDate
                    ? `${dayjs(person.deathDate).format("YYYY-MM-DD")}${person.deathDateEstimatedIndicator ? " (estimated)" : ""}`
                    : undefined
                }
              />
            )}
          </>
        )}

        {/* Organization Information */}
        {organization && (
          <>
            <Divider my="xs" />
            <Text fw={600} size="sm" c="dimmed">
              Organization Details
            </Text>

            <InfoRow
              label="Organization Name"
              value={organization.primaryName}
            />
            <InfoRow label="Description" value={organization.description} />
          </>
        )}
      </Stack>
    </Card>
  );
}
