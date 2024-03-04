import React from "react";
import { Periode } from "../models/periode_model";
import { Button, Select } from "flowbite-react";
import ReportDraftMenu from "./ReportDraftMenu";

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
      <div className="border rounded-xl">
        <div className="px-2 text-xs w-fit ml-5 -mt-2 text-gray-900 dark:text-white bg-gray-50 dark:bg-slate-900">
          Kalkulasi
        </div>
        <div className="flex p-2 gap-2 ">
          <Select
            sizing="sm"
            name="periode"
            disabled
            onChange={onChangePeriode}
          >
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
        </div>
      </div>
      <ReportDraftMenu periodeId={dataPeriode[0].id} />
      <Button size="xs" onClick={postDraftData} isProcessing={isLoadingPosting}>
        Posting Draft Data
      </Button>
    </div>
  );
}
