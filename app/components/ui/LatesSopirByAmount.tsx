import React from "react";
import Image from "next/image";
import { ArrowPathIcon } from "@heroicons/react/16/solid";

export default function LatesSopirByAmount() {
  return (
    <div className="flex w-full flex-col md:col-span-4 p-6 bg-gray-100 border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <h2 className={`mb-4 text-xl md:text-2xl`}>Pendapatan Sopir</h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4 dark:bg-gray-900 dark:border-gray-500">
        {/* NOTE: comment in this code when you get to this point in the course */}

        <div className="bg-white px-6 dark:bg-gray-900 dark:border-gray-500">
          <div
            key={1}
            className="flex flex-row items-center justify-between py-4"
          >
            <div className="flex items-center">
              <Image
                src="https://i.pravatar.cc/300"
                alt={`tes's profile picture`}
                className="mr-4 rounded-full"
                width={32}
                height={32}
              />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold md:text-base">
                  Dummy
                </p>
                <p className="hidden text-sm text-gray-500 sm:block">
                  dummy@gmail.com
                </p>
              </div>
            </div>
            <p className={`truncate text-sm font-medium md:text-base`}>$2000</p>
          </div>

          <div
            key={2}
            className="flex flex-row items-center justify-between py-4 border-t-2"
          >
            <div className="flex items-center">
              <Image
                src="https://i.pravatar.cc/300"
                alt={`tes's profile picture`}
                className="mr-4 rounded-full"
                width={32}
                height={32}
              />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold md:text-base">
                  Dummy1
                </p>
                <p className="hidden text-sm text-gray-500 sm:block">
                  dummy1@gmail.com
                </p>
              </div>
            </div>
            <p className={`truncate text-sm font-medium md:text-base`}>$4000</p>
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
