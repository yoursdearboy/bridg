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
        <Text>{subject.performingBiologicEntity?.id?.trim()}</Text>
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
          : "N/A"}
      </Table.Td>
      <Table.Td>
        <Text>
          {subject.performingBiologicEntity?.deathIndicator === true
            ? t("Yes")
            : t("No")}
        </Text>
      </Table.Td>
      <Table.Td>
        {subject.performingBiologicEntity?.deathDate
          ? t("intlDateTime", {
              val: subject.performingBiologicEntity.deathDate,
            })
          : "N/A"}
      </Table.Td>
      <Table.Td>
        <Text>{subject.status?.trim()}</Text>
      </Table.Td>
      <Table.Td>
        {subject.statusDate
          ? t("intlDateTime", { val: subject.statusDate })
          : "N/A"}
      </Table.Td>
      <Table.Td>
        <ButtonLink
          to={infoRoute.to}
          params={{ spaceId, subjectId: subject.id }}
        >
          {t("Info")}
        </ButtonLink>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Stack gap="md">
      <Group justify="space-between">
        <Text size="xl" fw={700}>
          {t("Patients")}
        </Text>
        <ButtonLink from={Route.to} to={newRoute.to} params={{ spaceId }}>
          {t("New Patient")}
        </ButtonLink>
      </Group>

      <Table.ScrollContainer minWidth={800}>
        <Table striped highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>{t("ID")}</Table.Th>
              <Table.Th>{t("Full Name")}</Table.Th>
              <Table.Th>{t("Gender_")}</Table.Th>
              <Table.Th>{t("Date of Birth")}</Table.Th>
              <Table.Th>{t("Death Indicator")}</Table.Th>
              <Table.Th>{t("Date of Death")}</Table.Th>
              <Table.Th>{t("Status_")}</Table.Th>
              <Table.Th>{t("Status date")}</Table.Th>
              <Table.Th>{t("Actions")}</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </Stack>
  );
}
