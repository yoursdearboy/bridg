import api from "@/api";
import ButtonLink from "@/components/ButtonLink";
import { Group, Stack, Table, Text } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";
import { Route as infoRoute } from "./$subjectId";
import { Route as newRoute } from "./new";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/spaces/$spaceId/subjects/")({
  loader: ({ params }) => api.subjects.indexSpacesSpaceIdSubjectsGet(params),
  component: RouteComponent,
  beforeLoad: () => ({
    breadcrumb: null,
  }),
});

function RouteComponent() {
  const { t } = useTranslation();
  const subjects = Route.useLoaderData();
  const { spaceId } = Route.useParams();

  const rows = subjects.map((subject) => (
    <Table.Tr key={subject.id}>
      <Table.Td>
        <Text>{subject.performingBiologicEntity?.id.trim()}</Text>
      </Table.Td>
      <Table.Td>
        <Text>{subject.performingBiologicEntity?.primaryName?.trim()}</Text>
      </Table.Td>
      <Table.Td>
        {subject.performingBiologicEntity?.administrativeGenderCode &&
          t(
            `Gender.${subject.performingBiologicEntity.administrativeGenderCode}`
          )}
      </Table.Td>
      <Table.Td>
        {subject.performingBiologicEntity?.birthDate
          ? t("intlDateTime", {
              val: subject.performingBiologicEntity.birthDate,
            })
          : t("na")}
      </Table.Td>
      <Table.Td>
        <Text>
          {subject.performingBiologicEntity?.deathIndicator === true
            ? t("Boolean.yes")
            : t("Boolean.no")}
        </Text>
      </Table.Td>
      <Table.Td>
        {subject.performingBiologicEntity?.deathDate
          ? t("intlDateTime", {
              val: subject.performingBiologicEntity.deathDate,
            })
          : t("na")}
      </Table.Td>
      <Table.Td>
        <Text>{subject.status?.trim()}</Text>
      </Table.Td>
      <Table.Td>
        {subject.statusDate
          ? t("intlDateTime", { val: subject.statusDate })
          : t("na")}
      </Table.Td>
      <Table.Td>
        <ButtonLink
          to={infoRoute.to}
          params={{ spaceId, subjectId: subject.id }}
        >
          {t("SubjectIndexPage.info")}
        </ButtonLink>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Stack gap="md">
      <Group justify="space-between">
        <Text size="xl" fw={700}>
          {t("SubjectIndexPage.patients")}
        </Text>
        <ButtonLink from={Route.to} to={newRoute.to} params={{ spaceId }}>
          {t("SubjectIndexPage.newPatient")}
        </ButtonLink>
      </Group>

      <Table.ScrollContainer minWidth={800}>
        <Table striped highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>{t("Person.id")}</Table.Th>
              <Table.Th>{t("Person.primaryName")}</Table.Th>
              <Table.Th>{t("Person.administrativeGenderCode")}</Table.Th>
              <Table.Th>{t("Person.birthDate")}</Table.Th>
              <Table.Th>{t("Person.deathIndicator")}</Table.Th>
              <Table.Th>{t("Person.deathDate")}</Table.Th>
              <Table.Th>{t("StudySubject.status")}</Table.Th>
              <Table.Th>{t("StudySubject.statusDate")}</Table.Th>
              <Table.Th>{t("SubjectIndexPage.actions")}</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </Stack>
  );
}
