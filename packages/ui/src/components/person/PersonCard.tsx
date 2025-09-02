import { InfoRow } from "@/components/InfoRow";
import { Badge, Box, Button, Card, Group, Modal, Stack, Text } from "@mantine/core";
import type { PersonOutput } from "api-ts";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { useDisclosure } from "@mantine/hooks";

interface PersonCardProps {
  person: PersonOutput;
}

export const PersonCard = ({ person }: PersonCardProps) => {
  const { t } = useTranslation();
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Card withBorder shadow="sm" padding="lg" radius="md">
        <Card.Section withBorder inheritPadding py="xs">
          <Group justify="space-between">
            <Text fw={500} px="xs">123</Text>
            <Button variant="outline" size="compact-sm" onClick={open} fw={500}>
              {t("PersonShowPage.edit")}
            </Button>
          </Group>
        </Card.Section>
        <Box pt="xs">
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
        </Box>
      </Card>
      <Modal opened={opened} onClose={close} title={t("add")} size="lg">
      <></>
      </Modal>
    </>
  );
};
