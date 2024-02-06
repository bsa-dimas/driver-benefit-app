import React from "react";
import { NotificationModel } from "../models/notification_model";

export default function NotificationBottom({ title, msg, type }: any) {
  const message =
    "bg-slate-300 border-l-4 border-slate-500 text-slate-700 p-4 ";
  const error = "bg-red-100 border-l-4 border-orange-500 text-orange-700 p-4 ";

  return (
    <div className="fixed right-2 bottom-2 w-72">
      <div className={type == "message" ? message : error} role="alert">
        <div className="flex gap-3 align-middle">
          <div>
            <p className="font-bold">{title}</p>
            <p>{msg}</p>
          </div>
          {/* <button className="align-middle my-auto -mx-3 ms-auto bg-transparent text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-orange-300 inline-flex items-center justify-center h-8 w-8">
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button> */}
        </div>
      </div>
    </div>
  );
}
