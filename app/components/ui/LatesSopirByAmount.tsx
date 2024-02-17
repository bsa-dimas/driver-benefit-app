import React from "react";
import Image from "next/image";
import { ArrowPathIcon } from "@heroicons/react/16/solid";
import { PendapatanSopir } from "../repository/useDashboard";
import { Avatar } from "flowbite-react";

function toCurrency(numberString: any) {
  let number = parseFloat(numberString);
  return number.toLocaleString("ID");
}

export default function LatesSopirByAmount({
  title,
  data,
  error,
}: {
  title: string;
  data: PendapatanSopir[];
  error: any;
}) {
  return (
    <div className="flex w-full flex-col md:col-span-4 p-6 bg-gray-100 border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <h2 className={`mb-4 text-xl md:text-2xl`}>{title}</h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4 dark:bg-gray-900 dark:border-gray-500">
        {/* NOTE: comment in this code when you get to this point in the course */}

        <div className="bg-white px-6 dark:bg-gray-900 dark:border-gray-500">
          {JSON.stringify(error)}
          {data.map((sopir, index) => {
            return (
              <div
                key={index}
                className="flex flex-row items-center justify-between py-4"
              >
                <div className="flex items-center gap-2">
                  <Avatar
                    img={`https://ui-avatars.com/api/?name=${sopir.nama}&background=random`}
                    alt={sopir.nama}
                    rounded
                  />
                  <div className="min-w-0">
                    <p className="truncate text-xs md:text-base">
                      {sopir.nama}
                    </p>
                  </div>
                </div>
                <p className={`truncate text-sm font-medium md:text-base`}>
                  {toCurrency(sopir.total)}
                </p>
              </div>
            );
          })}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <ArrowPathIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Updated just now</h3>
        </div>
      </div>
    </div>
  );
}
