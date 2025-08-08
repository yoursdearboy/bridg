// src/components/SubjectInfoCard.tsx
import { Badge, Card, Divider, Group, Stack, Text } from "@mantine/core";
import type { StudySubject } from "bridg-ts";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

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
            {t("SubCardInfo")}
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
          label={t("StatusName")}
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
          label={t("SubjectType")}
          value={person ? "Person" : organization ? "Organization" : "Unknown"}
        />

        {/* Person Information */}
        {person && (
          <>
            <Divider my="xs" />
            <Text fw={600} size="sm" c="dimmed">
              {t("PersonDetails")}
            </Text>

            <InfoRow label={t("FullName")} value={person.primaryName} />
            <InfoRow
              label={t("GenderName")}
              value={
                person?.administrativeGenderCode
                  ? t(`Gender.${person.administrativeGenderCode}`)
                  : undefined
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

// InfoRow component
interface InfoRowProps {
  label: string;
  value?: React.ReactNode;
  children?: React.ReactNode;
}

function InfoRow({ label, value, children }: InfoRowProps) {
  return (
    <Group align="flex-start">
      <Text fw={600} w={150} c="dimmed">
        {label}:
      </Text>
      <Text>
        {value || "-"}
        {children}
      </Text>
    </Group>
  );
}
