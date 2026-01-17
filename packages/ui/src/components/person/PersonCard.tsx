import type { Person } from "@bridg/api-ts";
import {
  Badge,
  Box,
  Button,
  Card,
  Group,
  Modal,
  Stack,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import ButtonLink from "@/components/ButtonLink";
import { InfoRow } from "@/components/InfoRow";
import { EditPersonForm } from "@/components/person/EditPersonForm";
import { Route as personRoute } from "@/routes/persons/$personId";
import BackButton from "../BackButton";

interface PersonCardProps {
  person: Person;
  link: "forward" | "backward";
}

export const PersonCard = ({ person, link }: PersonCardProps) => {
  const { t } = useTranslation();
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Card withBorder shadow="sm" radius="md" padding="xs">
        <Card.Section withBorder inheritPadding py="xs">
          <Group justify="space-between">
            <Text fw={500} px="xs">
              {t("PersonCard.title")}
            </Text>
            <Group>
              <Button.Group>
                {link == "forward" ? (
                  <ButtonLink
                    to={personRoute.to}
                    params={{ personId: person.id }}
                    variant="outline"
                    size="compact-sm"
                  >
                    {t("PersonCard.link")}
                  </ButtonLink>
                ) : (
                  <BackButton variant="outline" size="compact-sm">
                    {t("back")}
                  </BackButton>
                )}
                <Button variant="outline" size="compact-sm" onClick={open}>
                  {t("PersonCard.edit")}
                </Button>
              </Button.Group>
            </Group>
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
      <Modal
        opened={opened}
        onClose={close}
        title={t("PersonEditPage.editModalTitile")}
        size="lg"
      >
        <EditPersonForm
          person={person}
          onCancel={close}
          onSuccess={() => close()}
        />
      </Modal>
    </>
  );
};
