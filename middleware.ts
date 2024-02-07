import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

// middleware is applied to all routes, use conditionals to select
// export function middleware(req: NextRequest) {
//   const token = req ? req.cookies?.get("next-auth.csrf-token") : null;
//   const url = req.nextUrl.clone();

//   if (token && url.pathname === "/") {
//     url.pathname = "/dashboard";
//     return NextResponse.redirect(url);
//   } else {
//     return NextResponse.next();
//   }
// }

export default withAuth(function middleware(req) {}, {
  callbacks: {
    authorized: ({ req, token }) => {
      // console.log(req);
      if (req.nextUrl.pathname.startsWith("/dashboard") && token === null) {
        return false;
      }
      return true;
    },
  },
});
