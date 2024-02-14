import { Button, Select } from "flowbite-react";
import Link from "next/link";
import React, { useState } from "react";
import { BsFileEarmarkExcelFill } from "react-icons/bs";
import { FaFilePdf } from "react-icons/fa";

export default function ReportDraftMenu() {
  const [report, setReport] = useState();
  const onChange = (e: any) => {
    setReport(e.target.value);
  };
  return (
    <div className="flex gap-2">
      <Select sizing="sm" id="data" required onChange={onChange}>
        <option key={0} value="">
          Pilih Report By
        </option>
        <option key={1} value="draft">
          Draft Data
        </option>
        <option key={2} value="final">
          Final Data
        </option>
      </Select>
      <a
        href={`${process.env.NEXT_PUBLIC_URL_WEB}/report-draft-by-departemen-pdf?by=${report}`}
        target="_blank"
      >
        <Button size="xs" color="light">
          <FaFilePdf />
          Pdf By Dept
        </Button>
      </a>
      <a
        href={`${process.env.NEXT_PUBLIC_URL_WEB}/report-draft-by-nik-pdf?by=${report}`}
        target="_blank"
      >
        <Button size="xs" color="light">
          <FaFilePdf />
          Pdf By NIK
        </Button>
      </a>
      <a
        href={`${process.env.NEXT_PUBLIC_URL_WEB}/download-template-draft-transaksi?by=${report}`}
        target="_blank"
      >
        <Button size="xs" color="light">
          <BsFileEarmarkExcelFill /> Kalkulasi Perhitungan
        </Button>
      </a>
    </div>
  );
}
