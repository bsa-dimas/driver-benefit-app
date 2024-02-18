import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { getSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";
import { NextRequest, NextResponse } from "next/server";

// Limit the middleware to paths starting with `/api/`
// export const config = {
//   matcher: "/api/:function*",
// };

// export async function middleware(request: NextRequest) {
//   const res = NextResponse.next();
//   const pathname = request.nextUrl.clone();

//   // if (requireAuth.some((path) => pathname.startsWith(path))) {

//   // }

//   const token = await getToken({ req: request });

//   // console.log(token?.iat);
//   // console.log(token?.exp);

//   console.log(pathname);

//   // if (token && url.pathname === "/login") {
//   //   console.log(token);
//   //   url.pathname = "/dashboard";
//   //   return NextResponse.redirect(url);
//   // }
// }

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

// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
// };

export default withAuth(
  function middleware(request) {
    const session = request?.nextauth?.token;
    if (session && request.nextUrl.pathname === "/")
      return NextResponse.redirect(new URL("/dashboard", request.url));

    if (!session && request.nextUrl.pathname !== "/login")
      return NextResponse.redirect(new URL("/login", request.url));
    if (session && request.nextUrl.pathname === "/login")
      return NextResponse.redirect(new URL("/dashboard", request.url));
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        if (req.nextUrl.pathname.startsWith("/dashboard") && token === null) {
          return false;
        }
        return true;
      },
    },
  }
);
