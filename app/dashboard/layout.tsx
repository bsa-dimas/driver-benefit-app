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
import Link from "next/link";
import FlowBiteScript from "./FlowBiteScript";
import { GrTransaction } from "react-icons/gr";
import SideBarV2 from "../components/ui/SideBarV2";
import classNames from "classnames";
import SideBarV4 from "../components/ui/SideBarV4";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import React from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sideBar, setSideBar] = useState(false);

  // const ref = useRef<any>();
  // useEffect(() => {
  //   const checkIfClickedOutside = (e: any) => {
  //     if (ref.current && !ref.current.contains(e.target)) {
  //       // closeSideBar(false);
  //       console.log(sideBar);
  //       console.log(ref.current);
  //       console.log(!ref.current.contains(e.target));
  //     }
  //   };
  //   document.addEventListener("click", checkIfClickedOutside);
  //   return () => {
  //     document.removeEventListener("click", checkIfClickedOutside);
  //   };
  // }, [ref]);

  // create ref for the StyledModalWrapper component
  // const ref = useRef<any>(null);

  // // check if the user has clicked inside or outside the modal
  // // useCallback is used to store the function reference, so that on modal closure, the correct callback can be cleaned in window.removeEventListener
  // const backDropHandler = useCallback((e: any) => {
  //   console.log(sideBar);
  //   console.log(!ref?.current?.contains(e.target));
  //   if (!ref?.current?.contains(e.target)) {
  //     // setSideBar(false);
  //   }
  // }, []);

  // useEffect(() => {
  //   // We wrap it inside setTimeout in order to prevent the eventListener to be attached before the modal is open.
  //   setTimeout(() => {
  //     window.addEventListener("click", backDropHandler);
  //   });
  // }, []);

  // useEffect(() => {
  //   // remove the event listener when the modal is closed
  //   return () => window.removeEventListener("click", backDropHandler);
  // }, []);

  // const ref = useRef<any>(null);

  // useEffect(() => {
  //   // only add the event listener when the dropdown is opened
  //   if (!sideBar) return;
  //   function handleClick(event: any) {
  //     // setSideBar(false);
  //     console.log(sideBar);
  //     console.log(ref.current + " 1 ");
  //     console.log(!ref?.current?.contains(event.target) + " 2");
  //     if (
  //       ref.current &&
  //       !ref?.current?.contains(event.target) &&
  //       sideBar
  //     ) {
  //       console.log("close-----");
  //       setSideBar(false);
  //     }
  //   }
  //   window.addEventListener("click", handleClick);
  //   // clean up
  //   return () => window.removeEventListener("click", handleClick);
  // }, [sideBar]);

  // const ref = useRef<any>(null);

  // useEffect(() => {
  //   const handleOutSideClick = (event: any) => {
  //     if (!ref.current?.contains(event.target)) {
  //       alert("Outside Clicked.");
  //       console.log("Outside Clicked. ");
  //     }
  //   };

  //   window.addEventListener("mousedown", handleOutSideClick);

  //   return () => {
  //     window.removeEventListener("mousedown", handleOutSideClick);
  //   };
  // }, [ref]);

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
                onClick={() => {
                  setSideBar(!sideBar);
                }}
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
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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

      {sideBar && (
        <SideBarV4
          shown={sideBar}
          closeSideBar={() => {
            setSideBar(false);
          }}
        />
      )}

      <div className="bg-white dark:bg-gray-900 h-full min-h-screen flex flex-col">
        <div className="flex-1 p-2 bg-white dark:bg-gray-900 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          {children}
        </div>
      </div>
    </div>
  );
}
