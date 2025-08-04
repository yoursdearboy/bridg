// src/components/PatientCard.tsx
import { Badge, Card, Divider, Group, Stack, Text } from "@mantine/core";
import type { StudySubject } from "bridg-ts";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

interface PatientCardProps {
  subject: StudySubject;
  onEdit?: () => void;
}

export function PatientCard({ subject, onEdit }: PatientCardProps) {
  const person = subject.performingBiologicEntity;

  const { t } = useTranslation();

  return (
    <Card withBorder shadow="sm" padding="lg" radius="md">
      <Stack gap="sm">
        {/* Заголовок карточки с кнопкой редактирования */}
        <Group justify="space-between">
          <Text size="xl" fw={700}>
            {t("PatientCardInfo")}
          </Text>
          {onEdit && (
            <Badge color="blue" style={{ cursor: "pointer" }} onClick={onEdit}>
              {t("Edit")}
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

        {/* change to format without t() because idk why it doesn't work with english language */}
        <InfoRow
          label="Date of Birth"
          value={
            person?.birthDate
              ? dayjs(person.birthDate).format("DD.MM.YYYY")
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

        {/* Информация о смерти (если есть) */}
        <InfoRow
          label="Date of Death"
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
