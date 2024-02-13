"use client";

import {
  Dropdown,
  Avatar,
  DarkThemeToggle,
  Flowbite,
  CustomFlowbiteTheme,
} from "flowbite-react";
import DropDownUserNavbar from "../components/ui/DropDownUserNavbar";
import Link from "next/link";
import FlowBiteScript from "./FlowBiteScript";
import { GrTransaction } from "react-icons/gr";
import SideBarV2 from "../components/ui/SideBarV2";
import classNames from "classnames";
import SideBarV4 from "../components/ui/SideBarV4";
import { useState } from "react";
import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sideBar, setSideBar] = useState(false);

  return (
    <div className="">
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className={classNames({
                  "inline-flex items-center p-2 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600":
                    true,
                })}
                onClick={() => setSideBar(!sideBar)}
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
              <a href="#" className="flex ms-2 md:me-24">
                <Image
                  width={100}
                  height={200}
                  priority={true}
                  src="/images/logo.png"
                  className="h-8 me-3"
                  alt="Logo"
                />
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                  Driver Benefit
                </span>
              </a>
            </div>
            <div className="flex items-center">
              <div className="flex items-center ms-3 gap-2">
                <DarkThemeToggle />
                <DropDownUserNavbar />
              </div>
            </div>
          </div>
        </div>
      </nav>

      <SideBarV4
        shown={sideBar}
        closeSideBar={() => {
          setSideBar(false);
        }}
      />

      <div className="bg-white dark:bg-gray-900 h-full min-h-screen flex flex-col">
        <div className="flex-1 p-2 bg-white dark:bg-gray-900 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          {children}
        </div>
      </div>
    </div>
  );
}
