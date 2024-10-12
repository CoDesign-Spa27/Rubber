"use client";
import React, { act, useEffect, useState } from "react";
import WorkspaceHeader from "../_components/WorkspaceHeader";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import { FILE } from "@/app/_components/FileList";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import dynamic from "next/dynamic";
import { ArrowLeft } from "lucide-react";

const Editor = dynamic(() => import("../_components/Editor"), {
  ssr: false,
});

const Canvas = dynamic(() => import("../_components/Canvas"), {
  ssr: false,
});

const Workspace = ({ params }: any) => {
  const Tabs = [
    {
      name: "Document",
    },
    {
      name: "Both",
    },
    {
      name: "Canvas",
    },
  ];
  const [activeTab, setActiveTab] = useState(Tabs[1].name);
  const [saveDoc, setSaveDoc] = React.useState(false);
  const convex = useConvex();
  const [fileData, setFileData] = React.useState<FILE>();
  useEffect(() => {
    console.log(params.fileId);
    params.fileId && getFileData();
  });
  const getFileData = async () => {
    const result = await convex.query(api.file.getFilebyId, {
      _id: params.fileId,
    });
    setFileData(result);
  };
  return (
    <div className="overflow-hidden bg-[#121212] w-full">
      <WorkspaceHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        Tabs={Tabs}
        onSave={() => setSaveDoc(!saveDoc)}
        fileName={fileData?.fileName as string}
      />
  {
    activeTab === "Document" ? (
      <div
      style={{
        height: "calc(100vh - 3rem)",
      }}
    >
      <Editor
        onSaveDoc={saveDoc}
        fileId={params.fileId}
        fileData={fileData as FILE}
      />
      </div>
    ):activeTab === "Both" ? (
      <ResizablePanelGroup
        style={{
          height: "calc(100vh - 3rem)",
        }}
        direction="horizontal"
      >
        <ResizablePanel defaultSize={50} minSize={30} collapsible={false}>
          <Editor
            onSaveDoc={saveDoc}
            fileId={params.fileId}
            fileData={fileData as FILE}
          />
        </ResizablePanel>
        <ResizableHandle className=" bg-neutral-600" />
        <ResizablePanel defaultSize={50} minSize={30} collapsible={false}>
          <Canvas
            onSaveDoc={saveDoc}
            fileId={params.fileId}
            fileData={fileData as FILE}
          />
        </ResizablePanel>
      </ResizablePanelGroup>

    ):activeTab === "Canvas" ? (
      <div
      style={{
        height: "calc(100vh - 3rem)",
      }}
    >
      <Canvas
        onSaveDoc={saveDoc}
        fileId={params.fileId}
        fileData={fileData as FILE}
      />
      </div>
    ):null
    
  }
      
    </div>
  );
};

export default Workspace;
