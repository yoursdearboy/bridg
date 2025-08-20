import { Table, CloseButton } from "@mantine/core";

import { useState } from "react";
import type { EntityName } from "bridg-ts";
import api from "@/api";

export const NamesTable = ({
  names,
  personId,
  onDeleteSuccess,
}: {
  names: EntityName[];
  personId: string;
  onDeleteSuccess: () => void;
}) => {
  const [hoveredId, setHoveredId] = useState("");

  const handleDelete = async (id: string) => {
    const ok = window.confirm("Удалить выбранное значение?");
    if (!ok) return;

    await api.persons.deletePersonsPersonIdNamesNameIdDelete({
      personId,
      nameId: id,
    });

    onDeleteSuccess();
  };

  return (
    <Table highlightOnHover>
      <Table.Tbody>
        {names.length === 0 ? (
          <Table.Tr>
            <Table.Td px={0} style={{ textAlign: "center" }}></Table.Td>
          </Table.Tr>
        ) : (
          names.map((name) => (
            <Table.Tr
              key={name.id}
              onMouseEnter={() => setHoveredId(name.id)}
              onMouseLeave={() => setHoveredId("")}
            >
              <Table.Td px={0}>{name.label}</Table.Td>
              <Table.Td px={0} style={{ width: 40 }}>
                {hoveredId === name.id && (
                  <CloseButton
                    color="red"
                    onClick={() => handleDelete(name.id)}
                  />
                )}
              </Table.Td>
            </Table.Tr>
          ))
        )}
      </Table.Tbody>
    </Table>
  );
};
