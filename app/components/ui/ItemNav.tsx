"use client";

import React, { useState } from "react";
import { FaAngleRight, FaAngleDown } from "react-icons/fa";
import SubItemNav from "./SubItemNav";

export default function ItemNav({ item, isActive, closeSideBar, path }: any) {
  const [isDropDown, setDropdown] = useState(false);

  return (
    <div className="cursor-pointer items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
      <div
        className="flex"
        aria-expanded={isDropDown ? "true" : "false"}
        onClick={() => setDropdown((e: any) => !e)}
      >
        {item.icon}
        <span className="flex-1 ms-3">{item.label}</span>
        <div className="my-auto">
          {!isDropDown ? <FaAngleRight /> : <FaAngleDown />}
        </div>
      </div>
      <SubItemNav
        items={item}
        path={path}
        isDropDown={isDropDown}
        isActive={isActive}
        closeSideBar={closeSideBar}
      />
    </div>
  );
}
