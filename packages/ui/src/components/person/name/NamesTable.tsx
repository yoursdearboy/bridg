import { Box, Modal, Table } from "@mantine/core";
import { useDisclosure, useHover } from "@mantine/hooks";
import { IconPencil, IconX } from "@tabler/icons-react";
import type { EntityName } from "api-ts";
import { t } from "i18next";
import { EditNameForm } from "./EditNameForm";

interface NamesTableRowProps {
  name: EntityName;
  personId: string;
  onDelete: (name: EntityName) => void;
  onUpdateSuccess: () => void;
}

const NamesTableRow = ({
  name,
  personId,
  onDelete,
  onUpdateSuccess,
}: NamesTableRowProps) => {
  const { hovered, ref } = useHover();
  const [opened, { open, close }] = useDisclosure(false);
  const handleDelete = () => {
    if (window.confirm("Удалить выбранное значение?")) {
      onDelete(name);
    }
  };
  const handleEdit = () => {
    open();
  };
  return (
    <>
      <Table.Tr ref={ref}>
        <Table.Td px={0}>{name.label}</Table.Td>
        <Table.Td px={0} style={{ width: 80, display: "flex", gap: 8 }}>
          {hovered && (
            <>
              <IconPencil size={16} color="green" onClick={handleEdit} />
              <IconX size={16} color="red" onClick={handleDelete} />
            </>
          )}
        </Table.Td>
      </Table.Tr>
      <Modal opened={opened} onClose={close} title={t("edit")}>
        <EditNameForm
          personId={personId}
          name={name}
          onClose={close}
          onSuccess={() => {
            close();
            onUpdateSuccess();
          }}
        />
      </Modal>
    </>
  );
};

interface NamesTableProps {
  names: EntityName[];
  personId: string;
  onDelete: (name: EntityName) => void;
  onUpdateSuccess: () => void;
}

export const NamesTable = ({
  names,
  personId,
  onDelete,
  onUpdateSuccess,
}: NamesTableProps) => {
  return (
    <Box pt="md">
      <Table highlightOnHover>
        <Table.Tbody>
          {names.length === 0 ? (
            <Table.Tr>
              <Table.Td px={0} style={{ textAlign: "center" }}>
                {t("nodata")}
              </Table.Td>
            </Table.Tr>
          ) : (
            names.map((name) => (
              <NamesTableRow
                key={name.id}
                name={name}
                personId={personId}
                onDelete={onDelete}
                onUpdateSuccess={onUpdateSuccess}
              />
            ))
          )}
        </Table.Tbody>
      </Table>
    </Box>
  );
};
