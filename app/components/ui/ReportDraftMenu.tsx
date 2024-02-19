import { Button, Select as SelectFlowBite } from "flowbite-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BsFileEarmarkExcelFill } from "react-icons/bs";
import { FaFilePdf } from "react-icons/fa";
import CredentialReportFetch from "../lib/CredentialReportFetch";
import { Periode } from "../models/periode_model";
import Select from "react-select";

export default function ReportDraftMenu({ dataPeriodeAll }: any) {
  const [report, setReport] = useState();
  const onChange = (e: any) => {
    setReport(e.target.value);
  };

  const [periode, setPeriode] = useState();
  const onChangePeriode = (e: any) => {
    setPeriode(e.target.value);
  };

  return (
    <div className="flex gap-2">
      <SelectFlowBite sizing="sm" required onChange={onChange}>
        <option key={0} value="" className="p-2">
          Pilih Report By
        </option>
        <option key={1} value="draft" className="p-2">
          Draft Data
        </option>
        <option key={2} value="final" className="p-2">
          Final Data
        </option>
      </SelectFlowBite>

      {/* <Select
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
          }),
        }}
        options={dataPeriodeAll}
      /> */}

      <SelectFlowBite sizing="sm" required onChange={onChangePeriode}>
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
      </SelectFlowBite>
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
      <Button
        size="xs"
        color="light"
        href={`${process.env.NEXT_PUBLIC_URL_WEB}/download-template-draft-transaksi?by=${report}`}
        target="_blank"
      >
        <BsFileEarmarkExcelFill /> Kalkulasi Perhitungan
      </Button>
    </div>
  );
}
