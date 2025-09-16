import api from "@/api";
import { Box, Group, Modal, Table } from "@mantine/core";
import { useDisclosure, useHover } from "@mantine/hooks";
import { IconPencil, IconX } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import type { EntityName, TelecommunicationAddress } from "api-ts";
import { t } from "i18next";
import { EditTelecomForm } from "./EditTelecomForm";

interface TelecomTableRowWrapperProps {
  personId: string;
  telecom_address: TelecommunicationAddress;
}

const TelecomTableRowWrapper = ({
  personId,
  telecom_address,
}: TelecomTableRowWrapperProps) => {
  const mutation = useMutation({
    mutationKey: ["person", personId, "telecom_addresses", telecom_address.id],
    mutationFn: () =>
      api.persons.deletePersonsPersonIdTelecommunicationAddressesAddressIdDelete(
        {
          personId,

          addressId: telecom_address.id,
        }
      ),
  });

  return (
    <TelecomTableRow
      telecom_address={telecom_address}
      personId={personId}
      onDelete={() => mutation.mutate()}
    />
  );
};

interface TelecomTableRowProps {
  telecom_address: TelecommunicationAddress;
  personId: string;
  onDelete: (name: EntityName) => void;
}

const TelecomTableRow = ({
  telecom_address,
  personId,
  onDelete,
}: TelecomTableRowProps) => {
  const { hovered, ref } = useHover();
  const [opened, { open, close }] = useDisclosure(false);
  const handleEdit = () => {
    open();
  };
  const handleDelete = () => {
    if (window.confirm("Удалить выбранное значение?")) {
      onDelete(telecom_address);
    }
  };
  return (
    <>
      <Table.Tr ref={ref}>
        <Table.Td>{telecom_address.label}</Table.Td>
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
        <EditTelecomForm
          personId={personId}
          telecom_address={telecom_address}
          onCancel={close}
          onSuccess={() => close()}
        />
      </Modal>
    </>
  );
};

interface TelecomTableProps {
  personId: string;
  telecom_addresses: TelecommunicationAddress[];
}

export const TelecomTable = ({
  personId,
  telecom_addresses,
}: TelecomTableProps) => {
  return (
    <Box>
      <Table highlightOnHover>
        <Table.Tbody>
          {telecom_addresses.length === 0 ? (
            <Table.Tr>
              <Table.Td px={0} style={{ textAlign: "center" }}>
                {t("nodata")}
              </Table.Td>
            </Table.Tr>
          ) : (
            telecom_addresses.map((name) => (
              <TelecomTableRowWrapper
                key={name.id}
                personId={personId}
                telecom_address={name}
              />
            ))
          )}
        </Table.Tbody>
      </Table>
    </Box>
  );
};
