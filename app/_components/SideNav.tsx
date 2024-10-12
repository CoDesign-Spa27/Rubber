"use client";
import { useContext, useEffect, useState } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ChevronRightIcon, CogIcon } from "@heroicons/react/20/solid";
import {
  ArrowTurnDownRightIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import Logo from "./Logo";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useConvex, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/store/hook";
import { setLoading } from "@/store/slices/loadingSlice";
import { Skeleton } from "@/components/ui/skeleton";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import { LayoutGrid } from "lucide-react";
import SideNavBottom from "./SideNavBottom";
import { toast } from "@/components/ui/use-toast";
import { FileListContext } from "../_contexts/FileListContext";
import { motion } from "framer-motion";
export interface TEAM {
  createdBy: string;
  teamName: string;
  _id: string;
}

function SideNav() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.loading.isLoading);
  const [activeTeam, setActiveTeam] = useState<TEAM>();
  const [userTeam, setUserTeam] = useState<TEAM[]>([]);
  const [totalFiles, setTotalFiles] = useState<number>(0);
  const { user }: any = useKindeBrowserClient();
  const createFile = useMutation(api.file.createFile);
  const convex = useConvex();
  const { fileList_, setFileList_ } = useContext(FileListContext);

  useEffect(() => {
    activeTeam && getFiles();
  }, [activeTeam]);

  const fetchTeams = async () => {
    dispatch(setLoading(true));
    try {
      const result = await convex.query(api.teams.getTeam, {
        email: user?.email,
      });
      setUserTeam(result);
      setActiveTeam(result[0]);
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      fetchTeams();
    }
  }, [user]);

  const navigation = [
    { name: "Dashboard", href: "#", icon: HomeIcon, current: true },
    {
      name: `${activeTeam?.teamName}`,
      icon: UsersIcon,
      current: false,
      teams: userTeam,
    },
  ];

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }

  const onFileCreate = (fileName: string) => {
    console.log(fileName);

    createFile({
      fileName: fileName,
      teamId: activeTeam?._id || "",
      createdBy: user?.email,
      archive: false,
      document: "",
      whiteBoard: "",
    }).then((res) => {
      if (res) {
        getFiles();
        toast({ title: "Success", description: "File created successfully!" });
      }
    }),
      (e: any) => {
        console.log(e);
        toast({
          title: "Failed",
          description: "Error while creating new file",
        });
      };
  };

  const getFiles = async () => {
    const result = await convex.query(api.file.getFiles, {
      teamId: activeTeam?._id,
    });
    setFileList_(result);
    setTotalFiles(result?.length);
  };

  console.log("total file --" + totalFiles);
  return (
    <div className="">
      <div className="flex grow w-72 flex-col style-7 h-screen gap-y-5 overflow-y-auto text-gray-100 border-r-[0.1px] border-gray-500 bg-[#171717] px-6">
        <div className="flex h-16 py-10 items-center">
          <Logo />
        </div>
        {/* Conditionally render the content */}
        {activeTeam && !isLoading ? (
          <nav className="flex flex-2 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      {!item.teams?.length ? (
                        <a
                          href={item.href}
                          className={classNames(
                            item.current
                              ? "bg-neutral-800"
                              : "hover:bg-neutral-800",
                            "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-100"
                          )}
                        >
                          <item.icon
                            aria-hidden="true"
                            className="h-6 w-6 shrink-0 text-gray-400"
                          />
                          {item.name}
                        </a>
                      ) : (
                        <Disclosure as="div">
                          {({ open }) => (
                            <>
                              <DisclosureButton
                                className={classNames(
                                  item.current
                                    ? "bg-neutral-800"
                                    : "hover:bg-neutral-800",
                                  "group flex w-full items-center gap-x-3 rounded-md p-2 text-left text-sm font-semibold leading-6 text-gray-100"
                                )}
                              >
                                <item.icon
                                  aria-hidden="true"
                                  className="h-6 w-6 shrink-0 text-gray-400"
                                />
                                {item.name}
                                <ChevronRightIcon
                                  aria-hidden="true"
                                  className={`ml-auto h-5 w-5 shrink-0 text-gray-400 transition-transform ${
                                    open ? "rotate-90" : ""
                                  }`}
                                />
                              </DisclosureButton>

                              <motion.ul
                                initial={{ height: 0, opacity: 0 }}
                                animate={{
                                  height: open ? "auto" : 0,
                                  opacity: open ? 1 : 0,
                                }}
                                transition={{ duration: 0.4 }}
                                className="overflow-hidden mt-1 flex flex-col px-2"
                              >
                                {item.teams.map((team) => (
                                  <li key={team._id}>
                                    <DisclosureButton
                                      as="a"
                                      href="#"
                                      className={classNames(
                                        "block rounded-md py-2 my-1 pl-9 pr-2 text-sm font-medium leading text-gray-100",
                                        "hover:bg-neutral-800",
                                        `${
                                          activeTeam?._id == team._id &&
                                          "bg-pink-400 text-neutral-900 hover:bg-pink-500 "
                                        }`
                                      )}
                                      onClick={() => setActiveTeam(team)}
                                    >
                                      {team.teamName}
                                    </DisclosureButton>
                                  </li>
                                ))}
                                <span className="h-px py-[0.1px] flex-1 my-2 bg-gray-500"></span>
                                <div className="pl-6 py-1">
                                  <div className="flex font-bold text-sm hover:bg-neutral-800 rounded-md py-1 px-2 gap-2">
                                    <CogIcon className="h-6 w-6 shrink-0 text-gray-400" />{" "}
                                    Settings
                                  </div>
                                </div>
                                <div className="bg-neutral-800 rounded-md flex items-center p-2 space-x-3">
                                  <div>
                                    <Image
                                      src={user?.picture}
                                      width={40}
                                      height={40}
                                      alt="user"
                                      className="rounded-full"
                                    />
                                  </div>
                                  <div className="flex flex-col text-sm text-white">
                                    <span className="font-medium">
                                      {user?.given_name}
                                    </span>
                                    <span className="text-gray-400">
                                      {user?.email}
                                    </span>
                                  </div>
                                </div>
                              </motion.ul>
                            </>
                          )}
                        </Disclosure>
                      )}
                    </li>
                  ))}
                </ul>
              </li>
              <div className="group flex gap-x-3 -mx-2 space-y-1 rounded-md p-2 text-sm font-semibold leading-6 text-gray-100 bg-neutral-800">
                <LayoutGrid className="text-gray-400" />
                All files{" "}
              </div>
            
            </ul>
          </nav>
        ) : (
          <div className="flex flex-col gap-3">
            <Skeleton className="w-[230px] h-[40px] rounded-md" />
            <Skeleton className="w-[230px] h-[40px] rounded-md" />
            <Skeleton className="w-[230px] h-[40px] rounded-md" />
          </div>
        )}
        {activeTeam && !isLoading ? (<>
        
          <SideNavBottom totalFiles={totalFiles} onFileCreate={onFileCreate} />
          <LogoutLink>
          <div className="flex font-bold text-sm hover:bg-neutral-800 rounded-md py-1 px-2 gap-2">
            <ArrowTurnDownRightIcon className="h-6 w-6 shrink-0 text-gray-400" />{" "}
            Logout
          </div>
        </LogoutLink>
        </>
        ) : (
          <div>
            <Skeleton className="border-2 flex flex-col gap-3 border-neutral-600">
              <Skeleton className="w-[100px] my-2  h-[100px] rounded-md" />
              <Skeleton className="w-[100px] my-2 h-[100px] rounded-md" />
            </Skeleton>
          </div>
        )}
      
      </div>
     
    </div>
  );
}

export default SideNav;
