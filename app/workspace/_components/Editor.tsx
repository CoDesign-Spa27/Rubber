"use client";
import React, { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import LinkTool from "@editorjs/link";
import List from "@editorjs/list";
// @ts-ignore
import Checklist from "@editorjs/checklist";
// @ts-ignore
import Paragraph from "@editorjs/paragraph";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "@/components/ui/use-toast";
import { FILE } from "@/app/_components/FileList";

const rawDocument = {
  time: 1550476186479,
  blocks: [
    {
      data: {
        text: "Document Name",
        level: 2,
      },
      id: "123",
      type: "header",
    },
  ],
  version: "2.8.1",
};

const Editor = ({
  onSaveDoc,
  fileId,
  fileData,
}: {
  onSaveDoc: any;
  fileId: any;
  fileData: FILE;
}) => {
  const editorInstanceRef = useRef<EditorJS | null>(null);

  const updateDocument = useMutation(api.file.updateDocument);
  const [document, setDocument] = React.useState(rawDocument);

  useEffect(() => {
    if (fileData) {
     
      initEditor(); 
    }
  
    return () => {
      if (editorInstanceRef.current) {
   
        editorInstanceRef.current.destroy(); 
        editorInstanceRef.current = null;
      }
    };
  }, [fileData]);

  useEffect(() => {
    if (onSaveDoc) {
      onSaveDocument();
    }
  }, [onSaveDoc]);

  const initEditor = () => {
    const editor = new EditorJS({
      holder: "editorjs",
      data: fileData?.document ? JSON.parse(fileData.document) : rawDocument,
      tools: {
        header: {
          class: Header as any,
          config: {
            placeholder: "Enter a header",
            levels: [1, 2, 3, 4, 5, 6],
            defaultLevel: 3,
          },
        },
        linkTool: {
          class: LinkTool,
          config: {
            endpoint: "http://localhost:8008/fetchUrl", // Make sure to update this if needed
          },
        },
        list: {
          class: List as any,
          inlineToolbar: true,
          config: {
            defaultStyle: "unordered",
          },
        },
        checklist: {
          class: Checklist,
          inlineToolbar: true,
        },
        paragraph: {
          class: Paragraph,
          inlineToolbar: true,
        },
      },
    });

    editorInstanceRef.current = editor;
  };

  const onSaveDocument = () => {
    if (editorInstanceRef.current) {
      editorInstanceRef.current
        .save()
        .then((outputData: any) => {
          updateDocument({
            _id: fileId,
            document: JSON.stringify(outputData),
          })
            .then((resp) => {
              toast({
                title: "Document saved successfully",
              });
            })
            .catch((error: any) => {
              toast({
                title: "Document saving failed",
                description: error.message,
              });
            });
        })
        .catch((error: any) => {
          console.error("Saving failed: ", error);
        });
    }
  };

  return (
    <div className="p-2 bg-[#121212]">
      <div
       className="text-white selection:text-black selection:bg-neutral-400
       overflow-x-hidden overflow-y-auto w-full pr-4 pl-2 h-screen"
      id="editorjs"
      key={"editorjs"}
      ></div>
    </div>
  );
};

export default Editor;
