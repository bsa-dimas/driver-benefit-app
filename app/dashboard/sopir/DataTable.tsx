"use client";

import {
  TbArrowsSort,
  TbSortAscending,
  TbSortDescending,
} from "react-icons/tb";
import {
  Column,
  ColumnDef,
  ColumnFiltersState,
  FilterFn,
  RowData,
  RowModel,
  SortingFn,
  SortingState,
  Table,
  TableOptions,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  sortingFns,
  useReactTable,
} from "@tanstack/react-table";
import React, { HTMLProps, Suspense, useEffect, useState } from "react";

import {
  RankingInfo,
  rankItem,
  compareItems,
} from "@tanstack/match-sorter-utils";
import { columns } from "./table/columns";
import { Sopir } from "@/app/components/models/sopir_model";
import DebouncedInput from "@/app/components/ui/DebuncedInput";
import MenuItem from "@/app/components/ui/MenuItem";
import NotificationBottom from "@/app/components/ui/NotificationBottom";
import SearchBar from "@/app/components/ui/SearchBar";
import BottomTable from "@/app/components/ui/BottomTable";
import CoreDataTable, {
  VisibilityState,
} from "@/app/components/ui/CoreDataTable";
import SkeletonCoreTable from "@/app/components/ui/SkeletonCoreTable";
import StandartMenu from "@/app/components/ui/StandartMenu";
import CreateForm from "@/app/components/lib/CreateForm";
import ModalDelete from "@/app/components/ui/ModalDelete";
import useSopir from "@/app/components/repository/useSopir";
import { FaLaptopHouse } from "react-icons/fa";

