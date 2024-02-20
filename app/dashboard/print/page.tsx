"use client";

import usePeriode from "@/app/components/repository/usePeriode";
import ReportDraftMenu from "@/app/components/ui/ReportDraftMenu";
import React from "react";

export default function Print() {
  const { data: dataPeriodeAll, dataDraftTransaksi: dataPeriode } =
    usePeriode();

  return <div className="p-5">print</div>;
}
