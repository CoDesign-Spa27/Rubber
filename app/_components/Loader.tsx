"use client"
import React from "react";
import "../_styles/styles.css"
import { useAppSelector } from "@/store/hook";
const Loader = () => {
    const isloading=useAppSelector((state)=>state.loading.isLoading)
if(!isloading){
    return null;
}
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="loader">
        <div className="loader-square"></div>
        <div className="loader-square"></div>
        <div className="loader-square"></div>
        <div className="loader-square"></div>
        <div className="loader-square"></div>
        <div className="loader-square"></div>
        <div className="loader-square"></div>
      </div>
    </div>
  );
};

export default Loader;
