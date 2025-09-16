import { Box, Group, Modal, Table } from "@mantine/core";
import { useDisclosure, useHover } from "@mantine/hooks";
import { IconPencil, IconX } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import type { PostalAddress } from "api-ts";
import { t } from "i18next";
import api from "@/api";
import { EditAddressForm } from "./EditAddressForm";

interface AddressTableRowWrapperProps {
  personId: string;
  address: PostalAddress;
}

const AddressTableRowWrapper = ({
  personId,
  address,
}: AddressTableRowWrapperProps) => {
  const mutation = useMutation({
    mutationKey: ["person", personId, "addresses", address.id],
    mutationFn: () =>
      api.persons.deletePersonsPersonIdPostalAddressesAddressIdDelete({
        personId,
        addressId: address.id,
      }),
  });

  return (
    <AddressTableRow
      address={address}
      personId={personId}
      onDelete={() => mutation.mutate()}
    />
  );
};

interface AddressTableRowProps {
  address: PostalAddress;
  personId: string;
  onDelete: (address: PostalAddress) => void;
}

const AddressTableRow = ({
  address,
  personId,
  onDelete,
}: AddressTableRowProps) => {
  const { hovered, ref } = useHover();
  const [opened, { open, close }] = useDisclosure(false);
  const handleEdit = () => {
    open();
  };
  const handleDelete = () => {
    if (window.confirm("Удалить выбранное значение?")) {
      onDelete(address);
    }
  };
  return (
    <>
      <Table.Tr ref={ref}>
        <Table.Td>{address.label}</Table.Td>
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
        <EditAddressForm
          personId={personId}
          address={address}
          onCancel={close}
          onSuccess={() => close()}
        />
      </Modal>
    </>
  );
};

interface AddressTableProps {
  personId: string;
  addresses: PostalAddress[];
}

export const AddressTable = ({ personId, addresses }: AddressTableProps) => {
  return (
    <Box>
      <Table highlightOnHover>
        <Table.Tbody>
          {addresses.length === 0 ? (
            <Table.Tr>
              <Table.Td px={0} style={{ textAlign: "center" }}>
                {t("nodata")}
              </Table.Td>
            </Table.Tr>
          ) : (
            addresses.map((address) => (
              <AddressTableRowWrapper
                key={address.id}
                personId={personId}
                address={address}
              />
            ))
          )}
        </Table.Tbody>
      </Table>
    </Box>
  );
};
