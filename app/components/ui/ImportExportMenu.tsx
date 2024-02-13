import { Button, FileInput } from "flowbite-react";
import Link from "next/link";
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
        <FileInput name="file" sizing="xs" onChange={onChange} />
        <Button size="xs" color="light" onClick={onSubmitImportFile}>
          <BsFileEarmarkExcelFill />
          Import
        </Button>
      </div>
      <Button size="xs" color="light" onClick={onClickExport}>
        <BsFileEarmarkExcelFill />
        Export
      </Button>
      <Link
        href={`${process.env.NEXT_PUBLIC_URL_WEB}/download-template-draft-transaksi`}
        target="_blank"
      >
        <Button size="xs" color="light">
          <BsFileEarmarkExcelFill />
          Template File Import
        </Button>
      </Link>
    </div>
  );
}
