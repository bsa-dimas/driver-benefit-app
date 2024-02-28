"use client";
import CredentialFetch from "@/app/components/lib/CredentialFetch";
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

export default function ChangePassword() {
  const param = useSearchParams();
  const router = useRouter();
  const { data: session, update: sessionUpdate } = useSession();
  // const message = param.get("message");
  const { push } = useRouter();
  const [message, setMessage] = useState<any>();
  const [errors, setErrors] = useState<any>();
  const [isLoading, setLoading] = useState(false);
  const callbackUrl = param.get("callbackUrl") ?? "/dashboard";

  useEffect(() => {
    setMessage(null);
    setErrors(null);
    setLoading(false);
  }, []);

  const handleUpdateUser = async () => {
    const newSession = {
      ...session,
      isDefaultPassword: false,
    };

    await sessionUpdate(newSession);

    setLoading(false);

    router.push(callbackUrl);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setMessage(null);
    setErrors(null);

    setLoading(true);

    const res = await CredentialFetch("/change-password", {
      method: "PUT",
      body: JSON.stringify({
        password: e.target.password.value,
        password_confirmation: e.target.password_confirmation.value,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      setMessage(data.message);
      setLoading(false);
      // handleUpdateUser();
    } else {
      const data = await res.json();
      setLoading(false);
      setMessage(data.message);
      setErrors(data.errors);
    }
  };

  const renderErrors = (field: any) =>
    errors && (
      <Alert color="failure" rounded>
        <ul>
          {errors?.[field]?.map((error: any, index: any) => (
            <li key={index}>
              <span className="font-medium"> {error}</span>
            </li>
          ))}
        </ul>
      </Alert>
    );

  const renderMessage = () =>
    message && (
      <Alert color="success" rounded>
        <span className="font-medium"> {message}</span>
      </Alert>
    );

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Change Password
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              {renderErrors("password")}
              {renderMessage()}
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
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password Confirmation
                </label>
                <input
                  type="password"
                  name="password_confirmation"
                  id="password_confirmation"
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
                Change Password
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
