"use client";
import {
  Dropdown,
  Avatar,
  DarkThemeToggle,
  Flowbite,
  CustomFlowbiteTheme,
  Sidebar,
} from "flowbite-react";
import DropDownUserNavbar from "../components/ui/DropDownUserNavbar";
import SideBarV2 from "../components/ui/SideBarV2";
import {
  HiChartPie,
  HiViewBoards,
  HiInbox,
  HiUser,
  HiShoppingBag,
  HiArrowSmRight,
  HiTable,
} from "react-icons/hi";
import FlowBiteScript from "./FlowBiteScript";
import classNames from "classnames";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { useState } from "react";
import SideBarV3 from "../components/ui/SideBarV3";
import NavBarV3 from "../components/ui/NavBarV3";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [collapsed, setSidebarCollapsed] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  return (
    <div
      className={classNames({
        "grid bg-zinc-100 min-h-screen": true,
        "grid-cols-sidebar": !collapsed,
        "grid-cols-sidebar-collapsed": collapsed,
        "transition-[grid-template-columns] duration-300 ease-in-out": true,
      })}
    >
      <SideBarV3
        collapsed={collapsed}
        setCollapsed={setSidebarCollapsed}
        shown={showSidebar}
      />
      <div className="">
        <NavBarV3 onMenuButtonClick={() => setShowSidebar((prev) => !prev)} />
        {children}
      </div>
    </div>
  );
}
