import { Box, Table } from "@mantine/core";
import type { PostalAddress } from "bridg-ts";
import { AddressesTableRow } from "./AddressTableRow";

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
              <AddressesTableRow
                key={address.id}
                personId={personId}
                address={address}
                onDeleteSuccess={onDeleteSuccess}
              />
            ))
          )}
        </Table.Tbody>
      </Table>
    </Box>
  );
};
