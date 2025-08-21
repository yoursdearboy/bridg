import { Table, Box, Modal } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import type { EntityName } from "bridg-ts";
import api from "@/api";
import { IconX, IconPencil } from "@tabler/icons-react";
import { NameForm } from "./NameForm";
import React from "react";

interface NamesTableRowProps {
  name: EntityName;
  personId: string;
  onEdit: (name: EntityName) => void;
  onDeleteSuccess: () => void;
}

const NamesTableRow = ({
  name,
  personId,
  onEdit,
  onDeleteSuccess,
}: NamesTableRowProps) => {
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
      <Table.Td px={0} style={{ width: 80, display: "flex", gap: 8 }}>
        {hovered && (
          <>
            <IconPencil size={16} color="blue" onClick={() => onEdit(name)} />
            <IconX size={16} color="red" onClick={() =>  handleDelete()} />
          </>
        )}
      </Table.Td>
    </Table.Tr>
  );
};

interface NamesTableProps {
  names: EntityName[];
  personId: string;
  onDeleteSuccess: () => void;
  onUpdateSuccess: () => void;
}

export const NamesTable = ({
  names,
  personId,
  onDeleteSuccess,
  onUpdateSuccess,
}: NamesTableProps) => {
  const [editingName, setEditingName] = React.useState<EntityName | null>(null);
  const [opened, setOpened] = React.useState(false);

  const handleEditClick = (name: EntityName) => {
    setEditingName(name);
    setOpened(true);
  };

  const closeModal = () => setOpened(false);

  return (
    <Box pt="md">
      <Table highlightOnHover>
        <Table.Tbody>
          {names.length === 0 ? (
            <Table.Tr>
              <Table.Td px={0} style={{ textAlign: "center" }}>
                Нет данных
              </Table.Td>
            </Table.Tr>
          ) : (
            names.map((name) => (
              <NamesTableRow
                key={name.id}
                name={name}
                personId={personId}
                onEdit={handleEditClick}
                onDeleteSuccess={onDeleteSuccess}
              />
            ))
          )}
        </Table.Tbody>
      </Table>

      <Modal opened={opened} onClose={closeModal} title="Редактировать имя">
        {editingName && (
          <NameForm
            initialValues={editingName}
            personId={personId}
            onClose={closeModal}
            onSuccess={() => {
              closeModal();
              onUpdateSuccess();
            }}
          />
        )}
      </Modal>
    </Box>
  );
};
