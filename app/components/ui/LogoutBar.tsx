"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function LogoutBar() {
  const router = useRouter();

  const handleClick = async () => {
    await fetch(process.env.NEXT_PUBLIC_URL_API_DRIVER_BENEFIT + "/logout", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          router.push("/login");
        }
        return response.json();
      })
      .finally(() => {
        router.push("/login");
        localStorage.removeItem("jwt");
      });
  };
  return (
    <div className="navbar-end">
      <button className="btn btn-square btn-ghost " onClick={handleClick}>
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          ></path>
        </svg>
        <span className="text-sm">Logout</span>
      </button>
    </div>
  );
}
