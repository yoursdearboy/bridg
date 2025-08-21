import api from "@/api";
import { useHover } from "@mantine/hooks";
import { Box, Table } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import type { PostalAddress } from "bridg-ts";
import { useTranslation } from "react-i18next";

interface AddressesTableProps {
  addresses: PostalAddress[];
  personId: string;
  onDeleteSuccess: () => void;
}

export const AddressesTable = ({
  addresses,
  personId,
  onDeleteSuccess,
}: AddressesTableProps) => {
  const { t } = useTranslation();

  const AddressesTableRow = ({ address }: { address: PostalAddress }) => {
    const { hovered, ref } = useHover();

    const handleDelete = async () => {
      const ok = window.confirm(t("AddressesTable.deleteConfirm"));
      if (!ok) return;

      await api.persons.deletePersonsPersonIdPostalAddressesAddressIdDelete({
        personId,
        addressId: address.id,
      });

      onDeleteSuccess();
    };

    return (
      <Table.Tr ref={ref}>
        <Table.Td px={0}>{address.label}</Table.Td>
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
          {addresses.length === 0 ? (
            <Table.Tr>
              <Table.Td px={0} style={{ textAlign: "center" }}></Table.Td>
            </Table.Tr>
          ) : (
            addresses.map((address) => (
              <AddressesTableRow key={address.id} address={address} />
            ))
          )}
        </Table.Tbody>
      </Table>
    </Box>
  );
};