declare module "@tanstack/table-core" {
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
  interface FilterMeta {
    itemRank: RankingInfo;
  }
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

function useSkipper() {
  const shouldSkipRef = React.useRef(true);
  const shouldSkip = shouldSkipRef.current;

  // Wrap a function with this to skip a pagination reset temporarily
  const skip = React.useCallback(() => {
    shouldSkipRef.current = false;
  }, []);

  React.useEffect(() => {
    shouldSkipRef.current = true;
  });

  return [shouldSkip, skip] as const;
}

declare module "@tanstack/table-core" {
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
  interface FilterMeta {
    itemRank: RankingInfo;
  }
}

export default function DataTable() {
  const {
    data: originalData,
    isValidating,
    error,
    addRow,
    updateRow,
    deleteRow,
  } = useSopir();

  const [rowSelection, setRowSelection] = React.useState({});
  const [data, setData] = useState<Sopir[]>([]);
  const [editedRows, setEditedRows] = React.useState({});
  const [validRows, setValidRows] = useState({});
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper();
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [notification, setNotification] = useState<any>();
  const [ntCrud, setNtCrud] = useState<any>();
  const [table, setTable] = useState<Table<Sopir>>();
  const [modal, setModal] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [rowIdForDelete, setRowIdForDelete] = useState<any>(null);
  const handleNotif = (data: any) => {
    setNtCrud({
      title: data.message.includes("Error") ? "Error" : "Message",
      msg: data.message,
      type: data.message.includes("Error") ? "error" : "message",
    });

    setTimeout(() => {
      setNtCrud(null);
    }, 5000);
  };

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  useEffect(() => {
    setColumnVisibility({
      alamat: false,
      no_telepon: false,
      no_hp: false,
      no_ktp: false,
      no_sim: false,
      no_rekening: false,
      cabang_bank: false,
    });
  }, []);

  const initTable = useReactTable({
    data,
    columns,
    enableRowSelection: true,
    autoResetPageIndex,
    autoResetAll: false,
    defaultColumn: {
      size: 100, //starting column size
      minSize: 5, //enforced during column resizing
      maxSize: 500, //enforced during column resizing
    },
    meta: {
      editedRows,
      setEditedRows,
      validRows,
      setValidRows,
      revertData: (rowIndex: number) => {
        setData((old) =>
          old.map((row, index) =>
            index === rowIndex ? originalData[rowIndex] : row
          )
        );
      },
      updateRow: (rowIndex: number) => {
        updateRow(data[rowIndex].id, data[rowIndex]).then((data) =>
          handleNotif(data)
        );
      },
      updateData: (
        rowIndex: number,
        columnId: string,
        value: string,
        isValid: boolean
      ) => {
        setData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex],
                [columnId]: value,
              };
            }
            return row;
          })
        );
        setValidRows((old: any) => ({
          ...old,
          [rowIndex]: { ...old[rowIndex], [columnId]: isValid },
        }));
      },
      addRow: () => {},
      removeRow: (rowIndex: number) => {
        setRowIdForDelete(rowIndex);
        setModalDelete(true);
      },
    },
    state: {
      sorting,
      globalFilter,
      rowSelection,
      columnVisibility,
    },
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    filterFns: {
      fuzzy: fuzzyFilter,
    },
  });

  const submitForm = async (event: any) => {
    event.preventDefault();

    const newData: Sopir = {
      id: "",
      nama: event.target.nama.value,
      tgl_gabung: event.target.tgl_gabung.value,
      tgl_keluar: event.target.tgl_keluar.value,
      bank: event.target.bank.value,
      no_rekening: event.target.no_rekening.value,
      cabang_bank: event.target.cabang_bank.value,
      alamat: event.target.alamat.value,
      no_hp: event.target.no_hp.value,
      no_ktp: event.target.no_ktp.value,
      no_sim: event.target.no_sim.value,
      no_telepon: event.target.no_telepon.value,
      dept_id: event.target.dept_id.value,
      nik: event.target.nik.value,
      email: event.target.email.value,
      no_npwp: event.target.no_npwp.value,
      status_ptkp: event.target.status_ptkp.value,
    };
    addRow(newData)
      .then((data) => handleNotif(data))
      .finally(() => setModal(false));
  };

  const submitFormDelete = async (id: number) => {
    deleteRow(data[id].id)
      .then((data) => handleNotif(data))
      .finally(() => {
        setRowIdForDelete(null);
        setModalDelete(false);
      });
  };

  const closeModal = () => {
    setModal(false);
  };

  const closeModalDelete = () => {
    setModalDelete(false);
  };

  useEffect(() => {
    setTable(initTable);
  }, [initTable]);

  useEffect(() => {
    if (isValidating) {
      return;
    }
    if (error) {
      setNotification({
        title: "Error",
        msg: "Failed connect to server!",
        type: "error",
      });
      console.log("error view...");
      return;
    }

    setNotification(null);

    setData([...originalData]);
  }, [isValidating, error, initTable]);

  return (
    table && (
      <div className="flex flex-col p-2">
        {notification && <NotificationBottom {...notification} />}

        <ModalDelete
          onSubmit={() => {
            submitFormDelete(rowIdForDelete);
          }}
          isOpen={modalDelete}
          closeModal={closeModalDelete}
        />

        <CreateForm
          fields={[
            {
              name: "nama",
              type: "text",
              required: true,
            },
            {
              name: "tgl_gabung",
              type: "text",
              required: true,
            },
            {
              name: "tgl_keluar",
              type: "text",
              required: false,
            },
            {
              name: "bank",
              type: "text",
              required: true,
            },
            {
              name: "no_rekening",
              type: "text",
              required: true,
            },
            {
              name: "cabang_bank",
              type: "text",
              required: true,
            },
            {
              name: "alamat",
              type: "text",
              required: true,
            },
            {
              name: "no_hp",
              type: "text",
              required: false,
            },
            {
              name: "no_ktp",
              type: "text",
              required: true,
            },
            {
              name: "no_sim",
              type: "text",
              required: true,
            },
            {
              name: "no_telepon",
              type: "text",
              required: false,
            },
            {
              name: "dept_id",
              type: "number",
              required: false,
            },
            {
              name: "nik",
              type: "text",
              required: false,
            },
            {
              name: "email",
              type: "email",
              required: false,
            },
            {
              name: "no_npwp",
              type: "text",
              required: false,
            },
            {
              name: "status_ptkp",
              type: "text",
              required: false,
            },
          ]}
          onSubmit={submitForm}
          isOpen={modal}
          closeModal={closeModal}
        />

        <div className="flex flex-col overflow-x-auto gap-2">
          <StandartMenu
            onClickAdd={() => {
              setModal(true);
            }}
            table={table}
            searchValue={globalFilter ?? ""}
            onChange={(value: any) => setGlobalFilter(String(value))}
            isFiturCrud={true}
          />
          <CoreDataTable table={table} />
          <BottomTable table={table} />
        </div>

        {ntCrud && <NotificationBottom {...ntCrud} />}
      </div>
    )
  );
}
