"use client";

import React, { Suspense } from "react";
import { useSession, signOut } from "next-auth/react";
import { CardSkeleton } from "../components/ui/Skeleton";
import CardView from "../components/ui/CardView";
import LatesSopirByAmount from "../components/ui/LatesSopirByAmount";
import useDashBoard, {
  PendapatanSopir,
  TotalDashBoard,
} from "../components/repository/useDashboard";
import DashBoardSkeleton from "../components/ui/DashBoardSkeleton";

function toCurrency(numberString: any) {
  let number = parseFloat(numberString);
  return "Rp. " + number.toLocaleString("ID");
}

export default function Dashboard() {
  const { data: session } = useSession();

  const {
    dataPendapatanSopir: dataPendapatanSopir,
    isValidatingPendapatanSopir: isValidatingPendapatanSopir,
    errorPendapatanSopir: errorPendapatanSopir,

    dataPotonganSopir: dataPotonganSopir,
    isValidatingPotonganSopir: isValidatingPotonganSopir,
    errorPotonganSopir: errorPotonganSopir,

    dataTotal: dataTotal,
    isValidatingTotal: isValidatingTotal,
    errorTotal: errorTotal,
  } = useDashBoard();

  return (
    <div className="text-gray-900 dark:text-white">
      <div className="p-2">
        {/* <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div> */}

        {isValidatingTotal ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 m-auto">
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </div>
        ) : (
          dataTotal.map((data: TotalDashBoard, index: number) => {
            return (
              <div
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 m-auto"
                key={index}
              >
                <CardView
                  title={"Pendapatan Total"}
                  value={toCurrency(data.pendapatantotal)}
                  type={"invoices"}
                />
                <CardView
                  title={"Potongan Total"}
                  value={toCurrency(data.potongantotal)}
                  type={"invoices"}
                />
                <CardView
                  title={"Pendapatan Final"}
                  value={toCurrency(data.pendapatanfinal)}
                  type={"invoices"}
                />
              </div>
            );
          })
        )}

        {/* <Suspense fallback={<CardSkeleton />}>
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
          </Suspense> */}

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
          {isValidatingPendapatanSopir ? (
            <DashBoardSkeleton />
          ) : (
            <LatesSopirByAmount
              title={"Pendapatan Sopir"}
              data={dataPendapatanSopir}
              error={errorPendapatanSopir}
            />
          )}

          {isValidatingPotonganSopir ? (
            <DashBoardSkeleton />
          ) : (
            <LatesSopirByAmount
              title={"Potongan Sopir"}
              data={dataPotonganSopir}
              error={errorPotonganSopir}
            />
          )}

          {/* <Suspense fallback={<DashBoardSkeleton />}>
            <LatesSopirByAmount data={dataPendapatanSopir} />
          </Suspense> */}
        </div>
      </div>
    </div>
  );
}
