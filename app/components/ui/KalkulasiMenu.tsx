import React from "react";
import { Periode } from "../models/periode_model";
import { Button, Select } from "flowbite-react";

export default function KalkulasiMenu({
  onChangePeriode,
  dataPeriode,
  postDataToTransaksi,
  postDraftData,
}: any) {
  return (
    <div className="flex gap-2">
      <Select sizing="sm" id="countries" required onChange={onChangePeriode}>
        <option value={""} disabled>
          Plih periode
        </option>
        {dataPeriode &&
          dataPeriode.map((periode: Periode, i: number) => {
            return (
              <option key={i} value={periode.id}>
                {periode.nama_periode}
              </option>
            );
          })}
      </Select>

      <Button size="xs" color="light" onClick={postDataToTransaksi}>
        Kalkulasi Perhitungan
      </Button>
      <Button size="xs" color="light" onClick={postDraftData}>
        Posting Draft Data
      </Button>
    </div>
  );
}
