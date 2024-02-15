import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import stream from "stream";
import { promisify } from "util";
import { useContext } from "react";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const by = searchParams.get("by");
  const session = await getServerSession(authOptions);
  const pipeline = promisify(stream.pipeline);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL_API_DRIVER_BENEFIT}/report-draft-by-departemen-pdf?by=draft`,
    {
      headers: {
        Authorization: `Bearer ${session?.user.access_token}`,
      },
    }
  );
  const data = await res.json();

  //   request.headers.set("Content-Type", "application/pdf");
  //   request.headers.set("content-disposition", `attachment; filename="tess.pdf"`);
  await pipeline(data.body);

  return new Response(res.body, {
    headers: {
      ...res.headers, // copy the previous headers
      "Content-Type": "application/pdf",
      "content-disposition": `attachment; filename="tess.pdf"`,
    },
  });
}

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   const {
//     query: { name, keyword },
//     method,
//   } = req;

//   const session = await getServerSession(authOptions);
//   console.log(session?.accessToken);
//   console.log(req.method);

//   //   if (req.method === "GET") {
//   //     const response = await fetch(
//   //       `${process.env.NEXT_PUBLIC_URL_API_DRIVER_BENEFIT}/report-draft-by-departemen-pdf?by=${keyword}`,
//   //       {
//   //         headers: {
//   //           Authorization: `Bearer ${session?.accessToken}`,
//   //         },
//   //       }
//   //     );

//   //     return new Response(response.body, {
//   //       headers: {
//   //         ...response.headers, // copy the previous headers
//   //         "content-disposition": `attachment; filename="tess.pdf"`,
//   //       },
//   //     });
//   //   } else {
//   //     return new Response("oke");
//   //   }
// }
// export { handler as GET };
