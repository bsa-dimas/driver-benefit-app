"use client";

import usePeriode from "@/app/components/repository/usePeriode";
import ReportDraftMenu from "@/app/components/ui/ReportDraftMenu";
import React from "react";

export default function Print() {
  return (
    <div className="p-5 overflow-x-auto">
      <table className="border w-max">
        <thead>
          <tr>
            <th className="w-[500px]">id</th>
            <th className="w-[1000px]">nama</th>
            <th className="w-[1000px]">nama</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>dimas</td>
            <td>dimas</td>
          </tr>
          <tr>
            <td>1</td>
            <td>dimas</td>
            <td>dimas</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
