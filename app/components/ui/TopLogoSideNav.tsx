"use client";
import { useRouter } from "next/navigation";
import React from "react";

export default function TopLogoSideNav() {
  const router = useRouter();
  return (
    <div className="flex items-center justify-center h-14 border-b">
      <div
        className="text-xl font-medium"
        onClick={() => {
          router.push("/dashboard");
        }}
      >
        Driver Benefit App
      </div>
    </div>
  );
}
