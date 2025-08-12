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
        {/* Card Header */}
        <Group justify="space-between">
          <Text size="xl" fw={700}>
            {t("Subject Information")}
          </Text>
          {onEdit && (
            <Badge color="blue" style={{ cursor: "pointer" }} onClick={onEdit}>
              {t("Edit")}
            </Badge>
          )}
        </Group>

        <Divider my="xs" />

        {/* Status Information */}
        <InfoRow
          label={t("Status")}
          value={
            <>
              {subject.status || "-"}
              {subject.statusDate && (
                <Text span ml="sm">
                  ({t("intlDate", { 
                    val: new Date(subject.statusDate),
                    formatParams: {
                      val: {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit'
                      }
                    }
                  })})
                </Text>
              )}
            </>
          }
        />

        {/* Subject Type */}
        <InfoRow
          label={t("Subject Type")}
          value={person ? t("Person") : organization ? t("Organization") : t("Unknown")}
        />

        {/* Person Information */}
        {person && (
          <>
            <Divider my="xs" />
            <Text fw={600} size="sm" c="dimmed">
              {t("Person Details")}
            </Text>

            <InfoRow label={t("Full Name")} value={person.primaryName} />
            <InfoRow 
              label={t("Gender")} 
              value={person.administrativeGenderCode ? 
                t(`gender.${person.administrativeGenderCode}`) : 
                "-"}
            />
            
            <InfoRow
              label={t("Date of Birth")}
              value={
                person.birthDate
                  ? t("intlDate", { 
                      val: new Date(person.birthDate),
                      formatParams: {
                        val: {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit'
                        }
                      }
                    })
                  : "-"
              }
            />

            {person.deathIndicator && (
              <InfoRow
                label={t("Date of Death")}
                value={
                  person.deathDate
                    ? t("dateWithSuffix", {
                        date: t("intlDate", {
                          val: new Date(person.deathDate),
                          formatParams: {
                            val: {
                              year: 'numeric',
                              month: '2-digit',
                              day: '2-digit'
                            }
                          }
                        }),
                        suffix: person.deathDateEstimatedIndicator ? 
                          ` ${t("(estimated)")}` : ""
                      })
                    : t("Not specified")
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
              {t("Organization Details")}
            </Text>

            <InfoRow
              label={t("Organization Name")}
              value={organization.primaryName}
            />
            <InfoRow 
              label={t("Description")} 
              value={organization.description || "-"}
            />
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
        {value !== undefined ? value : "-"}
        {children}
      </Text>
    </Group>
  );
}