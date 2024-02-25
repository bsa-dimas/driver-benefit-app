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
import { Sopir } from "@/app/components/models/sopir_model";

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

const columnHelper = createColumnHelper<Sopir>();

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
  columnHelper.accessor("nik", {
    header: "NIM",
    size: 300,
    cell: TableCell,
    meta: {
      type: "text",
      required: true,
      pattern: "^[a-zA-Z ]+$",
    },
  }),
  columnHelper.accessor("nama", {
    header: "Name",
    size: 300,
    cell: TableCell,
    meta: {
      type: "text",
      required: true,
      pattern: "^[a-zA-Z ]+$",
    },
  }),
  columnHelper.accessor("tgl_gabung", {
    header: "Tgl Gabung",
    size: 300,
    cell: TableCell,
    meta: {
      type: "text",
      required: true,
      pattern: "^[a-zA-Z ]+$",
    },
  }),
  columnHelper.accessor("tgl_keluar", {
    header: "Tgl Keluar",
    size: 300,
    cell: TableCell,
    meta: {
      type: "text",
      required: true,
      pattern: "^[a-zA-Z ]+$",
    },
  }),
  columnHelper.accessor("bank", {
    header: "Bank",
    size: 300,
    cell: TableCell,
    meta: {
      type: "text",
      required: true,
      pattern: "^[a-zA-Z ]+$",
    },
  }),
  columnHelper.accessor("cabang_bank", {
    header: "Cabang Bank",
    size: 300,
    cell: TableCell,
    meta: {
      type: "text",
      required: true,
      pattern: "^[a-zA-Z ]+$",
    },
  }),
  columnHelper.accessor("no_rekening", {
    header: "No. Rek",
    size: 300,
    cell: TableCell,
    meta: {
      type: "text",
      required: true,
      pattern: "^[a-zA-Z ]+$",
    },
  }),
  columnHelper.accessor("alamat", {
    header: "Alamat",
    size: 300,
    cell: TableCell,
    meta: {
      type: "text",
      required: true,
      pattern: "^[a-zA-Z ]+$",
    },
  }),
  columnHelper.accessor("no_telepon", {
    header: "No Tlp",
    size: 300,
    cell: TableCell,
    meta: {
      type: "text",
      required: true,
      pattern: "^[a-zA-Z ]+$",
    },
  }),
  columnHelper.accessor("no_hp", {
    header: "No Hp",
    size: 300,
    cell: TableCell,
    meta: {
      type: "text",
      required: true,
      pattern: "^[a-zA-Z ]+$",
    },
  }),
  columnHelper.accessor("no_ktp", {
    header: "No Ktp",
    size: 300,
    cell: TableCell,
    meta: {
      type: "text",
      required: true,
      pattern: "^[a-zA-Z ]+$",
    },
  }),
  columnHelper.accessor("no_sim", {
    header: "No SIM",
    size: 300,
    cell: TableCell,
    meta: {
      type: "text",
      required: true,
      pattern: "^[a-zA-Z ]+$",
    },
  }),
  columnHelper.accessor("email", {
    header: "Email",
    size: 300,
    cell: TableCell,
    meta: {
      type: "text",
      required: true,
      pattern: "^[a-zA-Z ]+$",
    },
  }),
  columnHelper.accessor("no_npwp", {
    header: "No NPWP",
    size: 300,
    cell: TableCell,
    meta: {
      type: "text",
      required: true,
      pattern: "^[a-zA-Z ]+$",
    },
  }),
  columnHelper.accessor("status_ptkp", {
    header: "Status PTKP",
    size: 300,
    cell: TableCell,
    meta: {
      type: "text",
      required: true,
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
      pattern: "^[a-zA-Z ]+$",
    },
  }),
  columnHelper.display({
    id: "edit",
    size: 10,
    cell: EditCell,
  }),
];
