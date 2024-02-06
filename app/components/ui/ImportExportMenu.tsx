import React from "react";
import { BsFileEarmarkExcelFill } from "react-icons/bs";

export default function ImportExportMenu({
  onSubmitImportFile,
  onChange,
  onClickExport,
}: any) {
  return (
    <div className="flex gap-2">
      <div className="flex gap-2">
        <input
          className="file-input file-input-bordered file-input-sm w-full max-w-xs"
          type="file"
          name="file"
          onChange={onChange}
        />
        <button className="btn btn-sm" onClick={onSubmitImportFile}>
          <BsFileEarmarkExcelFill />
          Import
        </button>
      </div>
      <button className="btn btn-sm" onClick={onClickExport}>
        <BsFileEarmarkExcelFill />
        Export
      </button>
    </div>
  );
}
