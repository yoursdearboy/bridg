import { Table, Box } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import type { EntityName } from "bridg-ts";
import api from "@/api";
import { IconX } from "@tabler/icons-react";
export const NamesTable = ({
  names,
  personId,
  onDeleteSuccess,
}: {
  names: EntityName[];
  personId: string;
  onDeleteSuccess: () => void;
}) => {
  const NamesTableRow = ({ name }: { name: EntityName }) => {
    const { hovered, ref } = useHover();

    const handleDelete = async () => {
      const ok = window.confirm("Удалить выбранное значение?");
      if (!ok) return;

      await api.persons.deletePersonsPersonIdNamesNameIdDelete({
        personId,
        nameId: name.id,
      });

      onDeleteSuccess();
    };

    return (
      <Table.Tr ref={ref}>
        <Table.Td px={0}>{name.label}</Table.Td>
        <Table.Td px={0} style={{ width: 40 }}>
          {hovered && (
            <IconX size={16} color="red" onClick={() => void handleDelete()} />
          )}
        </Table.Td>
      </Table.Tr>
    );
  };

  return (
    <Box pt="md">
      <Table highlightOnHover>
        <Table.Tbody>
          {names.length === 0 ? (
            <Table.Tr>
              <Table.Td px={0} style={{ textAlign: "center" }}></Table.Td>
            </Table.Tr>
          ) : (
            names.map((name) => <NamesTableRow key={name.id} name={name} />)
          )}
        </Table.Tbody>
      </Table>
    </Box>
  );
};
