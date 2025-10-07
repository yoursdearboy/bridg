import { Box, Group, Modal, Table } from "@mantine/core";
import { useDisclosure, useHover } from "@mantine/hooks";
import { IconPencil, IconX } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import type { TelecommunicationAddress } from "api-ts";
import { t } from "i18next";
import api from "@/api";
import { EditTelecommunicationAddressForm } from "./EditTelecommunicationAddressForm";
import icons from "./icons";

interface TelecommunicationAddressTableRowWrapperProps {
  personId: string;
  telecommunication_address: TelecommunicationAddress;
}

const TelecommunicationAddressTableRowWrapper = ({
  personId,
  telecommunication_address,
}: TelecommunicationAddressTableRowWrapperProps) => {
  const mutation = useMutation({
    mutationKey: [
      "person",
      personId,
      "telecommunication_address",
      telecommunication_address.id,
    ],
    mutationFn: () =>
      api.persons.deletePersonsPersonIdTelecommunicationAddressesAddressIdDelete(
        {
          personId,
          addressId: telecommunication_address.id,
        }
      ),
  });

  return (
    <TelecommunicationAddressTableRow
      telecommunication_address={telecommunication_address}
      personId={personId}
      onDelete={() => mutation.mutate()}
    />
  );
};

interface TelecommunicationAddressTableRowProps {
  telecommunication_address: TelecommunicationAddress;
  personId: string;
  onDelete: (name: TelecommunicationAddress) => void;
}

const TelecommunicationAddressTableRow = ({
  telecommunication_address,
  personId,
  onDelete,
}: TelecommunicationAddressTableRowProps) => {
  const { hovered, ref } = useHover();
  const [opened, { open, close }] = useDisclosure(false);
  const handleEdit = () => {
    open();
  };
  const handleDelete = () => {
    if (window.confirm("Удалить выбранное значение?")) {
      onDelete(telecommunication_address);
    }
  };

  const Icon = telecommunication_address.scheme
    ? icons[telecommunication_address.scheme]
    : () => <div></div>;
  return (
    <>
      <Table.Tr ref={ref}>
        <Table.Td width={30} valign="middle">
          <Icon size={16} strokeWidth={2} display="block" />
        </Table.Td>
        <Table.Td>{telecommunication_address.address}</Table.Td>
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
        <EditTelecommunicationAddressForm
          personId={personId}
          telecommunication_address={telecommunication_address}
          onCancel={close}
          onSuccess={() => close()}
        />
      </Modal>
    </>
  );
};

interface TelecommunicationAddressTableProps {
  personId: string;
  telecom_addresses: TelecommunicationAddress[];
}

export const TelecommunicationAddressTable = ({
  personId,
  telecom_addresses,
}: TelecommunicationAddressTableProps) => {
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
              <TelecommunicationAddressTableRowWrapper
                key={name.id}
                personId={personId}
                telecommunication_address={name}
              />
            ))
          )}
        </Table.Tbody>
      </Table>
    </Box>
  );
};
