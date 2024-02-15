import { getSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export default async function CredentialFetch(
  path: string,
  init: RequestInit | undefined
) {
  const session = await getSession();
  const token = session?.user?.access_token;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL_API_DRIVER_BENEFIT}${path}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      ...init,
    }
  );
  if (!res.ok) {
    // const data = await res.json();
    // if (data.message === "Unauthenticated.") {
    //   console.log(data.message + " === ");
    //   return NextResponse.redirect("/login");
    // }
  }
  return res;
}
