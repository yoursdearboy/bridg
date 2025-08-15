import { InfoRow } from "@/components/InfoRow";
import { Badge, Card, Divider, Group, Stack, Text } from "@mantine/core";
import type { StudySubject } from "bridg-ts";
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
        <Group justify="space-between">
          <Text size="xl" fw={700}>
            {t("SubjectInfoCard.title")}
          </Text>
          {onEdit && (
            <Badge color="blue" style={{ cursor: "pointer" }}>
              {t("edit")}
            </Badge>
          )}
        </Group>

        <Divider my="xs" />

        <InfoRow
          label={t("SubjectInfoCard.status")}
          value={
            <>
              {subject.status}
              {subject.statusDate && (
                <Text span ml="sm">
                  (
                  {t("intlDate", {
                    val: subject.statusDate,
                  })}
                  )
                </Text>
              )}
            </>
          }
        />

        <InfoRow
          label={t("SubjectInfoCard.subjectType")}
          value={
            person
              ? t("SubjectInfoCard.person")
              : organization
                ? t("SubjectInfoCard.organization")
                : t("SubjectInfoCard.unknown")
          }
        />

        {person && (
          <>
            <Divider my="xs" />
            <Text fw={600} size="sm" c="dimmed">
              {t("SubjectInfoCard.personDetails")}
            </Text>

            <InfoRow label={t("Person.primaryName")} value={person.primaryName} />
            <InfoRow
              label={t("Person.administrativeGenderCode")}
              value={t(`Gender.${person.administrativeGenderCode}`)}
            />

            <InfoRow
              label={t("Person.birthDate")}
              value={
                person.birthDate
                  ? t("intlDateTime", { val: person.birthDate })
                  : "N/A"
              }
            />
            <InfoRow
              label={t("Person.deathDate")}
              value={
                person.deathIndicator
                  ? person.deathDate
                    ? t("intlDateTime", { val: person.deathDate })
                    : t("Date not specified")
                  : t("Not deceased")
              }
            />
          </>
        )}

        {organization && (
          <>
            <Divider my="xs" />
            <Text fw={600} size="sm" c="dimmed">
              {t("SubjectInfoCard.organizationDetails")}
            </Text>

            <InfoRow
              label={t("Organization.primaryName")}
              value={organization.primaryName}
            />
            <InfoRow
              label={t("Organization.description")}
              value={organization.description}
            />
          </>
        )}
      </Stack>
    </Card>
  );
}
