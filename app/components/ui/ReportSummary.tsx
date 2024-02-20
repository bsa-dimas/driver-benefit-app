import { Select, Button } from "flowbite-react";
import React, { useState } from "react";
import { FaFilePdf } from "react-icons/fa";
import { Periode } from "../models/periode_model";
import usePeriode from "../repository/usePeriode";

export default function ReportSummary() {
  const report = 1; //final

  const { data: dataPeriodeAll } = usePeriode();

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
        {dataPeriodeAll.map((periode: Periode, index: number) => {
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
        Pdf Summary By Dept
      </Button>
      <Button
        size="xs"
        color="light"
        href={`${process.env.NEXT_PUBLIC_URL_WEB}/report-draft-by-nik-pdf?by=${report}&periode_id=${periode}`}
        target="_blank"
      >
        <FaFilePdf />
        Pdf Summary By NIK
      </Button>
      <Button
        size="xs"
        color="light"
        href={`${process.env.NEXT_PUBLIC_URL_WEB}/report-draft-by-nik-pdf?by=${report}&periode_id=${periode}`}
        target="_blank"
      >
        <FaFilePdf />
        Pdf Slip Gaji By NIK
      </Button>
    </div>
  );
}
