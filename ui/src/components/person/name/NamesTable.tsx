import { Table } from "@mantine/core";
import type { EntityNameWithId } from "bridg-ts";
import { useTranslation } from "react-i18next";

export const NamesTable = ({ names }: { names: EntityNameWithId[] }) => {
  const { t } = useTranslation();
  const rows = names.map((name) => (
    <Table.Tr key={name.id}>
      <Table.Td>{name.family || "-"}</Table.Td>
      <Table.Td>{name.given || "-"}</Table.Td>
      <Table.Td>{name.middle || "-"}</Table.Td>
      <Table.Td>{name.patronymic || "-"}</Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <Table striped highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>{t("Name.family")}</Table.Th>
            <Table.Th>{t("Name.given")}</Table.Th>
            <Table.Th>{t("Name.middle")}</Table.Th>
            <Table.Th>{t("Name.patronymic")}</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {names.length === 0 ? (
            <Table.Tr>
              <Table.Td colSpan={4} style={{ textAlign: "center" }}></Table.Td>
            </Table.Tr>
          ) : (
            rows
          )}
        </Table.Tbody>
      </Table>
    </>
  );
};
