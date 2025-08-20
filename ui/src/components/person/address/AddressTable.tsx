import api from "@/api";
import { useHover } from "@mantine/hooks";
import { CloseButton, Table } from "@mantine/core";
import type { PostalAddressWithId } from "bridg-ts";
import { useTranslation } from "react-i18next";

interface AddressesTableProps {
  addresses: PostalAddressWithId[];
  personId: string;
  onDeleteSuccess: () => void;
}

export const AddressesTable = ({
  addresses,
  personId,
  onDeleteSuccess,
}: AddressesTableProps) => {
  const { t } = useTranslation();

  const AddressesTableRow = ({ address }: { address: PostalAddressWithId }) => {
    const { hovered, ref } = useHover();

    const handleDelete = () => {
      const ok = window.confirm(t("AddressesTable.deleteConfirm"));
      if (!ok) return;

      console.log('delete person address', personId)

      onDeleteSuccess();
    };

    return (
      <Table.Tr ref={ref}>
        <Table.Td px={0}>{address.label}</Table.Td>
        <Table.Td px={0} style={{ width: 40 }}>
          {hovered && (
            <CloseButton color="red" onClick={() => void handleDelete()} />
          )}
        </Table.Td>
      </Table.Tr>
    );
  };

  return (
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
  );
};
