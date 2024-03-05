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
import CreateForm, { FieldSelect } from "@/app/components/lib/CreateForm";
import ModalDelete from "@/app/components/ui/ModalDelete";
import useSopir from "@/app/components/repository/useSopir";
import { FaLaptopHouse } from "react-icons/fa";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import useDepartemen from "@/app/components/repository/useDepartemen";
import { Departemen } from "@/app/components/models/departemen_model";
import CredentialFetch from "@/app/components/lib/CredentialFetch";
import IndeterminateCheckbox from "@/app/components/ui/IndeterminateCheckbox";
import { TableCell } from "@/app/components/ui/TableCell";
import { EditCell } from "@/app/components/ui/EditCell";

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

  const { data: dataDept } = useDepartemen();

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
  const [errorBE, setErrorBE] = useState<string[]>();
  const [selectDept, setSelectDept] = useState<FieldSelect[]>([]);

  const getDataDept = async () => {
    const data = await CredentialFetch("/departemen", {});
    if (data.ok) {
      const json = await data.json();
      let arr: FieldSelect[] = [];
      json.map((departmen: Departemen, index: number) => {
        const dept = {
          id: departmen.id,
          value: departmen.nama_departemen,
        };
        arr.push(dept);
      });

      setSelectDept(arr);
    }
  };

  useEffect(() => {
    getDataDept();
  }, []);

  const handleNotif = (data: any) => {
    if (data.errors) {
      let errorString = "";
      Object.keys(data.errors).forEach((key) => {
        data.errors[key].map((err: string, index: number) => {
          errorString += err + "\n";
        });
      });

      setNtCrud({
        title: "Error",
        msg: errorString,
        type: "error",
      });
    } else {
      setNtCrud({
        title: data.message.includes("Error") ? "Error" : "Message",
        msg: data.message,
        type: data.message.includes("Error") ? "error" : "message",
      });
    }

    setTimeout(() => {
      setNtCrud(null);
    }, 5000);
  };

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  useEffect(() => {
    setColumnVisibility({
      id: false,
      // email: false,
      // no_npwp: false,
      // status_ptkp: false,
      // alamat: false,
      // no_telepon: false,
      // no_hp: false,
      // no_ktp: false,
      // no_sim: false,
      // no_rekening: false,
      // cabang_bank: false,
      // keterangan: false,
      // tgl_masa_berlaku_sim: false,
    });
  }, []);

  const columnHelper = createColumnHelper<Sopir>();

  const columns = [
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
      size: 100,
      cell: TableCell,
      meta: {
        disabled: true,
        type: "number",
      },
    }),
    columnHelper.accessor("nik", {
      header: "NIM",
      size: 100,
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
    columnHelper.accessor("nama_departemen", {
      header: "Departemen",
      size: 100,
      cell: TableCell,
      meta: {
        type: "select",
        options: selectDept,
        required: true,
        pattern: "^[a-zA-Z ]+$",
      },
    }),
    columnHelper.accessor("tgl_lahir", {
      header: "Tanggal Lahir",
      size: 100,
      cell: TableCell,
      meta: {
        type: "date",
        required: true,
      },
    }),
    columnHelper.accessor("tgl_gabung", {
      header: "Tanggal Gabung",
      size: 100,
      cell: TableCell,
      meta: {
        type: "date",
        required: true,
      },
    }),
    columnHelper.accessor("tgl_keluar", {
      header: "Tanggal Keluar",
      size: 100,
      cell: TableCell,
      meta: {
        type: "date",
        required: true,
      },
    }),
    columnHelper.accessor("bank", {
      header: "Bank",
      size: 100,
      cell: TableCell,
      meta: {
        type: "text",
        required: true,
        pattern: "^[a-zA-Z ]+$",
      },
    }),
    columnHelper.accessor("cabang_bank", {
      header: "Cabang Bank",
      size: 100,
      cell: TableCell,
      meta: {
        type: "text",
        required: true,
        pattern: "^[a-zA-Z ]+$",
      },
    }),
    columnHelper.accessor("no_rekening", {
      header: "No. Rek",
      size: 100,
      cell: TableCell,
      meta: {
        type: "text",
        required: true,
        pattern: "^[a-zA-Z ]+$",
      },
    }),
    columnHelper.accessor("alamat", {
      header: "Alamat",
      size: 500,
      cell: TableCell,
      meta: {
        type: "text",
        required: true,
        pattern: "^[a-zA-Z ]+$",
      },
    }),
    columnHelper.accessor("no_telepon", {
      header: "No Tlp",
      size: 100,
      cell: TableCell,
      meta: {
        type: "text",
        required: true,
        pattern: "^[a-zA-Z ]+$",
      },
    }),
    columnHelper.accessor("no_hp", {
      header: "No Hp",
      size: 100,
      cell: TableCell,
      meta: {
        type: "text",
        required: true,
        pattern: "^[a-zA-Z ]+$",
      },
    }),
    columnHelper.accessor("no_ktp", {
      header: "No Ktp",
      size: 100,
      cell: TableCell,
      meta: {
        type: "text",
        required: true,
        pattern: "^[a-zA-Z ]+$",
      },
    }),
    columnHelper.accessor("no_sim", {
      header: "No SIM",
      size: 100,
      cell: TableCell,
      meta: {
        type: "text",
        required: true,
        pattern: "^[a-zA-Z ]+$",
      },
    }),
    columnHelper.accessor("tgl_masa_berlaku_sim", {
      header: "Tanggal Berlaku SIM",
      size: 100,
      cell: TableCell,
      meta: {
        type: "date",
        required: true,
      },
    }),
    columnHelper.accessor("email", {
      header: "Email",
      size: 100,
      cell: TableCell,
      meta: {
        type: "text",
        required: true,
        pattern: "^[a-zA-Z ]+$",
      },
    }),
    columnHelper.accessor("no_npwp", {
      header: "No NPWP",
      size: 100,
      cell: TableCell,
      meta: {
        type: "text",
        required: true,
        pattern: "^[a-zA-Z ]+$",
      },
    }),
    columnHelper.accessor("status_ptkp", {
      header: "Status PTKP",
      size: 100,
      cell: TableCell,
      meta: {
        type: "text",
        required: true,
        pattern: "^[a-zA-Z ]+$",
      },
    }),
    columnHelper.accessor("keterangan", {
      header: "Keterangan",
      size: 500,
      cell: TableCell,
      meta: {
        type: "text",
        required: true,
        pattern: "^[a-zA-Z ]+$",
      },
    }),
    columnHelper.display({
      id: "edit",
      size: 100,
      cell: EditCell,
    }),
  ];

  const initTable = useReactTable({
    data,
    columns,
    enableRowSelection: true,
    autoResetPageIndex,
    autoResetAll: false,
    defaultColumn: {
      // size: 100, //starting column size
      minSize: 100, //enforced during column resizing
      // maxSize: 500, //enforced during column resizing
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

    const newData: Sopir = {
      id: "",
      nama: event.target.nama.value,
      tgl_gabung: event.target.tgl_gabung.value,
      tgl_keluar: event.target.tgl_keluar.value,
      bank: event.target.bank.value,
      no_rekening: event.target.no_rekening.value,
      cabang_bank: "-",
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
      tgl_lahir: event.target.tgl_lahir.value,
      keterangan: event.target.keterangan.value,
      tgl_masa_berlaku_sim: event.target.tgl_masa_berlaku_sim.value,
    };
    // addRow(newData).then((data) => {
    //   console.log(data.errors);
    //   if (data.errors) {
    //     console.log(data.errors);
    //     setErrorBE(data.errors);
    //   } else {
    //     handleNotif(data);
    //   }
    // });
    // .finally(() => setModal(false));

    const data = await addRow(newData);
    if (data.errors) {
      setErrorBE(data.errors);
    } else {
      setModal(false);
      handleNotif(data);
    }
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

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Buffer to store the generated Excel file
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });

    saveAs(blob, "data.xlsx");
  };

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
          errorBE={errorBE}
          fields={[
            {
              name: "nik",
              label: "NIM",
              type: "text",
              required: false,
            },
            {
              label: "Nama",
              name: "nama",
              type: "text",
              required: false,
            },
            {
              label: "Tanggal Lahir",
              name: "tgl_lahir",
              type: "date",
              required: false,
            },
            {
              name: "dept_id",
              type: "select",
              dataSelect: selectDept,
              label: "Pilih Departemen",
              required: false,
            },
            {
              label: "Tanggal Gabung",
              name: "tgl_gabung",
              type: "date",
              required: false,
            },
            {
              label: "Tanggal Keluar",
              name: "tgl_keluar",
              type: "date",
              required: false,
            },
            {
              label: "Bank",
              name: "bank",
              default: "Bank Sinarmas",
              type: "text",
              required: false,
            },
            {
              label: "No Rekening",
              name: "no_rekening",
              type: "text",
              default: "0",
              required: false,
            },
            {
              label: "Alamat",
              name: "alamat",
              type: "text",
              required: false,
            },
            {
              label: "No HP",
              name: "no_hp",
              type: "text",
              required: false,
            },
            {
              label: "No KTP",
              name: "no_ktp",
              type: "text",
              required: false,
            },
            {
              label: "No SIM",
              name: "no_sim",
              type: "text",
              required: false,
            },
            {
              label: "Tanggal Berlaku SIM",
              name: "tgl_masa_berlaku_sim",
              type: "date",
              required: false,
            },
            {
              label: "No Telpon",
              name: "no_telepon",
              type: "text",
              required: false,
            },
            {
              label: "Email",
              name: "email",
              type: "email",
              required: false,
            },
            {
              label: "No NPWP",
              name: "no_npwp",
              type: "text",
              required: false,
            },
            {
              label: "Status PTKP",
              name: "status_ptkp",
              type: "text",
              required: false,
            },
            {
              label: "Keterangan",
              name: "keterangan",
              type: "text",
              required: false,
            },
          ]}
          onSubmit={(e) => {
            submitForm(e);
            // setErrorBE(["name", "error"]);
          }}
          isOpen={modal}
          closeModal={closeModal}
        />

        <div className="flex flex-col gap-2">
          <StandartMenu
            onClickAdd={() => {
              setErrorBE([]);
              setModal(true);
            }}
            table={table}
            onExportExcel={exportToExcel}
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
