"use client";

import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Link from "next/link";

export default function ClientComponent({ children }: any) {
  const [title, setTitle] = useState("");
  const onClick = () => setTitle("Sopir");

  // useEffect(() => {
  //   setTitle("");
  // }, [title]);

  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* <label htmlFor="my-drawer" className="btn btn-primary drawer-button">
          Open drawer
        </label> */}
        <div>
          <div className="flex flex-col">
            {/* <SideNav /> */}

            <NavBar title={title} />

            <div className="">{children}</div>
          </div>
        </div>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        {/* <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          
          <li>
            <a>Sidebar Item 1</a>
          </li>
          <li>
            <a>Sidebar Item 2</a>
          </li>
        </ul> */}
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          <li>
            <details>
              <summary>Master</summary>
              <ul>
                <li onClick={() => setTitle("Role")}>
                  <Link href="/dashboard/role">Role</Link>
                </li>
                <li onClick={() => setTitle("User")}>
                  <Link href="/dashboard/users">User</Link>
                </li>
                <li onClick={() => setTitle("Periode")}>
                  <Link href="/dashboard/periode">Periode</Link>
                </li>
                <li onClick={() => setTitle("Departemen")}>
                  <Link href="/dashboard/departemen">Departemen</Link>
                </li>
                <li onClick={onClick}>
                  <Link
                    className={
                      title == "Sopir"
                        ? `bg-slate-400 rounded-md text-white`
                        : `text-black`
                    }
                    href="/dashboard/sopir"
                  >
                    Sopir
                  </Link>
                </li>
                <li onClick={() => setTitle("Tanggal Libur")}>
                  <Link href="/dashboard/tanggallibur">Tanggal Libur</Link>
                </li>
                <li onClick={() => setTitle("Setting")}>
                  <Link href="/dashboard/setting">Setting</Link>
                </li>
              </ul>
            </details>
            <details>
              <summary>Transaksi</summary>
              <ul>
                <li onClick={() => setTitle("Upload Draft")}>
                  <Link href="/dashboard/upload-draft">Upload Draft</Link>
                </li>
                <li onClick={() => setTitle("Payrol")}>
                  <Link href="/dashboard/payrol">Payrol</Link>
                </li>
                <li>
                  <Link href="/dashboard/testing">Testing</Link>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  );
}
