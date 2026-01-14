import { Box, Group, Modal, Table } from "@mantine/core";
import { useDisclosure, useHover } from "@mantine/hooks";
import { IconPencil, IconX } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import type { BiologicEntityName } from "api-ts";
import { t } from "i18next";
import api from "@/api";
import { EditNameForm } from "./EditNameForm";

interface NamesTableRowWrapperProps {
  personId: string;
  name: BiologicEntityName;
}

const NamesTableRowWrapper = ({
  personId,
  name,
}: NamesTableRowWrapperProps) => {
  const mutation = useMutation({
    mutationKey: ["person", personId, "names", name.id],
    mutationFn: () =>
      api.persons.deletePersonPersonIdNameNameIdDelete({
        personId,
        nameId: name.id,
      }),
  });

  return (
    <NamesTableRow
      name={name}
      personId={personId}
      onDelete={() => mutation.mutate()}
    />
  );
};

interface NamesTableRowProps {
  name: BiologicEntityName;
  personId: string;
  onDelete: (name: BiologicEntityName) => void;
}

const NamesTableRow = ({ name, personId, onDelete }: NamesTableRowProps) => {
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
      <Modal opened={opened} onClose={close} title={t("edit")} size="lg">
        <EditNameForm
          personId={personId}
          name={name}
          onCancel={close}
          onSuccess={() => close()}
        />
      </Modal>
    </>
  );
};

interface NamesTableProps {
  personId: string;
  names: BiologicEntityName[];
}

export const NamesTable = ({ personId, names }: NamesTableProps) => {
  return (
    <Box>
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
              />
            ))
          )}
        </Table.Tbody>
      </Table>
    </Box>
  );
};
