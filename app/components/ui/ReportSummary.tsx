import { Select, Button } from "flowbite-react";
import React, { useState } from "react";
import { FaFilePdf } from "react-icons/fa";
import { Periode } from "../models/periode_model";
import usePeriode from "../repository/usePeriode";
import { useSession } from "next-auth/react";
import useDepartemen from "../repository/useDepartemen";
import { Departemen } from "../models/departemen_model";

export default function ReportSummary() {
  const session = useSession();
  const { data: dataPeriodeAll } = usePeriode();
  const { data: dataDepartemen } = useDepartemen();
  const [periode, setPeriode] = useState();
  const [departemen, setDepartemen] = useState<Departemen>();

  const report = "final";

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
        href={`${process.env.NEXT_PUBLIC_URL_WEB}/report-draft-by-departemen-pdf?by=${report}&periode_id=${periode}&key=${session.data?.key}`}
        target="_blank"
      >
        <FaFilePdf />
        Pdf Summary By Dept
      </Button>
      <Button
        size="xs"
        color="light"
        href={`${process.env.NEXT_PUBLIC_URL_WEB}/report-draft-by-nik-pdf?by=${report}&periode_id=${periode}&dept_id=${departemen?.id}&dept_name=${departemen?.nama_departemen}&key=${session.data?.key}`}
        target="_blank"
      >
        <FaFilePdf />
        Pdf Summary By NIK
      </Button>
      <Button
        size="xs"
        color="light"
        href={`${process.env.NEXT_PUBLIC_URL_WEB}/report-slip-gaji-by-periode-pdf?periode_id=${periode}&key=${session.data?.key}`}
        target="_blank"
      >
        <FaFilePdf />
        Pdf Slip Gaji By NIK
      </Button>
    </div>
  );
}
