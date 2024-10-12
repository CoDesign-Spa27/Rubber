"use client";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import dynamic from "next/dynamic";
import { Suspense, useEffect } from "react";
import { redirect } from "next/navigation";
const Hero=dynamic(()=>import('./_components/Hero'),{ssr:false});
export default function Home() {
  const { user } = useKindeBrowserClient();

  useEffect(() => {
    if (user) {
      console.log("User info:", user);
      redirect("/dashboard");
    }
  }, [user]);

  return (
    <main className="w-full">
      <Suspense fallback={<div className="w-full h-screen text-black bg-purple-600 text-center">Loading...</div>}>
      <Hero />
      </Suspense>
    </main>
  );
}
