import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Email and Password",
      type: "credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Your Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_URL_WEB}/sanctum/csrf-cookie`,
          {
            method: "GET",
          }
        );

        const setCookieHeader = res.headers.get("set-cookie");
        // console.log("setCookieHeader", setCookieHeader)
        // you'll find your_site_session key in this console log

        const cookies = setCookieHeader?.split(", ");
        // console.log(cookies)
        let sessionKey = null;
        let xsrfToken = null;

        for (const cookie of cookies!) {
          if (cookie.startsWith("laravel_session=")) {
            sessionKey = cookie.split("=")[1];
          } else if (cookie.startsWith("XSRF-TOKEN=")) {
            xsrfToken = cookie.split("=")[1];
          }

          if (sessionKey && xsrfToken) {
            break;
          }
        }
        const data = {
          email: credentials?.email,
          password: credentials?.password,
        };
        const headers = new Headers({
          Cookie: `laravel_session=${sessionKey}`,
          "Content-Type": "application/json",
        });

        if (xsrfToken) {
          headers.append("X-XSRF-TOKEN", xsrfToken);
        }

        const options = {
          method: "POST",
          headers,
          body: JSON.stringify(data),
        };
        try {
          // console.log(options)
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_URL_API_DRIVER_BENEFIT}/login`,
            options
          );

          if (response.ok) {
            const res = await response.json();
            console.log("response", res);
            return res;
          } else {
            return null;
            // throw new Error("Wrong credentials. Try again.");

            // const res = await response.json();
            // console.log("response1", response);
            // return {
            //   error: "Authentication failed", // Error code based on the type of error
            //   status: response.status, // HTTP status code
            //   ok: false, // `true` if the signin was successful
            //   url: null, // `null` if there was an error, otherwise URL to redirected to
            // };
            // console.log("HTTP error! Status:", response.status);
            // // Handle non-successful response here, return an appropriate JSON response.
            // return { error: "Authentication failed", status: response.status };
          }
        } catch (error) {
          console.log("Error", error);
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (user) {
        token.user = user;
        token.accessToken = user.access_token;
        token.key = user.key;
      }
      // console.log(token);
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.access_token as string;
      session.user = token.user;
      session.key = token.key as string;
      // console.log(session);
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST, authOptions };
