"use client";
import React from 'react'
import Image from "next/image";
import logo from "../../../public/logo.svg";
import { Button } from '@/components/ui/button';
import { Save, Share2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WorkspaceHeaderProps {
  onSave: () => void;
  fileName: string;
  Tabs:{name:string}[];
  setActiveTab: (tab: string) => void;
activeTab:string;
}

const WorkspaceHeader: React.FC<WorkspaceHeaderProps> = ({ onSave,fileName,Tabs,setActiveTab,activeTab }) => {
  return (
    <div className='px-5 py-1 border-b-2 border-gray-600 bg-[#121212] text-white'>
        <div className='flex items-center justify-between'>

      <div className='flex items-center '>
        <Image src={logo} width={70} height={70} alt="logo" />
        <div className='text-sm font-semibold'>
           {fileName}
        </div>
      </div>
  
      <div>
        <div className="border border-neutral-600 rounded">
          <div className="flex w-full items-center">
            {
              // tabs
              Tabs.map((tab: any) => (
                <div
                  key={tab.name}
                  onClick={() => setActiveTab(tab.name)}
                  className={cn(
                    " cursor-pointer w-24 text-sm text-center hover:bg-neutral-700 px-2 py-1",
                    {
                      "bg-neutral-700 text-white": tab.name === activeTab,
                    },
                    {
                      "border-r border-neutral-500":
                        tab.name !== Tabs[Tabs.length - 1].name,
                    }
                  )}
                >
                  <h1 className="text-sm font-medium">{tab.name}</h1>
                </div>
              ))
            }
          </div>
        </div>
      
      </div>
      <div className='flex items-center gap-5'>
        <Button className='bg-yellow-400 text-black flex items-center hover:bg-white border border-yellow-400 gap-2'
      onClick={()=>onSave()}  
        >
          Save
            <Save size={16} />
        </Button>
        <Button className='bg-white text-black border-pink-400 border
        flex items-center gap-2
        hover:bg-pink-400'>
            Share
            <Share2 size={16} className='text-blue-800' />
        </Button>
      </div>
        </div>
    </div>
  );
};

export default WorkspaceHeader;
