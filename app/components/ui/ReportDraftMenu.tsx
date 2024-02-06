import Link from "next/link";
import React from "react";
import { BsFileEarmarkExcelFill } from "react-icons/bs";
import { FaFilePdf } from "react-icons/fa";

export default function ReportDraftMenu() {
  return (
    <div className="flex gap-2 border p-2">
      <select className="select select-bordered select-sm">
        <option key={1} value="draft">
          Draft Data
        </option>
        <option key={2} value="final">
          Final Data
        </option>
      </select>
      <Link
        className="btn btn-sm"
        href={`${process.env.NEXT_PUBLIC_URL_WEB}/report-draft-by-nik-pdf`}
        target="_blank"
      >
        <FaFilePdf />
        Pdf By NIK
      </Link>
      <Link
        className="btn btn-sm"
        href={`${process.env.NEXT_PUBLIC_URL_WEB}/report-draft-by-departemen-pdf`}
        target="_blank"
      >
        <FaFilePdf />
        Pdf By Departemen
      </Link>
      <Link
        className="btn btn-sm"
        href={`${process.env.NEXT_PUBLIC_URL_WEB}/download-template-draft-transaksi`}
        target="_blank"
      >
        <BsFileEarmarkExcelFill />
        Dowload Template Excel
      </Link>
    </div>
  );
}
