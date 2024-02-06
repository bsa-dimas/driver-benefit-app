import {
  SortingFn,
  createColumnHelper,
  sortingFns,
} from "@tanstack/react-table";
import { Departemen } from "@/app/components/models/departemen_model";
import React, { HTMLProps } from "react";
import { compareItems } from "@tanstack/match-sorter-utils";
import IndeterminateCheckbox from "@/app/components/ui/IndeterminateCheckbox";
import { TableCell } from "@/app/components/ui/TableCell";
import { EditCell } from "@/app/components/ui/EditCell";

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

const columnHelper = createColumnHelper<Departemen>();

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
      disabled: true,
      type: "number",
    },
  }),
  columnHelper.accessor("nama_departemen", {
    header: "Dept Name",
    size: 300,
    cell: TableCell,
    meta: {
      type: "text",
      required: true,
      pattern: "^[a-zA-Z ]+$",
    },
  }),
  columnHelper.display({
    id: "edit",
    size: 10,
    cell: EditCell,
  }),
];
