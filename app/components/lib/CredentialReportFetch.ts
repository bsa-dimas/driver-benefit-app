import { getSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export default async function CredentialReportFetch(
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
        "Content-Type": "application/pdf",
        Accept: "application/pdf",
        "Content-Disposition": "attachment; filename=dummy.pdf",
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
