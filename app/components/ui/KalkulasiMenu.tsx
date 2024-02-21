import React from "react";
import { Periode } from "../models/periode_model";
import { Button, Select } from "flowbite-react";

export default function KalkulasiMenu({
  onChangePeriode,
  dataPeriode,
  kalkulasiDraftData,
  postDraftData,
  isLoadingKalkulasi,
  isLoadingPosting,
}: any) {
  return (
    <div className="flex gap-2">
      <Select sizing="sm" name="periode" required onChange={onChangePeriode}>
        <option value={""}>Plih periode</option>
        {dataPeriode &&
          dataPeriode.map((periode: Periode, i: number) => {
            return (
              <option key={i} value={periode.id}>
                {periode.nama_periode}
              </option>
            );
          })}
      </Select>

      <Button
        size="xs"
        color="light"
        onClick={kalkulasiDraftData}
        isProcessing={isLoadingKalkulasi}
      >
        Kalkulasi Draft Data
      </Button>
      <Button
        size="xs"
        color="light"
        onClick={postDraftData}
        isProcessing={isLoadingPosting}
      >
        Posting Draft Data
      </Button>
    </div>
  );
}
