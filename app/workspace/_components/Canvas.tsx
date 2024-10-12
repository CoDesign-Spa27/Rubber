import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { useConvex, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { FILE } from "@/app/_components/FileList";
import {  MainMenu, WelcomeScreen } from "@excalidraw/excalidraw";
import { toast } from "@/components/ui/use-toast";
const Excalidraw = dynamic(
  async () => (await import("@excalidraw/excalidraw")).Excalidraw,
  {
    ssr: false,
  }
);
export default function Canvas({
  onSaveDoc,
  fileId,
  fileData,
}: {
  onSaveDoc: any;
  fileId: any;
  fileData: FILE;
}) {
  const [whiteBoardData, setWhiteBoardData] = React.useState<any>();

  const updateWhiteBoard = useMutation(api.file.updateWhiteBoard);
  useEffect(() => {
    onSaveDoc&&onSaveWhiteBoard();
  },[onSaveDoc])

  const onSaveWhiteBoard = () => {
    updateWhiteBoard({
      _id: fileId,
      whiteBoard: JSON.stringify(whiteBoardData),
    }).then(
      (resp) => {
        console.log("White board saved successfully"+resp);
        toast({
          title: "File saved successfully",
        });
      },
      (error: any) => {
        toast({
          title: "File saving failed",
        });
      }
    );
  };

  return (
    <div
    className="h-full w-full"
     >
    {fileData&& <Excalidraw 
     theme='dark'
     initialData={{
         elements:fileData?.whiteBoard&&JSON.parse(fileData?.whiteBoard)
     }}
     onChange={(excalidrawElements, appState, files)=>
         setWhiteBoardData(excalidrawElements)}
     UIOptions={{
         canvasActions:{
             saveToActiveFile:false,
             loadScene:false,
             export:false,
             toggleTheme:false
 
         }
     }}
     >
         <MainMenu>
             <MainMenu.DefaultItems.ClearCanvas/>
             <MainMenu.DefaultItems.SaveAsImage/>
             <MainMenu.DefaultItems.ChangeCanvasBackground/>
         </MainMenu>
         <WelcomeScreen>
             <WelcomeScreen.Hints.MenuHint/>
             <WelcomeScreen.Hints.MenuHint/>
             <WelcomeScreen.Hints.ToolbarHint/>
             <WelcomeScreen.Center>
                 <WelcomeScreen.Center.MenuItemHelp/>
             </WelcomeScreen.Center>
         </WelcomeScreen>
         </Excalidraw>}
   </div>
  );
}
