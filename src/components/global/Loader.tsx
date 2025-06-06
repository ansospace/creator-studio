"use client";

import Image from "next/image";
import React from "react";

import { cn } from "@/lib/utils";

type LoaderProps = {
  loading: boolean;
  children: React.ReactNode;
  className?: string;
};

export const Loader = ({ loading, children, className }: LoaderProps) => {
  return loading ? (
    <div className={cn("flex flex-grow items-center justify-center", className)}>
      <div role="status">
        <Image src="/images/ansopedia_loader.gif" alt="loading" width={100} height={100} unoptimized priority />
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  ) : (
    children
  );
};
