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
import { Setting } from "@/app/components/models/setting_model";
import useSetting from "@/app/components/repository/useSetting";
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
  } = useSetting();

  const [rowSelection, setRowSelection] = React.useState({});
  const [data, setData] = useState<Setting[]>([]);
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
  const [table, setTable] = useState<Table<Setting>>();
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
      id: false,
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
      removeSelectedRows: (selectedRows: number[]) => {
        setRowIdForDelete(selectedRows);
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

    const newData: Setting = {
      id: "",
      name: event.target.name.value,
      string_1: event.target.string_1.value,
      string_2: event.target.string_2.value,
      string_3: event.target.string_3.value,
      keterangan: event.target.keterangan.value,
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
      return;
    }

    setNotification(null);

    setData([...originalData]);
  }, [isValidating, error, initTable, originalData]);

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
              name: "name",
              type: "text",
              required: true,
            },
            {
              name: "string_1",
              type: "text",
              required: true,
            },
            {
              name: "string_2",
              type: "text",
              required: true,
            },
            {
              name: "string_3",
              type: "text",
              required: true,
            },
            {
              name: "keterangan",
              type: "text",
              required: true,
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
