// src/components/PatientCard.tsx
import { Card, Group, Text, Badge, Divider, Stack } from "@mantine/core";
import dayjs from "dayjs";
import type { StudySubject } from "bridg-ts";

interface PatientCardProps {
  subject: StudySubject;
  onEdit?: () => void;
}

export function PatientCard({ subject, onEdit }: PatientCardProps) {
  const person = subject.performingBiologicEntity;

  return (
    <Card withBorder shadow="sm" padding="lg" radius="md">
      <Stack gap="sm">
        {/* Заголовок карточки с кнопкой редактирования */}
        <Group justify="space-between">
          <Text size="xl" fw={700}>
            Patient Information
          </Text>
          {onEdit && (
            <Badge color="blue" style={{ cursor: "pointer" }} onClick={onEdit}>
              Edit
            </Badge>
          )}
        </Group>

        <Divider my="xs" />

        {/* Основная информация */}
        <InfoRow label="Full Name" value={person?.primaryName?.trim()}>
          {person?.deathIndicator && (
            <Badge color="red" ml="sm">
              Deceased
            </Badge>
          )}
        </InfoRow>

        <InfoRow label="Gender" value={person?.administrativeGenderCode} />

        <InfoRow
          label="Date of Birth"
          value={
            person?.birthDate
              ? dayjs(person.birthDate).format("YYYY-MM-DD")
              : undefined
          }
        />

        <InfoRow
          label="Age"
          value={
            person?.birthDate
              ? `${dayjs().diff(person.birthDate, "year")} years`
              : undefined
          }
        />

        {/* Информация о смерти (если есть) */}
        <InfoRow
          label="Date of Death"
          value={
            person?.deathIndicator
              ? person?.deathDate
                ? dayjs(person.deathDate).format("YYYY-MM-DD")
                : "Date not specified"
              : "Not deceased"
          }
        />
      </Stack>
    </Card>
  );
}

// Вспомогательный компонент для строк информации
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
