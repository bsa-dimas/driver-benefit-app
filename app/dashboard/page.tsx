"use client";

import React, { Suspense } from "react";
import { useSession, signOut } from "next-auth/react";
import { CardSkeleton } from "../components/ui/Skeleton";
import CardView from "../components/ui/CardView";
import LatesSopirByAmount from "../components/ui/LatesSopirByAmount";

export default function Dashboard() {
  const { data: session } = useSession();

  return (
    <div className="text-gray-900 dark:text-white">
      <div className="p-2">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Suspense fallback={<CardSkeleton />}>
            <CardView
              title={"Pendapatan Distribusi"}
              value={"123"}
              type={"invoices"}
            ></CardView>
            <CardView
              title={"Pendapatan Trucking"}
              value={"123"}
              type={"invoices"}
            ></CardView>
            <CardView
              title={"Pendapatan Bersih"}
              value={"123"}
              type={"invoices"}
            ></CardView>
            <CardView
              title={"Potongan"}
              value={"123"}
              type={"invoices"}
            ></CardView>
          </Suspense>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
          <LatesSopirByAmount />
          <LatesSopirByAmount />
          {/* <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>
        <Suspense fallback={<InvoiceSkeleton />}>
          <LatestInvoices />
        </Suspense> */}
        </div>
      </div>
    </div>
  );
}
