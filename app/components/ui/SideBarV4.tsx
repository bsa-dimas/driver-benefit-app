"use client";

import React, { useEffect, useRef, useState } from "react";
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
import SubItemNav from "./SubItemNav";
import ItemNav from "./ItemNav";

type NavItem = {
  label: string;
  href: string;
  subItem: SubNavItem[];
  icon: React.ReactNode;
};

type SubNavItem = {
  label: string;
  href: string;
  target?: string;
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
      {
        label: "Setting",
        href: "/dashboard/setting",
        icon: <UserGroupIcon className="w-6 h-6" />,
      },
      {
        label: "Download Template Draft",
        href: `${process.env.NEXT_PUBLIC_URL_WEB}/download-template-draft-transaksi`,
        target: "_blank",
        icon: <UserGroupIcon className="w-6 h-6" />,
      },
      {
        label: "Download Template Sopir",
        href: `${process.env.NEXT_PUBLIC_URL_WEB}/download-template-sopir`,
        target: "_blank",
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
      {
        label: "Simpanan Summary",
        href: "/dashboard/tabungansummary",
        icon: <UserGroupIcon className="w-6 h-6" />,
      },
    ],
    icon: <FolderIcon className="w-6 h-6" />,
  },
];

type DropDownType = {
  isOpen: boolean;
};

export default function SideBarV4({ shown, closeSideBar }: any) {
  const path = usePathname();
  const isActive =
    "text-white dark:text-gray-500 bg-gray-300 dark:bg-gray-900 rounded-lg";

  const [active, setActive] = useState({
    isActive: null,
  });

  const ref = useRef<any>();
  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      if (ref.current && !ref.current.contains(e.target)) {
        closeSideBar(false);
      }
    };
    document.addEventListener("click", checkIfClickedOutside);
    return () => {
      document.removeEventListener("click", checkIfClickedOutside);
    };
  }, [ref, shown, closeSideBar]);

  return (
    <div>
      <aside
        ref={ref}
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
              return (
                <li key={index} onClick={() => {}}>
                  {item.subItem.length > 0 ? (
                    <ItemNav
                      item={item}
                      isActive={isActive}
                      closeSideBar={() => {
                        closeSideBar(false);
                      }}
                      path={path}
                    />
                  ) : (
                    <Link
                      href={item.href}
                      className={classNames({
                        "flex p-2 text-gray-900 transition rounded-lg hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700":
                          true,
                        "text-white dark:text-gray-500 bg-gray-300 dark:bg-gray-900 rounded-lg":
                          path === item.href,
                      })}
                      // onClick={() => closeSideBar(false)}
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
