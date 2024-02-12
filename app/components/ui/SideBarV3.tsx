"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import cn from "classnames";
import { GrTransaction } from "react-icons/gr";
import FlowBiteScript from "@/app/dashboard/FlowBiteScript";
import { initFlowbite } from "flowbite";
import {
  HomeIcon,
  UserGroupIcon,
  FolderIcon,
  CalendarIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline";
import classNames from "classnames";

type NavItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

type Props = {
  collapsed: boolean;
  navItems?: NavItem[];
  setCollapsed(collapsed: boolean): void;
  shown: boolean;
};

const defaultNavItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/",
    icon: <HomeIcon className="w-6 h-6" />,
  },
  {
    label: "Team",
    href: "/team",
    icon: <UserGroupIcon className="w-6 h-6" />,
  },
  {
    label: "Projects",
    href: "/projects",
    icon: <FolderIcon className="w-6 h-6" />,
  },
  {
    label: "Calendar",
    href: "/calendar",
    icon: <CalendarIcon className="w-6 h-6" />,
  },
];

export default function SideBarV3({
  collapsed,
  navItems = defaultNavItems,
  shown,
  setCollapsed,
}: Props) {
  const Icon = collapsed ? ChevronDoubleRightIcon : ChevronDoubleLeftIcon;
  return (
    <div
      className={classNames({
        "bg-slate-500": true,
        "transition-all duration-300 ease-in-out": true,
        "fixed md:static md:translate-x-0": true,
        "w-[300px]": !collapsed,
        "w-16": collapsed,
        "-translate-x-full": !shown,
      })}
    >
      <div
        className={classNames({
          "flex flex-col justify-between ": true,
          "h-full": true,
        })}
      >
        {/* logo and collapse button */}
        {/* ...ommitted for brevity */}
        {/* nav items part */}
        <nav className="flex-grow">
          <ul
            className={classNames({
              "my-2 flex flex-col gap-2 items-stretch": true,
            })}
          >
            {navItems.map((item, index) => {
              return (
                <li
                  key={index}
                  className={classNames({
                    "text-indigo-100 hover:bg-indigo-900 flex": true, //colors
                    "transition-colors duration-300": true, //animation
                    "rounded-md p-2 mx-3 gap-4 ": !collapsed,
                    "rounded-full p-2 mx-3 w-10 h-10": collapsed,
                  })}
                >
                  <Link href={item.href} className="flex gap-2">
                    {item.icon} <span>{!collapsed && item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        {/* profile part ...omitted for brevity */}
      </div>
    </div>
  );
}
