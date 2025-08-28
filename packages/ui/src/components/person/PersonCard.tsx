import { InfoRow } from "@/components/InfoRow";
import { Badge, Card, Stack } from "@mantine/core";
import type { PersonOutput } from "api-ts";
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
        <InfoRow
          label={t("Person.primaryName")}
          value={person.primaryName?.label}
        >
          {person.deathIndicator && (
            <Badge color="red" ml="sm">
              {t("PersonCard.deceased")}
            </Badge>
          )}
        </InfoRow>

        <InfoRow
          label={t("Person.administrativeGenderCode")}
          value={
            person.administrativeGenderCode
              ? t(`Gender.${person.administrativeGenderCode}`)
              : t("na")
          }
        />

        <InfoRow
          label={t("Person.birthDate")}
          value={
            person.birthDate
              ? t("intlDateTime", { val: person.birthDate })
              : t("na")
          }
        />

        <InfoRow
          label={t("Person.age")}
          value={
            person.birthDate
              ? t("dayjsDuration", {
                  val: dayjs.duration(
                    dayjs().diff(person.birthDate, "year"),
                    "year"
                  ),
                })
              : t("na")
          }
        />

        <InfoRow
          label={t("Person.deathDate")}
          value={
            person.deathIndicator
              ? person.deathDate
                ? t("intlDateTime", { val: person.deathDate })
                : t("PersonCard.dateNotSpecified")
              : t("PersonCard.notDeceased")
          }
        />
      </Stack>
    </Card>
  );
};
