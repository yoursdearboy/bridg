import { InfoRow } from "@/components/InfoRow";
import { Badge, Card, Stack } from "@mantine/core";
import type { PersonOutput } from "bridg-ts";
import dayjs from "dayjs";
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
              {t("Deceased")}
            </Badge>
          )}
        </InfoRow>

        <InfoRow
          label={t("Gender_")}
          value={t(`Gender.${person.administrativeGenderCode}`)}
        />

        <InfoRow
          label={t("Birthdate")}
          value={
            person.birthDate
              ? t("intlDateTime", { val: person.birthDate })
              : "N/A"
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
              : "N/A"
          }
        />

        <InfoRow
          label={t("Death date")}
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
