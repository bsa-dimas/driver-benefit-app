import React from "react";

import { ArrowPathIcon } from "@heroicons/react/16/solid";

export default function DashBoardSkeleton() {
  return (
    <div className="flex w-full flex-col md:col-span-4 p-6 bg-gray-100 border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <h2 className={`mb-4 text-xl md:text-2xl`}>Pendapatan Sopir</h2>
      <div className="animate-pulse flex grow flex-col justify-between rounded-xl bg-gray-50 p-4 dark:bg-gray-900 dark:border-gray-500">
        <div className=" bg-white h-10 px-6 dark:bg-gray-900 dark:border-gray-500">
          <div className="flex flex-row items-center justify-between my-2 gap-2">
            <div className="rounded-3xl w-10 h-10 bg-gray-800 dark:bg-gray-800"></div>
            <div className="w-full h-2 bg-gray-800 dark:bg-gray-800"></div>
          </div>
        </div>
        <div className="flex items-center pb-2 pt-6">
          <ArrowPathIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Updated just now</h3>
        </div>
      </div>
    </div>
  );
}
