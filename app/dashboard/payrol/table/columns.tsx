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
import { Payrol } from "@/app/components/models/payrol_model";

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

const columnHelper = createColumnHelper<Payrol>();

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
  columnHelper.accessor("nik", {
    header: "NIK",
    size: 300,
    cell: TableCell,
    meta: {
      type: "text",
      required: true,
      disabled: true,
      pattern: "^[a-zA-Z ]+$",
    },
  }),
  columnHelper.accessor("periode_transaksi_id", {
    header: "Periode",
    size: 300,
    cell: TableCell,
    meta: {
      type: "text",
      required: true,
      disabled: true,
      pattern: "^[a-zA-Z ]+$",
    },
  }),
  columnHelper.accessor("amount", {
    header: "Amount",
    size: 300,
    cell: TableCell,
    meta: {
      type: "numeric",
      required: true,
      disabled: true,
      pattern: "^[a-zA-Z ]+$",
    },
  }),
  columnHelper.accessor("dept_id", {
    header: "Dept",
    size: 300,
    cell: TableCell,
    meta: {
      type: "text",
      required: true,
      disabled: true,
      pattern: "^[a-zA-Z ]+$",
    },
  }),
];
