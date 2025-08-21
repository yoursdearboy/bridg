import api from "@/api";
import type { PostalAddress } from "bridg-ts";
import { useHover } from "@mantine/hooks";
import { Table } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

export const AddressesTableRow = ({
  address,
  personId,
  onDeleteSuccess,
}: {
  address: PostalAddress;
  personId: string;
  onDeleteSuccess: () => void;
}) => {
  const { hovered, ref } = useHover();
  const { t } = useTranslation();

  const handleDelete = async () => {
    const ok = window.confirm(t("AddressesTableRow.deleteConfirm"));
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
