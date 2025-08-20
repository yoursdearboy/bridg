import { Table } from "@mantine/core";
import type { EntityName } from "bridg-ts";

export const NamesTable = ({ names }: { names: EntityName[] }) => {
  return (
    <>
      <Table>
        <Table.Tbody>
          {names.length === 0 ? (
            <Table.Tr>
              <Table.Td px={0} style={{ textAlign: "center" }}></Table.Td>
            </Table.Tr>
          ) : (
            names.map((name) => (
              <Table.Tr key={name.id}>
                <Table.Td px={0}>{name.label}</Table.Td>
              </Table.Tr>
            ))
          )}
        </Table.Tbody>
      </Table>
    </>
  );
};
