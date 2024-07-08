import React from "react";
import { useTable } from "@refinedev/react-table";
import { ColumnDef, flexRender } from "@tanstack/react-table";
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, HStack, Text } from "@chakra-ui/react";
import { EditButton } from "@refinedev/chakra-ui";
import { useParsed } from "@refinedev/core";

export const NamesTable: React.FC = () => {
  const columns = React.useMemo(
    () => [
      {
        id: "id",
        header: "ID",
        accessorKey: "id",
      },
      {
        id: "use",
        header: "Use",
        accessorKey: "use",
      },
      {
        id: "full",
        header: "Full name",
        accessorKey: "full",
      },
      {
        id: "family",
        header: "Family",
        accessorKey: "family",
      },
      {
        id: "given",
        header: "Given",
        accessorKey: "given",
      },
      {
        id: "middle",
        header: "Middle",
        accessorKey: "middle",
      },
      {
        id: "patronymic",
        header: "Patronymic",
        accessorKey: "patronymic",
      },
      {
        id: "prefix",
        header: "Prefix",
        accessorKey: "prefix",
      },
      {
        id: "suffix",
        header: "Suffix",
        accessorKey: "suffix",
      },
      {
        id: "actions",
        header: "Actions",
        accessorKey: "id",
        enableColumnFilter: false,
        enableSorting: false,
        cell: function render({ getValue }: { getValue: any }) {
          return (
            <HStack>
              <EditButton hideText size="sm" recordItemId={getValue() as number} />
            </HStack>
          );
        },
      },
    ],
    []
  );

  const { resource: { name: resourceName } = {}, id } = useParsed();

  const {
    getHeaderGroups,
    getRowModel,
    refineCore: { setCurrent, pageCount, current },
  } = useTable({
    refineCoreProps: {
      resource: `${resourceName}/${id}/names`,
      pagination: {
        mode: "off",
      },
    },
    columns,
    initialState: {
      columnVisibility: {
        family: false,
        given: false,
        middle: false,
        patronymic: false,
        prefix: false,
        suffix: false,
      },
    },
  });

  return (
    <div style={{ padding: "8px" }}>
      <TableContainer whiteSpace="pre-line">
        <Table variant="simple">
          <Thead>
            {getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Th key={header.id}>
                    {!header.isPlaceholder && (
                      <Text>{flexRender(header.column.columnDef.header, header.getContext())}</Text>
                    )}
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {getRowModel().rows.map((row) => (
              <Tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <Td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

interface IProduct {
  id: number;
  name: string;
  price: string;
}
