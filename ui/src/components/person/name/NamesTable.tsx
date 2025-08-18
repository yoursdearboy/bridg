import { Table } from "@mantine/core";
import { useTranslation } from "react-i18next";

interface NameData {
  id: string;
  family?: string | null;
  given?: string | null;
  middle?: string | null;
  patronymic?: string | null;
}

interface NamesTableProps {
  names: NameData[];
}

export const NamesTable = ({ names }: NamesTableProps) => {
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
            <Table.Th>{t("Family name")}</Table.Th>
            <Table.Th>{t("Given name")}</Table.Th>
            <Table.Th>{t("Middle name")}</Table.Th>
            <Table.Th>{t("Patronymic")}</Table.Th>
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
