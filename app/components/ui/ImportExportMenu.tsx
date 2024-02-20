import { Button, FileInput } from "flowbite-react";
import Link from "next/link";
import React from "react";
import { BsFileEarmarkExcelFill } from "react-icons/bs";

export default function ImportExportMenu({
  onSubmitImportFile,
  onChange,
  onClickExport,
  isLoading,
}: any) {
  return (
    <div className="flex gap-2">
      <div className="flex gap-2">
        <FileInput name="file" sizing="sm" onChange={onChange} />
        <Button
          size="xs"
          color="light"
          onClick={onSubmitImportFile}
          isProcessing={isLoading}
        >
          <BsFileEarmarkExcelFill />
          Import
        </Button>
      </div>
      {/* <Button size="xs" color="light" onClick={onClickExport}>
        <BsFileEarmarkExcelFill />
        Export
      </Button> */}
      <Button
        size="xs"
        color="light"
        href={`${process.env.NEXT_PUBLIC_URL_WEB}/download-template-draft-transaksi`}
        target="_blank"
      >
        <BsFileEarmarkExcelFill />
        Template File Import
      </Button>
    </div>
  );
}
