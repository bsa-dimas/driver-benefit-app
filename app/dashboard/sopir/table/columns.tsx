import {
  SortingFn,
  createColumnHelper,
  sortingFns,
} from "@tanstack/react-table";
import React, { HTMLProps, useEffect, useState } from "react";
import { compareItems } from "@tanstack/match-sorter-utils";
import IndeterminateCheckbox from "@/app/components/ui/IndeterminateCheckbox";
import { EditCell } from "@/app/components/ui/EditCell";
import { Sopir } from "@/app/components/models/sopir_model";
import CredentialFetch from "@/app/components/lib/CredentialFetch";
import { Departemen } from "@/app/components/models/departemen_model";
import { TableCell } from "@/app/components/ui/TableCell";

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
    size: 10,
    cell: TableCell,
    meta: {
      type: "text",
      required: true,
      pattern: "^[a-zA-Z ]+$",
    },
  }),
  columnHelper.accessor("nama", {
    header: "Nama",
    size: 500,
    cell: TableCell,
    meta: {
      type: "text",
      required: true,
      pattern: "^[a-zA-Z ]+$",
    },
  }),
  columnHelper.accessor("tgl_gabung", {
    header: "Tanggal Gabung",
    size: 10,
    cell: TableCell,
    meta: {
      type: "text",
      required: true,
      pattern: "^[a-zA-Z ]+$",
    },
  }),
  columnHelper.accessor("tgl_keluar", {
    header: "Tanggal Keluar",
    size: 10,
    cell: TableCell,
    meta: {
      type: "text",
      required: true,
      pattern: "^[a-zA-Z ]+$",
    },
  }),
  columnHelper.accessor("bank", {
    header: "Bank",
    size: 10,
    cell: TableCell,
    meta: {
      type: "text",
      required: true,
      pattern: "^[a-zA-Z ]+$",
    },
  }),
  columnHelper.accessor("cabang_bank", {
    header: "Cabang Bank",
    size: 10,
    cell: TableCell,
    meta: {
      type: "text",
      required: true,
      pattern: "^[a-zA-Z ]+$",
    },
  }),
  columnHelper.accessor("no_rekening", {
    header: "No. Rek",
    size: 10,
    cell: TableCell,
    meta: {
      type: "text",
      required: true,
      pattern: "^[a-zA-Z ]+$",
    },
  }),
  columnHelper.accessor("alamat", {
    header: "Alamat",
    size: 10,
    cell: TableCell,
    meta: {
      type: "text",
      required: true,
      pattern: "^[a-zA-Z ]+$",
    },
  }),
  columnHelper.accessor("no_telepon", {
    header: "No Tlp",
    size: 10,
    cell: TableCell,
    meta: {
      type: "text",
      required: true,
      pattern: "^[a-zA-Z ]+$",
    },
  }),
  columnHelper.accessor("no_hp", {
    header: "No Hp",
    size: 10,
    cell: TableCell,
    meta: {
      type: "text",
      required: true,
      pattern: "^[a-zA-Z ]+$",
    },
  }),
  columnHelper.accessor("no_ktp", {
    header: "No Ktp",
    size: 10,
    cell: TableCell,
    meta: {
      type: "text",
      required: true,
      pattern: "^[a-zA-Z ]+$",
    },
  }),
  columnHelper.accessor("no_sim", {
    header: "No SIM",
    size: 10,
    cell: TableCell,
    meta: {
      type: "text",
      required: true,
      pattern: "^[a-zA-Z ]+$",
    },
  }),
  columnHelper.accessor("email", {
    header: "Email",
    size: 10,
    cell: TableCell,
    meta: {
      type: "text",
      required: true,
      pattern: "^[a-zA-Z ]+$",
    },
  }),
  columnHelper.accessor("no_npwp", {
    header: "No NPWP",
    size: 10,
    cell: TableCell,
    meta: {
      type: "text",
      required: true,
      pattern: "^[a-zA-Z ]+$",
    },
  }),
  columnHelper.accessor("status_ptkp", {
    header: "Status PTKP",
    size: 10,
    cell: TableCell,
    meta: {
      type: "text",
      required: true,
      pattern: "^[a-zA-Z ]+$",
    },
  }),
  columnHelper.accessor("dept_id", {
    header: "Departemen",
    size: 10,
    cell: TableCell,
    meta: {
      type: "select",
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
