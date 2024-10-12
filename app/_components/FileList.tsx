import React, { useContext, useEffect, useState } from "react";
import { FileListContext } from "../_contexts/FileListContext";
import moment from "moment";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Image from "next/image";
import { Archive, MoreHorizontal, PlusCircleIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { setLoading } from "@/store/slices/loadingSlice";

export interface FILE {
  fileName: string;
  archive: string;
  createdBy: string;
  document: string;
  teamId: string;
  _id: string;
  whiteBoard: string;
  _creationTime: string;
}

const FileList = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.loading.isLoading);
  const { fileList_, setFileList_ } = useContext(FileListContext);
  const [fileList, setFileList] = useState<any>();
  const { user }: any = useKindeBrowserClient();
 const router = useRouter();
  useEffect(() => {
    if (fileList_) setFileList(fileList_);
  }, [fileList_]);


  const handleFileClick = async (fileId: string) => {
    try {
      dispatch(setLoading(true));

      // Adding a small delay to simulate a loader (optional)
      await new Promise((resolve) => setTimeout(resolve, 500));

      await router.push(`/workspace/${fileId}`);
    } catch (error) {
      console.error("Error navigating to workspace:", error);
    } finally {
      dispatch(setLoading(false));
    }
  }

  
  return (
    <div className="p-6 bg-neutral-900 min-h-screen">
      {!fileList_ ? (
        <div className="flex flex-col gap-5 items-center justify-center ">
       <Skeleton
       className="w-full h-12"
       />
         <Skeleton
       className="w-full h-8"
       />  <Skeleton
       className="w-full h-8"
       />  <Skeleton
       className="w-full h-8"
       />  <Skeleton
       className="w-full h-8"
       />
        </div>
      ) : (
        <>
        {fileList_ && fileList_.length === 0 ? (
          
          <div className="flex flex-col gap-5 items-center justify-center">
            <div className="text-gray-200">No files found.</div>
          </div>
        ):(
          
          <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="min-w-full divide-y-2 divide-neutral-700 bg-neutral-800 text-sm">
          <thead className="bg-neutral-900 text-left">
          <tr>
          <th className="px-6 py-4 font-medium text-gray-100">Name</th>
              <th className="px-6 py-4 font-medium text-gray-100">Created At</th>
              <th className="px-6 py-4 font-medium text-gray-100">Edited</th>
              <th className="px-6 py-4 font-medium text-gray-100">Author</th>
              <th className="px-6 py-4 font-medium text-gray-100">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-700">
            {fileList_ &&
              fileList_.map((file: FILE, index: number) => (
                <tr
                  onClick={()=>handleFileClick(file._id)}
                  key={file._id}
                  className="hover:bg-neutral-700 cursor-pointer transition-all"
                >
                  <td className="whitespace-nowrap px-6 py-4 text-gray-200 font-medium">
                    {file.fileName}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-gray-400">
                    {moment(file._creationTime).fromNow()}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-gray-400">
                    {moment(file._creationTime).fromNow()}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <Image
                        src={user?.picture || "/default-avatar.png"}
                        alt="user"
                        width={30}
                        height={30}
                        className="rounded-full"
                      />
                      <span className="text-gray-200">{user?.given_name}</span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-gray-200">
                    <DropdownMenu>
                      <DropdownMenuTrigger className="outline-none hover:bg-neutral-600 rounded-md p-2 transition-colors">
                        <MoreHorizontal className="w-5 h-5" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-neutral-800 border border-neutral-600">
                        <DropdownMenuItem className="flex items-center gap-4 text-gray-100 hover:bg-neutral-700 transition-colors p-2">
                          Archive <Archive className="w-5 h-5" />
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
              </tbody>
              </table>
              </div>
        )  }
        </>
            )
            
            
      }
    </div>
  );
};

export default FileList;

