import React from "react";
import DebouncedInput from "./DebuncedInput";
import Link from "next/link";
import { BsFileEarmarkExcelFill } from "react-icons/bs";
import { usePathname } from "next/navigation";
import { FaFilePdf } from "react-icons/fa";
import { Checkbox, Dropdown, Label } from "flowbite-react";

export default function MenuItem({
  table,
  data,
  fiturBtnAdd = true,
  onClickAdd,
  fiturRemoveBtn = true,
  fiturImport,
  fiturExport,
  fiturPdf,
  onSubmitImportFile,
  onChange,
  onClickExport,
  linkPdfUrl,
  titlePdf,
  linkPdfUrl2,
  titlePdf2,
  linkPdfUrl3,
  titlePdf3,
}: any) {
  const meta = table.options.meta;
  const selectedRows = table.getSelectedRowModel().rows;
  const pathname = usePathname();

  const removeRows = () => {
    meta.removeSelectedRows(
      table.getSelectedRowModel().rows.map((row: any) => row.index)
    );
    table.resetRowSelection();
  };

  return (
    <div>
      <div className="mb-2">
        <div className="flex flex-col gap gap-2">
          <div className="flex gap gap-2">
            {fiturImport ? (
              <div className="flex gap-2">
                <input
                  className="file-input file-input-bordered file-input-sm w-full max-w-xs"
                  type="file"
                  name="file"
                  onChange={onChange}
                />
                <button
                  className="btn btn-sm btn-outline btn-accent"
                  onClick={onSubmitImportFile}
                >
                  <BsFileEarmarkExcelFill />
                  Import Draft Data
                </button>
              </div>
            ) : (
              <div></div>
            )}
            {fiturExport ? (
              <button className="btn btn-sm" onClick={onClickExport}>
                <BsFileEarmarkExcelFill />
                Export
              </button>
            ) : (
              <div></div>
            )}
          </div>

          <div className="flex gap gap-2">
            {fiturBtnAdd ? (
              <button
                className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                onClick={onClickAdd}
              >
                Add
              </button>
            ) : (
              <></>
            )}
            {selectedRows.length > 0 ? (
              <button className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                Remove
              </button>
            ) : fiturRemoveBtn ? (
              <button
                className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                disabled
              >
                Remove
              </button>
            ) : (
              <></>
            )}
            {fiturPdf ? (
              <Link
                className="btn btn-sm"
                href={`${linkPdfUrl}`}
                target="_blank"
              >
                <FaFilePdf />
                {titlePdf}
              </Link>
            ) : (
              <></>
            )}

            {fiturPdf ? (
              <Link
                className="btn btn-sm"
                href={`${linkPdfUrl2}`}
                target="_blank"
              >
                <FaFilePdf />
                {titlePdf2}
              </Link>
            ) : (
              <></>
            )}

            {fiturPdf ? (
              <Link
                className="btn btn-sm"
                href={`${linkPdfUrl3}`}
                target="_blank"
              >
                <BsFileEarmarkExcelFill />
                {titlePdf3}
              </Link>
            ) : (
              <></>
            )}

            <div>
              <Dropdown color="light" label="Column" dismissOnClick={false}>
                <Dropdown.Header>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="header"
                      {...{
                        checked: table.getIsAllColumnsVisible(),
                        onChange: table.getToggleAllColumnsVisibilityHandler(),
                      }}
                    />
                    <Label htmlFor="header">All</Label>
                  </div>
                </Dropdown.Header>
                {table.getAllLeafColumns().map((column: any, i: number) => {
                  return (
                    <Dropdown.Item key={column.id}>
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id={column.id}
                          {...{
                            checked: column.getIsVisible(),
                            onChange: column.getToggleVisibilityHandler(),
                          }}
                        />
                        <Label htmlFor={column.id}>{column.id}</Label>
                      </div>
                    </Dropdown.Item>
                  );
                })}
              </Dropdown>
            </div>
          </div>

          {/* <ExportExcel excelData={data} fileName={"Excel Export"} /> */}
          {/* <CSVDownload data={data} target="_blank" /> */}
          {/* <CSVLink
            data={data}
            filename={"my-file.csv"}
            className="btn btn-sm"
            target="_blank"
          >
            Export CSV
          </CSVLink> */}
        </div>
      </div>
    </div>
  );
}
