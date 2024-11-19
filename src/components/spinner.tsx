import React from "react";
import { FaSpinner } from "react-icons/fa";

export default function Loader() {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-100px)] w-full">
      <FaSpinner className="text-blue-500 animate-spin text-4xl" />
    </div>
  );
}