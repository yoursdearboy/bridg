import { Card, Table, Text, Group, Button } from "@mantine/core";
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
  onAddClick?: () => void;
}

export const NamesTable = ({ names, onAddClick }: NamesTableProps) => {
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
    <Card withBorder shadow="sm" radius="md">
      <Card.Section withBorder inheritPadding py="xs">
        <Group justify="space-between">
          <Text fw={500}>{t("Person names")}</Text>
          {onAddClick && (
            <Button
              variant="outline"
              size="compact-sm"
              onClick={onAddClick}
              fw={500}
            >
              {t("Add")}
            </Button>
          )}
        </Group>
      </Card.Section>

      <Table striped highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>{t("Family name")}</Table.Th>
            <Table.Th>{t("Given name")}</Table.Th>
            <Table.Th>{t("Middle name")}</Table.Th>
            <Table.Th>{t("Patronymic")}</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Card>
  );
};
