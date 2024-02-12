"use client";
import classNames from "classnames";
import Link from "next/link";
import React, { useState } from "react";

export default function SubItemNav({
  items,
  path,
  isActive,
  closeSideBar,
  isDropDown,
  closeDropDown,
}: any) {
  const [openDropDown, setDropdown] = useState(isDropDown);

  return (
    <ul
      className={classNames({
        "flex-none": true,
        "py-2 space-y-2": true,
        hidden: !isDropDown,
      })}
    >
      {items.subItem.map((item: any, i: any) => {
        return (
          <li
            key={i}
            className={`${path === item.href ? isActive : ""}  ml-7`}
            onClick={() => setDropdown((e: any) => !e)}
          >
            <Link
              href={item.href}
              className={classNames({
                "flex p-2 text-gray-900 transition rounded-lg hover:bg-gray-100 dark:text-white dark:hover:bg-gray-900":
                  true,
                "text-white dark:text-gray-500 bg-gray-300 dark:bg-gray-900 rounded-lg":
                  path === item.href,
              })}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
