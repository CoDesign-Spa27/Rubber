"use client"
import { Archive, ArrowRight, File, FileInput, LucideGithub, PlusCircleIcon, Star, Users } from "lucide-react";
import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useConvex } from "convex/react";
import { setLoading } from "@/store/slices/loadingSlice";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hook";
 

interface SideNavBottomProps {
  onFileCreate: (fileName: string) => void;
  totalFiles: number;
}

 function SideNavBottom({ onFileCreate, totalFiles }: SideNavBottomProps) {
 const [createFile, setCreateFile] = useState('');
const router = useRouter();
const dispatch=useAppDispatch();
 const handleCreateTeamClick =async () => {
  
  try {
    console.log("Create Team Clicked");
    dispatch(setLoading(true));
    await new Promise((resolve) => setTimeout(resolve, 500));

    await router.push("/teams/create");
  } catch (error) {
    console.error("Error navigating to workspace:", error);
  } finally {
    dispatch(setLoading(false));
  }
 }
 
  return (
    <div className="text-gray-100 bg-neutral-800 border my-5 rounded-md px-3 capitalize flex flex-col gap-3 py-5">
      <Dialog >
        <DialogTrigger>

      <div className="bg-pink-400 cursor-pointer hover:bg-pink-500 gap-3 font-bold text-sm py-2 px-2 rounded-md flex items-center">
     <File />   New File <PlusCircleIcon />
      </div>
        </DialogTrigger>
  <DialogContent className="bg-neutral-950 border border-neutral-800 text-gray-100">
    <DialogHeader>
      <DialogTitle className="py-3">Create New File</DialogTitle>
     <Input
onChange={(e)=>setCreateFile(e.target.value)}
placeholder="Enter File Name"
     className="text-black bg-gray-100"  />
    </DialogHeader>
    <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <DialogClose asChild>

          <Button type="submit"
          disabled={!(createFile&&createFile.length>0)}
          className="bg-pink-400 text-black hover:bg-pink-600"
          onClick={()=>onFileCreate(createFile)}
          >Create</Button>
          </DialogClose>
      
         
        </DialogFooter>
  </DialogContent>
</Dialog>
<div 
onClick={handleCreateTeamClick}
className="bg-neutral-900 cursor-pointer hover:bg-yellow-500 gap-3 font-bold text-sm py-2 px-2 rounded-md flex items-center">
      <Users />  Create Team <PlusCircleIcon />
      </div>
      {/* <div className="flex items-center cursor-pointer hover:bg-neutral-900   rounded-md px-2 justify-start gap-4 text-sm ">
        Github{" "}
        <LucideGithub className="w-7 ml-2 bg-gray-100 text-[#171717] rounded-full h-7 p-1" />
      </div>
      <div className="flex items-center cursor-pointer hover:bg-neutral-900   rounded-md px-2 justify-start gap-4 text-sm ">
        Archive{" "}
        <Archive className="w-7 bg-gray-100 text-[#171717] rounded-full h-7 p-1 " />
      </div>
      <div className="px-2">
        <div className="py-3">
        <div className="w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-2.5">
      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${(totalFiles / 5) * 100}%` }}></div>
    </div>
        <div className="text-[13px] py-1">
        {totalFiles} of 5 files.. 
            </div>
        </div>
            <div className="text-[13px] flex items-center">
                Upgrade your plan for unlimited access .
                <Star className="bg-yellow-500 rounded-full p-1 w-10 h-7 cursor-pointer" />
            </div> */}
      {/* </div> */}
    </div>
  );
}
 
export default SideNavBottom;

