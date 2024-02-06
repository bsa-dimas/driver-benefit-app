import {
  SortingFn,
  createColumnHelper,
  sortingFns,
} from "@tanstack/react-table";
import React, { HTMLProps } from "react";
import { compareItems } from "@tanstack/match-sorter-utils";
import IndeterminateCheckbox from "@/app/components/ui/IndeterminateCheckbox";
import { TableCell } from "@/app/components/ui/TableCell";
import { EditCell } from "@/app/components/ui/EditCell";
import { Periode } from "@/app/components/models/periode_model";

const fuzzySort: SortingFn<any> = (rowA, rowB, columnId) => {
  let dir = 0;

  // Only sort by rank if the column has ranking information
  if (rowA.columnFiltersMeta[columnId]) {
    dir = compareItems(
      rowA.columnFiltersMeta[columnId]?.itemRank!,
      rowB.columnFiltersMeta[columnId]?.itemRank!
    );
  }

  // Provide an alphanumeric fallback for when the item ranks are equal
  return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir;
};

const columnHelper = createColumnHelper<Periode>();

export const columns = [
  columnHelper.display({
    id: "check",
    size: 5,
    header: ({ table }) => (
      <IndeterminateCheckbox
        {...{
          checked: table.getIsAllRowsSelected(),
          indeterminate: table.getIsSomeRowsSelected(),
          onChange: table.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <div className="">
        <IndeterminateCheckbox
          {...{
            checked: row.getIsSelected(),
            disabled: !row.getCanSelect(),
            indeterminate: row.getIsSomeSelected(),
            onChange: row.getToggleSelectedHandler(),
          }}
        />
      </div>
    ),
  }),
  columnHelper.accessor("id", {
    header: "ID",
    size: 10,
    cell: TableCell,
    meta: {
      type: "number",
      disabled: true,
    },
  }),
  columnHelper.accessor("nama_periode", {
    header: "Name",
    size: 300,
    cell: TableCell,
    meta: {
      type: "text",
      required: true,
      disabled: true,
      pattern: "^[a-zA-Z ]+$",
    },
  }),
  columnHelper.accessor("dari_tanggal", {
    header: "Tanggal Mulai",
    size: 300,
    cell: TableCell,
    meta: {
      type: "text",
      required: true,
      disabled: true,
      pattern: "^[a-zA-Z ]+$",
    },
  }),
  columnHelper.accessor("sampai_tanggal", {
    header: "Tanggal Akhir",
    size: 300,
    cell: TableCell,
    meta: {
      type: "text",
      required: true,
      disabled: true,
      pattern: "^[a-zA-Z ]+$",
    },
  }),
  columnHelper.display({
    id: "edit",
    size: 10,
    cell: EditCell,
  }),
];
