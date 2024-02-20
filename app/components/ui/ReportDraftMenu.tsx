import { Button, Select } from "flowbite-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BsFileEarmarkExcelFill } from "react-icons/bs";
import { FaFilePdf } from "react-icons/fa";
import CredentialReportFetch from "../lib/CredentialReportFetch";
import { Periode } from "../models/periode_model";
import usePeriode from "../repository/usePeriode";

export default function ReportDraftMenu() {
  const { dataDraftTransaksi: dataPeriode } = usePeriode();

  const report = 1; //draft

  const [periode, setPeriode] = useState();
  const onChange = (e: any) => {
    setPeriode(e.target.value);
  };

  return (
    <div className="flex gap-2">
      <Select sizing="sm" required onChange={onChange}>
        <option key={0} value="">
          Pilih Periode
        </option>
        {dataPeriode?.map((periode: Periode, index: number) => {
          return (
            <option key={index} value={periode.id} className="p-2">
              {`${periode.dari_tanggal} - ${periode.sampai_tanggal}`}
            </option>
          );
        })}
      </Select>
      <Button
        size="xs"
        color="light"
        href={`${process.env.NEXT_PUBLIC_URL_WEB}/report-draft-by-departemen-pdf?by=${report}&periode_id=${periode}`}
        target="_blank"
      >
        <FaFilePdf />
        Pdf By Dept
      </Button>
      <Button
        size="xs"
        color="light"
        href={`${process.env.NEXT_PUBLIC_URL_WEB}/report-draft-by-nik-pdf?by=${report}&periode_id=${periode}`}
        target="_blank"
      >
        <FaFilePdf />
        Pdf By NIK
      </Button>
    </div>
  );
}
