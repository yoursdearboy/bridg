// src/components/SubjectInfoCard.tsx
import {
  Card,
  Group,
  Text,
  Badge,
  Divider,
  Stack,
  List,
  Anchor,
} from "@mantine/core";
import dayjs from "dayjs";
import type { StudySubject } from "bridg-ts";
import { Link } from "@tanstack/react-router";

interface SubjectInfoCardProps {
  subject: StudySubject;
  spaceId: string;
  onEdit?: () => void;
}

export function SubjectInfoCard({
  subject,
  spaceId,
  onEdit,
}: SubjectInfoCardProps) {
  const person = subject.performing_biologic_entity;
  const organization = subject.performing_organization;

  return (
    <Card withBorder shadow="sm" padding="lg" radius="md">
      <Stack gap="sm">
        {/* Card Header */}
        <Group justify="space-between">
          <Text size="xl" fw={700}>
            Subject Information
          </Text>
          {onEdit && (
            <Anchor
              component={Link}
              to="/spaces/$spaceId/subjects/$subjectId/edit"
              params={{ spaceId, subjectId: subject.id }}
              underline="never"
            >
              <Badge color="blue" style={{ cursor: "pointer" }}>
                Edit
              </Badge>
            </Anchor>
          )}
        </Group>

        <Divider my="xs" />

        {/* Status Information */}
        <InfoRow
          label="Status"
          value={
            <>
              <Badge
                color={
                  subject.status === "active"
                    ? "green"
                    : subject.status === "suspended"
                      ? "yellow"
                      : "gray"
                }
              >
                {subject.status || "-"}
              </Badge>
              {subject.status_date && (
                <Text span ml="sm">
                  ({dayjs(subject.status_date).format("YYYY-MM-DD")})
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

            <InfoRow label="Full Name" value={person.primary_name} />
            <InfoRow label="Gender" value={person.administrative_gender_code} />
            <InfoRow
              label="Date of Birth"
              value={
                person.birth_date
                  ? dayjs(person.birth_date).format("YYYY-MM-DD")
                  : undefined
              }
            />
            {person.death_indicator && (
              <InfoRow
                label="Date of Death"
                value={
                  person.death_date
                    ? `${dayjs(person.death_date).format("YYYY-MM-DD")}${person.death_date_estimated_indicator ? " (estimated)" : ""}`
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
              value={organization.primary_name}
            />
            <InfoRow label="Description" value={organization.description} />
          </>
        )}

        {/* Study Site Relationships */}
        <Divider my="xs" />
        <Group align="flex-start">
          <Text fw={600} w={150} c="dimmed">
            Study Sites:
          </Text>
          <List size="sm" spacing="xs">
            {subject.assigned_study_site_protocol_version_relationship
              ?.length ? (
              subject.assigned_study_site_protocol_version_relationship.map(
                (asspvr, index) => (
                  <List.Item key={index}>
                    {typeof asspvr === "string"
                      ? asspvr
                      : JSON.stringify(asspvr)}
                  </List.Item>
                )
              )
            ) : (
              <Text c="dimmed">No study sites assigned</Text>
            )}
          </List>
        </Group>
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