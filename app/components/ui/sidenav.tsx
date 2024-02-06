import Logout from "@/app/logout/page";
import Link from "next/link";
import React from "react";
import { BsDatabaseFillGear, BsFillCalendar2DateFill } from "react-icons/bs";
import { FaUserNurse, FaUsers } from "react-icons/fa";
import { FaUserGear } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import { SiOpenaccess } from "react-icons/si";
import { TbUsersGroup } from "react-icons/tb";
import TopLogoSideNav from "./TopLogoSideNav";

export default function SideNav() {
  return (
    <div>
      <div className="fixed flex flex-col top-0 left-0 w-60 bg-white h-full border-r ">
        <TopLogoSideNav />
        <div className="overflow-y-auto overflow-x-hidden flex-grow">
          <ul className="flex flex-col py-4 space-y-1">
            <li className="px-5">
              <div className="flex flex-row items-center h-8">
                <div className="text-sm font-light tracking-wide text-gray-500">
                  Menu
                </div>
              </div>
            </li>
            <li>
              <Link
                href="/dashboard/role"
                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
              >
                <span className="inline-flex justify-center items-center ml-4">
                  <SiOpenaccess />
                </span>
                <span className="ml-2 text-sm tracking-wide truncate">
                  Role
                </span>
              </Link>
            </li>
            <li>
              <Link
                href={`/dashboard/departemen`}
                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
              >
                <span className="inline-flex justify-center items-center ml-4">
                  <FaUsers />
                </span>
                <span className="ml-2 text-sm tracking-wide truncate">
                  Departemen
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/sopir"
                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
              >
                <span className="inline-flex justify-center items-center ml-4">
                  <FaUserNurse />
                </span>
                <span className="ml-2 text-sm tracking-wide truncate">
                  Sopir
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/users"
                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
              >
                <span className="inline-flex justify-center items-center ml-4">
                  <FaUserGear />
                </span>
                <span className="ml-2 text-sm tracking-wide truncate">
                  Users
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/tanggallibur"
                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
              >
                <span className="inline-flex justify-center items-center ml-4">
                  <BsFillCalendar2DateFill />
                </span>
                <span className="ml-2 text-sm tracking-wide truncate">
                  Tanggal Libur
                </span>
              </Link>
            </li>

            <li className="px-5">
              <div className="flex flex-row items-center h-8">
                <div className="text-sm font-light tracking-wide text-gray-500">
                  Transaksi
                </div>
              </div>
            </li>
            <li>
              <Link
                href="/dashboard/upload-draft"
                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
              >
                <span className="inline-flex justify-center items-center ml-4">
                  <BsDatabaseFillGear />
                </span>
                <span className="ml-2 text-sm tracking-wide truncate">
                  Transaksi
                </span>
              </Link>
            </li>

            <li className="px-5">
              <div className="flex flex-row items-center h-8">
                <div className="text-sm font-light tracking-wide text-gray-500">
                  Settings
                </div>
              </div>
            </li>

            <Logout />
          </ul>
        </div>
      </div>
    </div>
  );
}
