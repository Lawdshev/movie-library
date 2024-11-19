"use client";
import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface IProps {
  totalPages: number;
}

export default function InfiniteScroll({ totalPages }: IProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const { replace } = useRouter();

  const createPageURL = (pageNumber: number | string) => {
    if (pageNumber.toString() === totalPages.toString()) {
      return;
    }
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    replace (`${pathname}?${params.toString()}`);
  };

  const prevPage = () => {
    if (Number(currentPage) === 1) return;
    createPageURL(currentPage - 1);

  }

  const nextPage = () => {
    if (Number(currentPage) === Number(totalPages)) return;
    createPageURL(currentPage + 1);
  }

  return (
    <div className="w-full mt-4 flex items-center justify-center gap-4">
      <button
        onClick={prevPage}
        className="flex items-center justify-center px-5 py-2 bg-blue-500 text-white rounded-full shadow-md transition-transform transform hover:scale-105 hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={Number(currentPage) === 1}
      >
        <span className="hidden sm:inline-block mr-2">Previous</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <button
        onClick={nextPage}
        className="flex items-center justify-center px-5 py-2 bg-blue-500 text-white rounded-full shadow-md transition-transform transform hover:scale-105 hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={Number(currentPage) === Number(totalPages)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        <span className="hidden sm:inline-block ml-2">Next</span>
      </button>
    </div>
  );
}
