"use client"
import Logo from "@/app/_components/Logo";
import { toast } from "@/components/ui/use-toast";
import { api } from "@/convex/_generated/api";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
const page = () => {

  const [teamName,setTeamName] = useState('');

  const createTeam=useMutation(api.teams.createTeam);
const {user}:any = useKindeBrowserClient();
const router = useRouter();
 
  const creatNewTeam=()=>{
    createTeam({
      teamName:teamName,
      createdBy:user?.email,
    }).then((res)=>{
      console.log(res)
      if(res){
        router.push('/dashboard')
        toast({
          title:"Team created",
          description: "Your team is created successfully",
        })
      }
    })
  }
  return (
    <div className="w-full h-screen">
      <div>
        <Logo />
      </div>

      <div className="flex flex-col items-center justify-center gap-10 p-10">
        <div className="sm:text-4xl text-2xl text-center font-bold py-2">
          What should we call you team ?
        </div>
        <div className="py-2 text-neutral-500 text-center">
          You can always change this later from settings.
        </div>
        <div className="w-full max-w-screen-sm">
          <label
            htmlFor="UserEmail"
            className="block overflow-hidden rounded-md border px-3 py-2 shadow-sm"
          >
            <span className="text-xs font-medium text-gray-700">
              {" "}
              Team Name{" "}
            </span>

            <input
              type="email"
              id="UserEmail"
              onChange={(e)=>setTeamName(e.target.value)}
            
              placeholder="Rubber's Team"
              className="mt-1 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-xm"
            />
          </label>
        </div>

        {
  teamName?.length > 0 ? (
    <div className="py-5">
      <a
      onClick={()=>creatNewTeam()}
        className="group relative inline-block focus:outline-none cursor-pointer focus:ring"
     
      >
        <span className="absolute inset-0 rounded-md translate-x-1.5 translate-y-1.5 bg-yellow-300 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"></span>

        <span className="relative rounded-md inline-block border-2 border-current px-8 py-3 text-sm font-bold uppercase tracking-widest text-black group-active:text-opacity-75">
          Continue
        </span>
      </a>
    </div>
  ) : (
    <div className="py-5">
      <button
        className="group relative inline-block focus:outline-none focus:ring cursor-not-allowed"
        disabled
      >
        <span className="absolute inset-0 rounded-md translate-x-1.5 translate-y-1.5 bg-red-300 transition-transform"></span>

        <span className="relative rounded-md inline-block border-2 border-current px-8 py-3 text-sm font-bold uppercase tracking-widest text-gray-500">
          Continue
        </span>
      </button>
    </div>
  )
}
      
      </div>
    </div>
  );
};

export default page;
