import { Badge, Card, Group, Stack, Text } from "@mantine/core";
import type { PersonOutput } from "bridg-ts";
import dayjs from "dayjs";
import { t } from "i18next";
import { useTranslation } from "react-i18next";

interface PersonCardProps {
  person: PersonOutput;
}

export const PersonCard = ({ person }: PersonCardProps) => {
  const { t } = useTranslation();

  return (
    <Card withBorder shadow="sm" padding="lg" radius="md">
      <Stack gap="sm">
        <InfoRow label={t("Full Name")} value={person.primaryName}>
          {person.deathIndicator && (
            <Badge color="red" ml="sm">
              {"Deceased"}
            </Badge>
          )}
        </InfoRow>

        <InfoRow
          label={t("Gender Name")}
          value={person.administrativeGenderCode}
        />

        <InfoRow
          label={t("Date of Birth")}
          value={
            person.birthDate
              ? t("intlDateTime", { val: person.birthDate })
              : undefined
          }
        />

        <InfoRow
          label={t("Age")}
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
          label={t("Date of Death")}
          value={
            person.deathIndicator
              ? person.deathDate
                ? t("intlDateTime", { val: person.deathDate })
                : t("Date not specified")
              : t("Not deceased")
          }
        />
      </Stack>
    </Card>
  );
};

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
        {value || t("N/A")}
        {children}
      </Text>
    </Group>
  );
}
