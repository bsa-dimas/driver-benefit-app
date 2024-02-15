import { useSession } from "next-auth/react";

//check if you are on the client (browser) or server
const isBrowser = () => typeof window !== "undefined";

const ProtectedRoute = ({ router, children }: any) => {
  //Identify authenticated user
  const { data: session } = useSession();
  const isAuthenticated = session?.user;

  let unprotectedRoutes = ["/login"];

  /**
   * @var pathIsProtected Checks if path exists in the unprotectedRoutes routes array
   */
  let pathIsProtected = unprotectedRoutes.indexOf(router.pathname) === -1;

  if (isBrowser() && !isAuthenticated && pathIsProtected) {
    router.push("/login");
  }

  return children;
};
