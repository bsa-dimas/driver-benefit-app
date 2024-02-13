import { Button, FileInput } from "flowbite-react";
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
        <FileInput name="file" onChange={onChange} sizing="sm" />
        <Button size="xs" color="light" onClick={onSubmitImportFile}>
          <BsFileEarmarkExcelFill />
          Import
        </Button>
      </div>
      <Button size="xs" color="light" onClick={onClickExport}>
        <BsFileEarmarkExcelFill />
        Export
      </Button>
    </div>
  );
}
