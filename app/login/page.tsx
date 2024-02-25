"use client";
import { Alert, Button } from "flowbite-react";
import {
  SessionProvider,
  signIn,
  getSession,
  useSession,
} from "next-auth/react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

import React, { useEffect, useState } from "react";

export default function Login() {
  const param = useSearchParams();
  const router = useRouter();
  const { data: session } = useSession();
  // const message = param.get("message");
  const { push } = useRouter();
  const [message, setMessage] = useState<any>();
  const [isLoading, setLoading] = useState(false);
  const callbackUrl = param.get("callbackUrl") ?? "/dashboard";

  // useEffect(() => {
  //   if (session?.user) {
  //     console.log(session);
  //     router.push("/dashboard");
  //   }
  // }, [session, router]);

  useEffect(() => {
    setMessage(null);
    setLoading(false);
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setMessage(null);

    try {
      setLoading(true);

      signIn("credentials", {
        redirect: false,
        email: e.target.email.value,
        password: e.target.password.value,
      })
        .then(({ ok, error }: any) => {
          if (ok) {
            setLoading(false);
            push(callbackUrl);
          } else {
            setLoading(false);
            setMessage("Authentication failed");
          }
        })
        .catch(() => setLoading(false))
        .finally(() => {
          // setLoading(false);
          // setTimeout(() => {
          //   setLoading(false);
          // }, 3000);
        });
    } catch (err) {
      // setLoading(false);
    } finally {
      // setLoading(false);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="flex flex-col items-center mb-6 text-md font-semibold text-gray-900 dark:text-white">
          <Image
            className="w-40"
            width={100}
            height={200}
            priority={true}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            src="/images/logo.png"
            alt="logo"
          />
          Driver Benefit
        </div>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              {message && (
                <Alert color="failure" rounded>
                  <span className="font-medium"> {message}</span>
                </Alert>
              )}
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your Email Or Name
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Email or Name"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                // className="w-full text-slate-300 bg-slate-700 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                isProcessing={isLoading}
              >
                Sign In
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
