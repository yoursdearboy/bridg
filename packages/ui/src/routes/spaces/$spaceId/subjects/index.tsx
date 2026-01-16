import { Box, CopyButton, Group, Stack, Table, Text } from "@mantine/core";
import { IconEye } from "@tabler/icons-react";
import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import api from "@/api";
import ButtonLink from "@/components/ButtonLink";
import { Route as infoRoute } from "./$subjectId";
import { Route as newRoute } from "./new";

export const Route = createFileRoute("/spaces/$spaceId/subjects/")({
  loader: ({ params }) => api.listSpaceSubject(params),
  component: SubjectIndexPage,
  beforeLoad: () => ({
    breadcrumb: null,
  }),
});

function SubjectIndexPage() {
  const { t } = useTranslation();
  const subjects = Route.useLoaderData();
  const { spaceId } = Route.useParams();

  const rows = subjects.map((subject) => (
    <Table.Tr key={subject.id}>
      <Table.Td
        style={{
          maxWidth: 100,
          whiteSpace: "nowrap",
          overflow: "hidden",
        }}
      >
        <CopyButton value={subject.id}>
          {({ copy }) => (
            <span onClick={copy} title={subject.id}>
              {subject.id.slice(0, 8)}…
            </span>
          )}
        </CopyButton>
      </Table.Td>
      <Table.Td>
        <Text>{subject.performingBiologicEntity?.primaryName?.label}</Text>
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
            ? t("yes")
            : t("no")}
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
        <Text>{subject.status ? t(`Status.${subject.status}`) : t("no")}</Text>
      </Table.Td>
      <Table.Td>
        {subject.statusDate
          ? t("intlDateTime", { val: subject.statusDate })
          : t("na")}
      </Table.Td>
      <Table.Td>
        <ButtonLink
          size="compact-md"
          variant="subtle"
          to={infoRoute.to}
          params={{ spaceId, subjectId: subject.id }}
        >
          <IconEye size={20} />
        </ButtonLink>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Stack gap="md">
      <Group justify="space-between">
        <Box />
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
