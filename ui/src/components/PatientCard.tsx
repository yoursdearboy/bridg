// src/components/PatientCard.tsx
import {
  Badge,
  Button,
  Card,
  Divider,
  Group,
  Stack,
  Text,
} from "@mantine/core";
import type { StudySubject } from "bridg-ts";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

interface PatientCardProps {
  subject: StudySubject;
}

export function PatientCard({ subject }: PatientCardProps) {
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
          <Button
            variant="outline"
            color="blue"
            size="sm"
            onClick={() => console.log("Edit clicked")} // Заглушка
          >
            {t("Edit")}
          </Button>
        </Group>

        <Divider my="xs" />

        {/* Основная информация */}
        <InfoRow label={t("FullName")} value={person?.primaryName?.trim()}>
          {person?.deathIndicator && (
            <Badge color="red" ml="sm">
              Deceased
            </Badge>
          )}
        </InfoRow>

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
              ? dayjs(person.birthDate).format("DD.MM.YYYY")
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
        {/* Информация о смерти (если есть) */}
        <InfoRow
          label={t("DateOfDeath")}
          value={
            person?.deathIndicator
              ? person?.deathDate
                ? t("intlDateTime", { val: person.deathDate })
                : t("DateNotSpecified")
              : t("NotDeceased")
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
