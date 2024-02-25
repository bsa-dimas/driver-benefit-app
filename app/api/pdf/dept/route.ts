import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import stream from "stream";
import { promisify } from "util";
import { useContext } from "react";
import CredentialFetch from "@/app/components/lib/CredentialFetch";

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  const token = session?.user?.access_token;
  const fileBlob = await fetch(
    `${process.env.NEXT_PUBLIC_URL_API_DRIVER_BENEFIT}/report-draft-by-departemen-pdf?by=draft&periode_id=3`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  ).then((res) => res.blob());

  // This is the key part - set the headers to tell the browser to download the file
  const headers = new Headers();
  // remember to change the filename here
  headers.append("Content-Disposition", 'attachment; filename="test.pdf"');
  headers.append("Content-Type", "application/pdf");

  return new Response(fileBlob, {
    headers,
  });
}
