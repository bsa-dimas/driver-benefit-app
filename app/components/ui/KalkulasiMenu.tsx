import React from "react";
import { Periode } from "../models/periode_model";

export default function KalkulasiMenu({
  onChangePeriode,
  dataPeriode,
  postDataToTransaksi,
  postDraftData,
}: any) {
  return (
    <div className="flex gap-2 border p-2">
      <select
        className="select select-bordered select-sm"
        defaultValue={""}
        onChange={onChangePeriode}
      >
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
      </select>
      <button
        className="btn btn-sm btn-outline btn-primary"
        onClick={postDataToTransaksi}
      >
        Kalkulasi Perhitungan
      </button>
      <button
        className="btn btn-sm btn-outline btn-success"
        onClick={postDraftData}
      >
        Posting Draft Data
      </button>
    </div>
  );
}
