"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { GrTransaction } from "react-icons/gr";
import classNames from "classnames";
import {
  HomeIcon,
  UserGroupIcon,
  FolderIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";
import { FaAngleDown, FaAngleRight, FaChartPie } from "react-icons/fa6";

type NavItem = {
  label: string;
  href: string;
  subItem: SubNavItem[];
  icon: React.ReactNode;
};

type SubNavItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

const itmes: NavItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    subItem: [],
    icon: <FaChartPie className="w-6 h-6" />,
  },
  {
    label: "Master",
    href: "#",
    subItem: [
      {
        label: "User",
        href: "/dashboard/users",
        icon: <UserGroupIcon className="w-6 h-6" />,
      },
      {
        label: "Sopir",
        href: "/dashboard/sopir",
        icon: <UserGroupIcon className="w-6 h-6" />,
      },
      {
        label: "Periode",
        href: "/dashboard/periode",
        icon: <UserGroupIcon className="w-6 h-6" />,
      },
      {
        label: "Tanggal Libur",
        href: "/dashboard/tanggallibur",
        icon: <UserGroupIcon className="w-6 h-6" />,
      },
      {
        label: "Departemen",
        href: "/dashboard/departemen",
        icon: <UserGroupIcon className="w-6 h-6" />,
      },
    ],
    icon: <HomeIcon className="w-6 h-6" />,
  },
  {
    label: "Transaksi",
    href: "#",
    subItem: [
      {
        label: "Draft",
        href: "/dashboard/draft",
        icon: <UserGroupIcon className="w-6 h-6" />,
      },
      {
        label: "Payrol",
        href: "/dashboard/payrol",
        icon: <UserGroupIcon className="w-6 h-6" />,
      },
      {
        label: "Simpanan",
        href: "/dashboard/tabungan",
        icon: <UserGroupIcon className="w-6 h-6" />,
      },
    ],
    icon: <FolderIcon className="w-6 h-6" />,
  },
];

export default function SideBarV4({ shown, closeSideBar }: any) {
  const path = usePathname();
  const isActive =
    "text-white dark:text-gray-500 bg-gray-300 dark:bg-gray-900 rounded-lg";

  return (
    <div>
      <aside
        id="logo-sidebar"
        className={classNames({
          "fixed  top-0 left-0 z-40 h-screen pt-16 bg-red-300 border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700":
            true,
          "transition-transform w-64 translate-x-0": shown,
          "transition-transform -translate-x-full": !shown,
        })}
        aria-label="Sidebar"
        aria-hidden="true"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            {itmes.map((item, index) => {
              const [openDropDown, setOpenDropDown] = useState(false);
              return (
                <li key={index} onClick={() => setOpenDropDown(!openDropDown)}>
                  {item.subItem.length > 0 ? (
                    <div className="cursor-pointer items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                      <div className="flex">
                        {item.icon}
                        <span className="flex-1 ms-3">{item.label}</span>
                        <div className="my-auto">
                          {openDropDown ? <FaAngleRight /> : <FaAngleDown />}
                        </div>
                      </div>
                      <ul
                        className={classNames({
                          "flex-none": true,
                          "py-2 space-y-2": true,
                          hidden: openDropDown,
                        })}
                      >
                        {item.subItem.map((p, i) => {
                          return (
                            <li
                              key={i}
                              className={`${
                                path === p.href ? isActive : ""
                              }  ml-7`}
                              onClick={() => closeSideBar(false)}
                            >
                              <Link
                                href={p.href}
                                className={classNames({
                                  "flex p-2 text-gray-900 transition rounded-lg hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700":
                                    true,
                                  "text-white dark:text-gray-500 bg-gray-300 dark:bg-gray-700 rounded-lg":
                                    path === item.href,
                                })}
                              >
                                {p.label}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className={classNames({
                        "flex p-2 text-gray-900 transition rounded-lg hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700":
                          true,
                        "text-white dark:text-gray-500 bg-gray-300 dark:bg-gray-900 rounded-lg":
                          path === item.href,
                      })}
                      onClick={() => closeSideBar(false)}
                    >
                      {item.icon}

                      <span className="ms-3">{item.label}</span>
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
          <div className="flex w-full m-0 fixed left-0 bottom-0 justify-center">
            <div className="text-xs">Driver Benefit App - Versi 1.0.0</div>
          </div>
        </div>
      </aside>
    </div>
  );
}
