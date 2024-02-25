import { Button, Select } from "flowbite-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BsFileEarmarkExcelFill } from "react-icons/bs";
import { FaFilePdf } from "react-icons/fa";
import CredentialReportFetch from "../lib/CredentialReportFetch";
import { Periode } from "../models/periode_model";
import usePeriode from "../repository/usePeriode";
import { useSession } from "next-auth/react";
import { Departemen } from "../models/departemen_model";
import useDepartemen from "../repository/useDepartemen";
import CredentialFetch from "../lib/CredentialFetch";

export default function ReportDraftMenu() {
  const session = useSession();
  const { dataDraftTransaksi: dataPeriode } = usePeriode();
  const { data: dataDepartemen } = useDepartemen();
  const [periode, setPeriode] = useState();
  const [departemen, setDepartemen] = useState<Departemen>();

  const report = "draft";

  const onChange = (e: any) => {
    setPeriode(e.target.value);
  };

  const onChangeDepartemen = (e: any) => {
    const index = e.target.selectedIndex;
    setDepartemen({
      id: e.target.value,
      nama_departemen: e.target[index].text,
    });
  };

  const downloadFile = async () => {
    const data = await fetch("/api/pdf/dept");
    const json = await data.json();
    return console.log(json);
  };

  return (
    <div className="flex gap-2">
      <Select sizing="sm" required onChange={onChangeDepartemen}>
        <option key={0} value="">
          Pilih Departemen
        </option>
        {dataDepartemen.map((departemen: Departemen, index: number) => {
          return (
            <option key={index} value={departemen.id} className="p-2">
              {`${departemen.nama_departemen}`}
            </option>
          );
        })}
      </Select>
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
        onClick={downloadFile}
        // href={`${process.env.NEXT_PUBLIC_URL_WEB}/report-draft-by-departemen-pdf?by=${report}&periode_id=${periode}&key=${session.data?.key}`}
        // target="_blank"
      >
        <FaFilePdf />
        Pdf By Dept
      </Button>
      <Button
        size="xs"
        color="light"
        href={`${process.env.NEXT_PUBLIC_URL_WEB}/report-draft-by-nik-pdf?by=${report}&dept_id=${departemen?.id}&dept_name=${departemen?.nama_departemen}&periode_id=${periode}&key=${session.data?.key}`}
        target="_blank"
      >
        <FaFilePdf />
        Pdf By NIM
      </Button>
    </div>
  );
}
