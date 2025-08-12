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
        <InfoRow label="Full Name" value={person.primaryName}>
          {person.deathIndicator && (
            <Badge color="red" ml="sm">
              {"Deceased"}
            </Badge>
          )}
        </InfoRow>

        <InfoRow label="Gender Name" value={person.administrativeGenderCode} />

        <InfoRow
          label="Date of Birth"
          value={
            person.birthDate
              ? t("intlDateTime", { val: person.birthDate })
              : undefined
          }
        />

        <InfoRow
          label="Age"
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
          label="Date of Death"
          value={
            person.deathIndicator
              ? person.deathDate
                ? t("intlDateTime", { val: person.deathDate })
                : "Date not specified"
              : "Not deceased"
          }
        />
      </Stack>
    </Card>
  );
};
