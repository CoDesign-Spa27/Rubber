import { Skeleton } from "@/components/ui/skeleton";
import { Send, SendIcon } from "lucide-react";
import React from "react";

interface User {
  tab?: string;
  image?: JSX.Element;
}

function DashboardHeader(user?: User): JSX.Element {
  return (
    <div className="w-full flex p-4 justify-end">
      <div className="flex items-center gap-10">
        <div className="relative">
          <input
            type="text"
            id="Search"
            placeholder="Search for..."
            className="w-full rounded-md border-0 focus:ring-0 focus:outline-none text-black py-2.5 px-2 pr-40 shadow-sm sm:text-sm"
          />

          <span className="absolute inset-y-0 right-0 grid w-10 place-content-center">
            <button type="button" className="text-gray-600 hover:text-gray-700">
              <span className="sr-only">Search</span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </button>
          </span>
        </div>

        <div className="flex items-center gap-5">
          <div className="w-8 h-8">{user?.image}</div>
          <div className="bg-pink-400 rounded-md flex gap-2 items-center p-2">
            <div>

            <SendIcon
              className="
              text-black
              "   size={14}
              />
              </div>
            <div className="text-black text-sm">
            Invite

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardHeader;
