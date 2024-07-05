import { DeleteButton, EditButton, List, ShowButton } from "@refinedev/chakra-ui";
import { useTable } from "@refinedev/react-table";
import { flexRender } from "@tanstack/react-table";
import React from "react";

import { HStack, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";

import { Pagination } from "../../components/pagination";

export const PersonList = () => {
  const columns = React.useMemo(
    () => [
      {
        id: "id",
        header: "ID",
        accessorKey: "id",
      },
      {
        id: "primary_name_use",
        header: "Use",
        accessorKey: "primary_name.use",
      },
      {
        id: "primary_name_family",
        header: "Family",
        accessorKey: "primary_name.family",
      },
      {
        id: "primary_name_given",
        header: "Given",
        accessorKey: "primary_name.given",
      },
      {
        id: "primary_name_middle",
        header: "Middle",
        accessorKey: "primary_name.middle",
      },
      {
        id: "primary_name_patronymic",
        header: "Patronymic",
        accessorKey: "primary_name.patronymic",
      },
      {
        id: "primary_name_prefix",
        header: "Prefix",
        accessorKey: "primary_name.prefix",
      },
      {
        id: "primary_name_suffix",
        header: "Suffix",
        accessorKey: "primary_name.suffix",
      },
      {
        id: "primary_name_full",
        header: "Full name",
        accessorKey: "primary_name.full",
      },
      {
        id: "sex",
        header: "Sex",
        accessorKey: "sex",
      },
      {
        id: "birth_date",
        header: "Birth date",
        accessorKey: "birth_date",
      },
      {
        id: "death_date",
        header: "Death date",
        accessorKey: "death_date",
      },
      {
        id: "death_date_estimated_indicator",
        header: "Death date estimated?",
        accessorKey: "death_date_estimated_indicator",
      },
      {
        id: "death_indicator",
        header: "Death",
        accessorKey: "death_indicator",
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
              <ShowButton hideText size="sm" recordItemId={getValue() as number} />
              <EditButton hideText size="sm" recordItemId={getValue() as number} />
            </HStack>
          );
        },
      },
    ],
    []
  );

  const {
    getHeaderGroups,
    getRowModel,
    setOptions,
    refineCore: {
      setCurrent,
      pageCount,
      current,
      tableQueryResult: { data: tableData },
    },
  } = useTable({
    columns,
    initialState: {
      columnVisibility: {
        primary_name_use: false,
        primary_name_family: false,
        primary_name_given: false,
        primary_name_middle: false,
        primary_name_patronymic: false,
        primary_name_prefix: false,
        primary_name_suffix: false,
        death_date_estimated_indicator: false,
      },
    },
    refineCoreProps: {
      initialSorter: [
        {
          field: "id",
          order: "desc",
        },
      ],
    },
  });

  return (
    <List>
      <TableContainer whiteSpace="pre-line">
        <Table variant="simple">
          <Thead>
            {getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Th key={header.id}>
                    <Text>{flexRender(header.column.columnDef.header, header.getContext())}</Text>
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
      <Pagination current={current} pageCount={pageCount} setCurrent={setCurrent} />
    </List>
  );
};
