import { getSession } from "next-auth/react";

export default async function CredentialUploadFetch(
  path: string,
  init: RequestInit | undefined
) {
  const session = await getSession();
  const token = session?.user?.access_token;

  return await fetch(
    `${process.env.NEXT_PUBLIC_URL_API_DRIVER_BENEFIT}${path}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      ...init,
    }
  );
}
