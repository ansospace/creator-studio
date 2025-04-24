"use client";

import { useState } from "react";

import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";

import { Input } from "@/components/ui/input";

import { cn } from "../../lib/utils";

const Password = ({ className, ...props }: React.ComponentProps<"input">) => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => setVisible(!visible);

  return (
    <div className={cn("relative w-full", className)}>
      <Input {...props} type={visible ? "text" : "password"} />
      <div
        className="absolute right-5 bottom-2"
        onClick={toggleVisible}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter") toggleVisible();
        }}
      >
        {visible ? <EyeOpenIcon /> : <EyeClosedIcon />}
      </div>
    </div>
  );
};

export { Password };
