import { Table, Box, Modal } from "@mantine/core";
import { useDisclosure, useHover } from "@mantine/hooks";
import type { EntityName } from "api-ts";
import api from "@/api";
import { IconX, IconPencil } from "@tabler/icons-react";

import { EditNameForm } from "./EditNameForm";
import { t } from "i18next";

interface NamesTableRowProps {
  name: EntityName;
  personId: string;
  onDeleteSuccess: () => void;
  onUpdateSuccess: () => void;
}

const NamesTableRow = ({
  name,
  personId,

  onDeleteSuccess,
  onUpdateSuccess,
}: NamesTableRowProps) => {
  const { hovered, ref } = useHover();
  const [opened, { open, close }] = useDisclosure(false);
  const handleDelete = async () => {
    const ok = window.confirm("Удалить выбранное значение?");
    if (!ok) return;

    await api.persons.deletePersonsPersonIdNamesNameIdDelete({
      personId,
      nameId: name.id,
    });

    onDeleteSuccess();
  };
  const handleEditClick = () => {
    open();
  };
  return (
    <>
      <Table.Tr ref={ref}>
        <Table.Td px={0}>{name.label}</Table.Td>
        <Table.Td px={0} style={{ width: 80, display: "flex", gap: 8 }}>
          {hovered && (
            <>
              <IconPencil
                size={16}
                color="green"
                onClick={() => handleEditClick()}
              />
              <IconX
                size={16}
                color="red"
                onClick={() => void handleDelete()}
              />
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
  onDeleteSuccess: () => void;
  onUpdateSuccess: () => void;
}

export const NamesTable = ({
  names,
  personId,
  onDeleteSuccess,
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
                onDeleteSuccess={onDeleteSuccess}
                onUpdateSuccess={onUpdateSuccess}
              />
            ))
          )}
        </Table.Tbody>
      </Table>
    </Box>
  );
};
