import React, { Suspense } from "react";
import DataTable from "./DataTable";
import SkeletonCoreTable from "@/app/components/ui/SkeletonCoreTable";

export default function Page() {
  return (
    <div className="">
      <Suspense fallback={<SkeletonCoreTable />}>
        <DataTable />
      </Suspense>
    </div>
  );
}
