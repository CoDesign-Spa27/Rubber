"use client";
import { api } from "@/convex/_generated/api";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useConvex } from "convex/react";
import { redirect, useRouter } from "next/navigation";
import React, { use, useEffect, useState } from "react";
import SideNav from "../_components/SideNav";
import { Provider } from "react-redux";
import {store} from "@/store/store"
import { FileListContext } from "../_contexts/FileListContext";
import NextTopLoader from "nextjs-toploader";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const convex = useConvex();
  const { user }: any = useKindeBrowserClient();
  const [fileList_,setFileList_]=useState();
  const router = useRouter();
  useEffect(() => {
    user && checkTeam();
  }, [user]);

  const checkTeam = async () => {
    const result = await convex.query(api.teams.getTeam, {
      email: user?.email,
    });

    if (!result?.length) {
      router.push("teams/create");
    }
  };

 
  
  return (
    <>
    <Provider store={store}>
    <NextTopLoader  
        color=" #D95BFF"
        showSpinner={true}
        crawlSpeed={200}
       
        shadow="0 0 10px #2299DD,0 0 5px #2299DD"
       
        showAtBottom={false}
        />
<FileListContext.Provider value={{fileList_,setFileList_}}>
  <div className="bg-neutral-900 text-gray-300">

    <div className="grid grid-cols-4">
      <div className="h-screen w-72 fixed">
<SideNav />
      </div>

      <div className="col-span-4 ml-72">
      {children}
      </div>
    </div>
  </div>
  </FileListContext.Provider>
    </Provider>
    </>
  );
};

export default DashboardLayout;
