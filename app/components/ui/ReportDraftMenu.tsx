import { Button, Select } from "flowbite-react";
import Link from "next/link";
import React from "react";
import { BsFileEarmarkExcelFill } from "react-icons/bs";
import { FaFilePdf } from "react-icons/fa";

export default function ReportDraftMenu() {
  return (
    <div className="flex gap-2">
      <Select sizing="sm" id="countries" required>
        <option key={1} value="draft">
          Draft Data
        </option>
        <option key={2} value="final">
          Final Data
        </option>
      </Select>
      <a
        href={`${process.env.NEXT_PUBLIC_URL_WEB}/report-draft-by-departemen-pdf`}
        target="_blank"
      >
        <Button size="xs" color="light">
          <FaFilePdf />
          Pdf By Dept
        </Button>
      </a>
      <a
        href={`${process.env.NEXT_PUBLIC_URL_WEB}/report-draft-by-nik-pdf`}
        target="_blank"
      >
        <Button size="xs" color="light">
          <FaFilePdf />
          Pdf By NIK
        </Button>
      </a>
      <a
        href={`${process.env.NEXT_PUBLIC_URL_WEB}/download-template-draft-transaksi`}
        target="_blank"
      >
        <Button size="xs" color="light">
          <BsFileEarmarkExcelFill /> Kalkulasi Perhitungan
        </Button>
      </a>
    </div>
  );
}
