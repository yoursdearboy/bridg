import { Box, Group, Modal, Table } from "@mantine/core";
import { useDisclosure, useHover } from "@mantine/hooks";
import { IconPencil, IconX } from "@tabler/icons-react";
import type { EntityName } from "api-ts";
import { t } from "i18next";
import { EditNameForm } from "./EditNameForm";
import api from "@/api";

interface NamesTableRowWrapperProps {
  personId: string;
  name: EntityName;
  invalidateQuery: () => void;
}

const NamesTableRowWrapper = ({
  personId,
  name,
  invalidateQuery,
}: NamesTableRowWrapperProps) => {
  const handleDelete = async () => {
    await api.persons.deletePersonsPersonIdNamesNameIdDelete({
      personId,
      nameId: name.id,
    });
    invalidateQuery();
  };

  return (
    <NamesTableRow
      name={name}
      personId={personId}
      onDelete={() => void handleDelete()}
      invalidateQuery={invalidateQuery}
    />
  );
};

interface NamesTableRowProps {
  name: EntityName;
  personId: string;
  invalidateQuery: () => void;
  onDelete: (name: EntityName) => void;
}

const NamesTableRow = ({
  name,
  personId,
  onDelete,
  invalidateQuery,
}: NamesTableRowProps) => {
  const { hovered, ref } = useHover();
  const [opened, { open, close }] = useDisclosure(false);
  const handleEdit = () => {
    open();
  };
  const handleDelete = () => {
    if (window.confirm("Удалить выбранное значение?")) {
      onDelete(name);
    }
  };
  return (
    <>
      <Table.Tr ref={ref}>
        <Table.Td>{name.label}</Table.Td>
        <Table.Td width={60}>
          {hovered && (
            <Group gap={8}>
              <IconPencil size={16} color="green" onClick={handleEdit} />
              <IconX size={16} color="red" onClick={handleDelete} />
            </Group>
          )}
        </Table.Td>
      </Table.Tr>
      <Modal opened={opened} onClose={close} title={t("edit")}>
        <EditNameForm
          personId={personId}
          name={name}
          onCancel={close}
          onSuccess={() => {
            close();
            invalidateQuery();
          }}
        />
      </Modal>
    </>
  );
};

interface NamesTableProps {
  personId: string;
  names: EntityName[];
  invalidateQuery: () => void;
}

export const NamesTable = ({
  personId,
  names,
  invalidateQuery,
}: NamesTableProps) => {
  return (
    <Box pt="xs">
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
              <NamesTableRowWrapper
                key={name.id}
                personId={personId}
                name={name}
                invalidateQuery={invalidateQuery}
              />
            ))
          )}
        </Table.Tbody>
      </Table>
    </Box>
  );
};
