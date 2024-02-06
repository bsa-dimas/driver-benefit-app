"use client";

import Link from "next/link";
import React, { useState } from "react";
import LogoutBar from "./LogoutBar";

export default function NavBar({ title }: any) {
  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="flex-none">
          <div className="dropdown">
            <label htmlFor="my-drawer" className="btn btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </label>
          </div>
        </div>
        <div
          className="flex flex-row flex-1"
          // onClick={() => setTitle("Dashboard")}
        >
          <Link
            href={"/dashboard"}
            className="text-xl font-semibold p-0 self-start"
          >
            Driver App
          </Link>
          {title && (
            <div className="text-xl align-middle">&nbsp;{`- ${title}`} </div>
          )}
        </div>
        <LogoutBar />
      </div>
    </div>
  );
}
