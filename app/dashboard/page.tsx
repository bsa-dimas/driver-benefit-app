"use client";

import React from "react";
import { useSession, signOut } from "next-auth/react";

export default function Dashboard() {
  const { data: session } = useSession();

  return (
    <div className="text-gray-900 dark:text-white">
      Hello ${JSON.stringify(session?.user)}
    </div>
  );
}
